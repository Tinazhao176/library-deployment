<template>
    <div class="book-list">
      <h2>Books with ISBN > 1000</h2>
      
      
      <div class="query-options mb-4">
        <div class="form-group">
          <label>Sort by:</label>
          <select v-model="sortField" class="form-control">
            <option value="name">Name</option>
            <option value="isbn">ISBN</option>
          </select>
        </div>
        <div class="form-group">
          <label>Order:</label>
          <select v-model="sortOrder" class="form-control">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div class="form-group">
          <label>Limit:</label>
          <input type="number" v-model="resultLimit" min="1" class="form-control" />
        </div>
        <button @click="fetchBooks" class="btn btn-primary">Apply Filters</button>
      </div>
      
     
      <div v-if="books.length > 0">
        <ul>
          <li v-for="book in books" :key="book.id">
            <div class="book-item">
              <div v-if="editingBookId !== book.id">
                {{ book.name }} - ISBN: {{ book.isbn }}
              </div>
              <div v-else>
                <input v-model="editName" class="form-control" />
                <input v-model="editIsbn" class="form-control mt-2" />
              </div>
              <div class="actions">
                <button v-if="editingBookId !== book.id" 
                        @click="startEditing(book)" 
                        class="btn btn-sm btn-outline-primary">
                  Edit
                </button>
                <button v-else 
                        @click="saveEdit(book)" 
                        class="btn btn-sm btn-success">
                  Save
                </button>
                <button @click="deleteBook(book.id)" 
                        class="btn btn-sm btn-outline-danger">
                  Delete
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <p v-else>No books found with ISBN > 1000</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { 
    collection, query, where, getDocs, 
    doc, updateDoc, deleteDoc, orderBy, limit 
  } from 'firebase/firestore';
  import db from '@/firebase/init.js';
  
  const books = ref([]);
  const sortField = ref('name');
  const sortOrder = ref('asc');
  const resultLimit = ref(5); 
  const editingBookId = ref(null);
  const editName = ref('');
  const editIsbn = ref('');
  
  const fetchBooks = async () => {
    try {
      let q = query(
        collection(db, 'books'),
        where('isbn', '>', 1000)
      );
      
   
      if (sortField.value) {
        q = query(q, orderBy(sortField.value, sortOrder.value));
      }
      
      
      if (resultLimit.value > 0) {
        q = query(q, limit(Number(resultLimit.value)));
      }
      
      const querySnapshot = await getDocs(q);
      books.value = [];
      
      querySnapshot.forEach((doc) => {
        books.value.push({
          id: doc.id,
          ...doc.data()
        });
      });
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };
  
  const startEditing = (book) => {
    editingBookId.value = book.id;
    editName.value = book.name;
    editIsbn.value = book.isbn;
  };
  
  const saveEdit = async (book) => {
    try {
      const bookRef = doc(db, 'books', book.id);
      await updateDoc(bookRef, {
        name: editName.value,
        isbn: Number(editIsbn.value)
      });
      
      editingBookId.value = null;
      fetchBooks(); 
      alert('Book updated successfully!');
    } catch (error) {
      console.error('Error updating book:', error);
      alert('Failed to update book');
    }
  };
  
  const deleteBook = async (bookId) => {
    if (confirm('Are you sure you want to delete this book?')) {
      try {
        const bookRef = doc(db, 'books', bookId);
        await deleteDoc(bookRef);
        fetchBooks(); 
        alert('Book deleted successfully!');
      } catch (error) {
        console.error('Error deleting book:', error);
        alert('Failed to delete book');
      }
    }
  };
  
  onMounted(() => {
    fetchBooks();
  });
  </script>
  
  <style scoped>
  .book-list {
    margin-top: 2rem;
    padding: 1rem;
    border: 1px solid #eee;
    border-radius: 8px;
    background-color: #fff;
  }
  
  .query-options {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    align-items: flex-end;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 5px;
  }
  
  .form-group {
    flex: 1;
    min-width: 150px;
  }
  
  .book-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  
  .actions {
    display: flex;
    gap: 8px;
    margin-left: 15px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
  }
  
  h2 {
    margin-bottom: 1rem;
    color: #333;
  }
  </style>