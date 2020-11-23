<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Cabeleleila Leila</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
        </ul>
        <ul class="navbar-nav d-flex">
          <li class="nav-item" v-if="!user">
            <a href="/login" class="nav-link">Login</a>
          </li>

          <li class="nav-item" v-if="user">
            <a :href="`/${user.roles[0].slug}/home`" class="nav-link"
              >Dashboard</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <router-view />
</template>

<script>
export default {
  computed: {
    user() {
      return JSON.parse(localStorage.getItem("user"));
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
