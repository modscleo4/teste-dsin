<template>
  <Header>Novo Agendamento</Header>

  <div>
    <form class="form-horizontal" @submit.prevent="store">
      <Form />

      <div class="form-row mb-3" style="justify-content: center">
        <router-link to="/client/schedules" class="btn btn-outline-danger mr-3"
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
import { Schedules } from "../../../../rest/client";

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
      const date = document.querySelector("#input_date").value;
      const note = document.querySelector("#input_note").value;
      const services = Array.from(
        document.querySelector("#input_services").selectedOptions
      ).map((o) => o.value);

      await Schedules.store({ date, note, services })
        .then((response) => {
          console.log(`stored: ${response}`);
          location.href = `/client/schedules/`;
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
