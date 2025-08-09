<template>
  <div>
    <h1>Add Book</h1>
    <form @submit.prevent="addBook">
      <div>
        <label for="isbn">ISBN: </label>
        <input type="number" v-model.number="isbn" id="isbn" required />
      </div>
      <div>
        <label for="name">Name: </label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button type="submit">Add Book</button>
    </form>
    
    
    <BookList ref="bookList" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { collection, addDoc } from 'firebase/firestore';
import db from '@/firebase/init.js';
import BookList from '@/components/BookList.vue';

const isbn = ref('');
const name = ref('');
const bookList = ref(null);

const addBook = async () => {
  try {
   
    if (isNaN(isbn.value)) {
      alert('ISBN must be a number');
      return;
    }
    
    await addDoc(collection(db, 'books'), {
      isbn: Number(isbn.value),
      name: name.value
    });
    
    alert('Book added successfully!');
    isbn.value = '';
    name.value = '';
    
    
    if (bookList.value) {
      bookList.value.fetchBooks();
    }
  } catch (error) {
    console.error('Error adding book:', error);
    alert('Failed to add book');
  }
};
</script>

<style scoped>
div {
  margin-bottom: 10px;
}

label {
  display: inline-block;
  width: 80px;
}

input {
  padding: 5px;
  width: 200px;
}

button {
  padding: 8px 15px;
  background-color: #0d6efd;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>