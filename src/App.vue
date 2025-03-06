<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  // const chrome = document.getElementById('chrome');

  // chrome.innerText += " " + versions.chrome()
});

const func = async () => {
  const response = await window.versions.ping()
  console.log(response) // prints out 'pong'
}

func()
</script>

<template>
  
  <body>

    <!-- <h1 id="chrome">chrome: </h1> -->
    
    <!-- <p>
      <strong>Current route path:</strong> {{ $route.fullPath }}
      App component
    </p> -->
    
    <main class="h-full">
      <RouterView />
    </main>
  </body>
    
</template>
  
<style scoped>
  body{
    height: 100vh;
    background-color: #f0f0f0;
  }
</style>