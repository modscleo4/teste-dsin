<template>
  <Header>Editar Serviço</Header>

  <!-- NÃO REMOVA ESSE v-if -->
  <div v-if="service">
    <form class="form-horizontal" @submit.prevent="update">
      <Form :service="service" />

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
  name: "Edit",
  props: ["id"],
  components: {
    Header,
    Form,
    ArrowLeftIcon,
    SaveIcon,
  },
  data() {
    return {
      service: null,
    };
  },
  async beforeCreate() {
    this.service = await Services.show(this.id);
  },
  methods: {
    update: async function () {
      const name = document.querySelector("#input_name").value;
      const price = document.querySelector("#input_price").value;

      await Services.update(this.service.id, { name, price })
        .then((response) => {
          console.log(`updated: ${response}`);
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
