<template>
  <form class="form-signin" @submit.prevent="register">
    <h1 class="h3 mb-3 font-weight-normal">Registrar</h1>
    <div class="form-row">
      <label for="input_name" class="sr-only">Nome</label>
      <input
        type="text"
        id="input_name"
        class="form-control"
        placeholder="Nome"
        required
        autofocus
      />
    </div>
    <div class="form-row">
      <label for="input_email" class="sr-only">Email</label>
      <input
        type="email"
        id="input_email"
        class="form-control"
        placeholder="Email"
        required
      />
    </div>
    <div class="form-row">
      <label for="input_phone" class="sr-only">Telefone</label>
      <input
        type="text"
        id="input_phone"
        class="form-control"
        placeholder="Celular"
        required
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
      <div class="col-md-6"></div>
      <router-link class="col-md-6" to="/login">Fazer login</router-link>
    </div>
    <div class="mt-3">
      <button class="btn btn-lg btn-outline-primary btn-block" type="submit">
        Registrar
      </button>
    </div>
    <p class="mt-5 mb-3 text-muted">&copy; 2020</p>
  </form>
</template>

<script>
import { register } from "../rest/auth";

export default {
  methods: {
    register: async () => {
      const name = document.querySelector("#input_name").value;
      const email = document.querySelector("#input_email").value;
      const phone = document.querySelector("#input_phone").value;
      const password = document.querySelector("#input_password").value;

      await register({ name, email, phone, password })
        .then((response) => {
          console.log(`registered: ${response}`);
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
