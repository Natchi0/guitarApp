<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const chrome = document.getElementById('chrome');

  chrome.innerText += " " + versions.chrome()
});

const func = async () => {
  const response = await window.versions.ping()
  console.log(response) // prints out 'pong'
}

func()
</script>

<template>

  <h1 id="chrome">chrome: </h1>

  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>

  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>

</template>
  
<style scoped>
  
</style>