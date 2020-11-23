<template>
  <Header>Editar Agendamento</Header>

  <!-- NÃO REMOVA ESSE v-if -->
  <div v-if="schedule">
    <form class="form-horizontal" @submit.prevent="update">
      <Form :schedule="schedule" />

      <div class="form-row mb-3" style="justify-content: center">
        <router-link to="/admin/schedules" class="btn btn-outline-danger mr-3"
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
import { Schedules } from "../../../../rest/admin";

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
      schedule: null,
    };
  },
  async beforeCreate() {
    this.schedule = await Schedules.show(this.id);
  },
  methods: {
    update: async function () {
      const date = document.querySelector("#input_date").value;
      const note = document.querySelector("#input_note").value;
      const services = Array.from(
        document.querySelector("#input_services").selectedOptions
      ).map((o) => o.value);

      await Schedules.update(this.schedule.id, { date, note, services })
        .then((response) => {
          console.log(`updated: ${response}`);
          location.href = `/admin/schedules/`;
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
