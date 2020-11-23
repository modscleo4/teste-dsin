<template>
  <Header>Agendamento</Header>

  <div v-if="schedule">
    <dl>
      <dt>Data</dt>
      <dd>
        {{
          new Intl.DateTimeFormat("pt-BR", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          }).format(new Date(schedule.date))
        }}
      </dd>

      <dt>Observações</dt>
      <dd>{{ schedule.note || "(Sem observações)" }}</dd>

      <dt>Status</dt>
      <dd>
        {{ { S: "Agendado", P: "Pago", M: "Não compareceu" }[schedule.status] }}
      </dd>
    </dl>

    <h5>Serviços</h5>
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th>Nome</th>
          <th>Preço</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="service in schedule.services" :key="service.id">
          <th scope="row">{{ service.id }}</th>
          <td>{{ service.name }}</td>
          <td>R$ {{ service.price }}</td>
          <td>
            {{ { W: "Aguardando", D: "Concluído" }[service.pivot.status] }}
          </td>
        </tr>

        <tr v-if="schedule.services.length === 0">
          <td colspan="4" class="text-center">Nenhum serviço encontrado.</td>
          <td style="display: none"></td>
          <td style="display: none"></td>
          <td style="display: none"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Header from "../../../../components/Header";
import { Schedules } from "../../../../rest/client";

export default {
  name: "Show",
  props: ["id"],
  components: {
    Header,
  },
  data() {
    return {
      schedule: null,
    };
  },
  async beforeCreate() {
    this.schedule = await Schedules.show(this.id);
  },
  methods: {},
};
</script>
