<template>
  <Header>Novo Serviço</Header>

  <div>
    <form class="form-horizontal" @submit.prevent="store">
      <Form />

      <div class="form-row mb-3" style="justify-content: center">
        <router-link to="/admin/services" class="btn btn-outline-danger mr-3"
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
import { Services } from "../../../../rest/admin";

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
      const price = document.querySelector("#input_price").value;

      await Services.store({ name, price })
        .then((response) => {
          console.log(`stored: ${response}`);
          location.href = `/admin/services/`;
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
