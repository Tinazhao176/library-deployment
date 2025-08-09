<template>
    <div>
      <h1>Book Statistics API</h1>
      <pre v-if="apiResponse">{{ JSON.stringify(apiResponse, null, 2) }}</pre>
      <p v-else>Loading data...</p>
    </div>
  </template>
  
  <script>
  import authors from '@/assets/json/authors.json';
  
  export default {
    name: 'CountBookAPI',
    data() {
      return {
        apiResponse: null
      };
    },
    mounted() {
      this.calculateStats();
    },
    methods: {
      calculateStats() {
        const authorsCount = authors.length;
        const totalBooks = authors.reduce((total, author) => {
          return total + author.famousWorks.length;
        }, 0);
        
        const authorsWithCount = authors.map(author => ({
          name: author.name,
          bookCount: author.famousWorks.length
        }));
        
        this.apiResponse = {
          success: true,
          data: {
            authorsCount,
            totalBooks,
            authors: authorsWithCount
          },
          timestamp: new Date().toISOString()
        };
      }
    }
  };
  </script>