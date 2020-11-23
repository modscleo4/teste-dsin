<template>
  <Header>Dashboard</Header>

  <div class="card-deck">
    <div class="card text-white bg-primary mb-3" style="max-width: 18rem">
      <div class="card-body">
        <h5 class="card-title">Clientes</h5>
        <p class="card-text">
          {{ clients }}
        </p>
      </div>
    </div>

    <div class="card text-white bg-secondary mb-3" style="max-width: 18rem">
      <div class="card-body">
        <h5 class="card-title">Agendamentos</h5>
        <p class="card-text">{{ schedules }}</p>
      </div>
    </div>

    <div class="card text-white bg-info mb-3" style="max-width: 18rem">
      <div class="card-body">
        <h5 class="card-title">Atendidos</h5>
        <p class="card-text">{{ schedules_paid }}</p>
      </div>
    </div>

    <div
      class="card text-white mb-3"
      :class="{ 'bg-success': income >= 0, 'bg-danger': income < 0 }"
      style="max-width: 18rem"
    >
      <div class="card-body">
        <h5 class="card-title">{{ income >= 0 ? "Lucro" : "Prejuízo" }}</h5>
        <p class="card-text">
          R$ {{ income }} ({{ income >= income_lastweek ? "+" : "-" }} R$
          {{ (income - income_lastweek).toFixed(2) }})
        </p>
      </div>
    </div>
  </div>

  <div id="calendar"></div>
</template>

<script>
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import ptLocale from "@fullcalendar/core/locales/pt-br";
import Header from "../../components/Header";
import { Schedules, Dashboard } from "../../rest/admin";

export default {
  name: "Home",
  components: {
    Header,
  },
  data() {
    return {
      clients: 0,
      schedules: 0,
      schedules_paid: 0,
      income: 0,
      income_lastweek: 0,
    };
  },
  async beforeCreate() {
    const {
      clients,
      schedules,
      schedules_paid,
      income,
      income_lastweek,
    } = await Dashboard.index();

    this.clients = clients;
    this.schedules = schedules;
    this.schedules_paid = schedules_paid;
    this.income = income;
    this.income_lastweek = income_lastweek;
  },
  async mounted() {
    const calendar = new Calendar(document.querySelector("#calendar"), {
      plugins: [dayGridPlugin, bootstrapPlugin],
      themeSystem: "bootstrap",
      initialView: "dayGridMonth",
      locale: ptLocale,
      events: (await Schedules.index()).map((s) => ({
        title: s.user.name,
        start: new Date(s.date),
        url: `/admin/schedules/${s.id}/`,
      })),
    });

    calendar.render();
  },
  methods: {},
};
</script>
