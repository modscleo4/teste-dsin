<template>
  <form class="form-signin" @submit.prevent="login">
    <h1 class="h3 mb-3 font-weight-normal">Login</h1>
    <div class="form-row">
      <label for="input_email" class="sr-only">Email</label>
      <input
        type="email"
        id="input_email"
        class="form-control"
        placeholder="Email"
        required
        autofocus
      />
    </div>
    <div class="form-row">
      <label for="input_password" class="sr-only">Senha</label>
      <input
        type="password"
        id="input_password"
        class="form-control"
        placeholder="Senha"
        required
      />
    </div>
    <div class="form-row">
      <div
        class="custom-control custom-checkbox col-md-6"
        style="display: inline-block"
      >
        <input
          type="checkbox"
          class="custom-control-input"
          name="remember"
          id="input_remember"
        />
        <label class="custom-control-label" for="input_remember">Lembrar</label>
      </div>
      <router-link class="col-md-6" to="/register">Criar conta</router-link>
    </div>
    <div class="mt-3">
      <button class="btn btn-lg btn-outline-primary btn-block" type="submit">
        Login
      </button>
    </div>
    <p class="mt-5 mb-3 text-muted">&copy; 2020</p>
  </form>
</template>

<script>
import { login } from "../rest/";

export default {
  methods: {
    login: async () => {
      const email = document.querySelector("#input_email").value;
      const password = document.querySelector("#input_password").value;
      const remember = document.querySelector("#input_remember").value;

      await login({ email, password, remember })
        .then((response) => {
          console.log(`logged: ${response}`);
          location.href = `/${response.user.roles[0].slug}/home`;
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
};
</script>

<style>
html,
body,
#app {
  height: 100%;
}

#app {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
