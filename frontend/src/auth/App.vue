<template>
  <router-view />
</template>

<script>
export default {
  computed: {
    token() {
      return JSON.parse(localStorage.getItem("token"));
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
