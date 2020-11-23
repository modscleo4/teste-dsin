<template>
  <Header>Novo Usuário</Header>

  <div>
    <form class="form-horizontal" @submit.prevent="store">
      <Form />

      <div class="form-row mb-3" style="justify-content: center">
        <router-link to="/admin/users" class="btn btn-outline-danger mr-3"
          ><ArrowLeftIcon /> Voltar</router-link
        >
        <button type="submit" class="btn btn-primary">
          <SaveIcon /> Salvar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ArrowLeftIcon, SaveIcon } from "@zhuowenli/vue-feather-icons";
import Swal from "sweetalert2";
import Header from "../../../../components/Header";
import Form from "./_Form";
import { Users } from "../../../../rest/admin";

export default {
  name: "Create",
  components: {
    Header,
    Form,
    ArrowLeftIcon,
    SaveIcon,
  },
  methods: {
    store: async function () {
      const name = document.querySelector("#input_name").value;
      const phone = document.querySelector("#input_phone").value;
      const email = document.querySelector("#input_email").value;
      const password = document.querySelector("#input_password").value;
      const active = document.querySelector("#input_active").value;
      const role_id = document.querySelector("#input_role_id").value;

      await Users.store({ name, phone, email, password, active, role_id })
        .then((response) => {
          console.log(`stored: ${response}`);
          location.href = `/admin/users/`;
        })
        .catch((e) => {
          console.error(e);
          Swal.fire({
            icon: "error",
            title: "Erro",
            text: e.message,
          });
        });
    },
  },
};
</script>
