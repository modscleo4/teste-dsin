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
          <th></th>
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
          <td class="text-center">
            <div class="dropdown mr-1" style="display: inline-block">
              <button
                class="btn btn-sm btn-outline-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Status
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a
                  class="dropdown-item"
                  @click="serviceStatus(schedule.id, service.id, 'W')"
                  href="#"
                  >Aguardando</a
                >
                <a
                  class="dropdown-item"
                  @click="serviceStatus(schedule.id, service.id, 'D')"
                  href="#"
                  >Concluído
                </a>
              </div>
            </div>
          </td>
        </tr>

        <tr v-if="schedule.services.length === 0">
          <td colspan="5" class="text-center">Nenhum serviço encontrado.</td>
          <td style="display: none"></td>
          <td style="display: none"></td>
          <td style="display: none"></td>
          <td style="display: none"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Header from "../../../../components/Header";
import { Schedules } from "../../../../rest/admin";

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
    console.log(this.schedule);
  },
  methods: {
    async serviceStatus(id, service_id, s) {
      await Schedules.serviceStatus(id, service_id, { status: s })
        .then(() => {
          this.schedule = {
            ...this.schedule,
            services: this.schedule.services.map(
              (sv) =>
                (sv.id === service_id && {
                  ...sv,
                  pivot: { ...sv.pivot, status: s },
                }) ||
                sv
            ),
          };
        })
        .catch((e) => {
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
