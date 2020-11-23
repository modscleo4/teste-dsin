<template>
  <Header>Dashboard</Header>

  <div id="calendar"></div>
</template>

<script>
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import ptLocale from "@fullcalendar/core/locales/pt-br";
import Header from "../../components/Header";
import { Schedules } from "../../rest/client";

export default {
  name: "Home",
  components: {
    Header,
  },
  async mounted() {
    const calendar = new Calendar(document.querySelector("#calendar"), {
      plugins: [dayGridPlugin, bootstrapPlugin],
      themeSystem: "bootstrap",
      initialView: "dayGridMonth",
      locale: ptLocale,
      events: (await Schedules.index()).map((s) => ({
        title: "Agendamento",
        start: new Date(s.date),
      })),
    });

    calendar.render();
  },
  methods: {},
};
</script>
