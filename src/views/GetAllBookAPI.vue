<template>
    <div>
      <h1>All Books API</h1>
      <pre v-if="apiResponse">{{ JSON.stringify(apiResponse, null, 2) }}</pre>
      <p v-else>Loading book data...</p>
    </div>
  </template>
  
  <script>
  import authors from '@/assets/json/authors.json';
  
  export default {
    name: 'GetAllBookAPI',
    data() {
      return {
        apiResponse: null
      };
    },
    mounted() {
      this.generateBookData();
    },
    methods: {
      generateBookData() {
        const allBooks = authors.flatMap(author => 
          author.famousWorks.map(work => ({
            author: author.name,
            title: work.title,
            year: work.year
          }))
        );
        
        this.apiResponse = {
          success: true,
          data: {
            totalBooks: allBooks.length,
            books: allBooks
          },
          timestamp: new Date().toISOString()
        };
      }
    }
  };
  </script>
  
  <style scoped>
  pre {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 5px;
    overflow-x: auto;
  }
  </style>