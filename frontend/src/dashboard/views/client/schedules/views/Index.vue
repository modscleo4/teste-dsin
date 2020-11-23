<template>
  <Header>Agendamentos</Header>

  <router-link
    class="btn btn-outline-success mb-3"
    to="/client/schedules/create"
    ><PlusIcon /> Adicionar</router-link
  >

  <div class="row float-right">
    <div class="col">
      <input
        type="date"
        class="form-control"
        id="input_date_min"
        name="date_min"
        v-model="date_min"
      />
    </div>

    <div class="col">
      <input
        type="date"
        class="form-control"
        id="input_date_max"
        name="date_max"
        v-model="date_max"
      />
    </div>
  </div>

  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th>Data/hora</th>
        <th>Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="schedule in schedules_filtered" :key="schedule.id">
        <th scope="row">{{ schedule.id }}</th>
        <td>
          {{
            new Intl.DateTimeFormat("pt-BR", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            }).format(new Date(schedule.date))
          }}
        </td>
        <td>
          {{
            { S: "Agendado", P: "Pago", M: "Não compareceu" }[schedule.status]
          }}
        </td>
        <td class="text-center">
          <router-link
            class="btn btn-sm btn-outline-info mr-1"
            :to="{ name: 'client.schedules.show', params: { id: schedule.id } }"
          >
            Detalhes</router-link
          >

          <div
            style="display: inline-block"
            v-if="daysDiff(new Date(), new Date(schedule.date)) >= 2"
          >
            <router-link
              class="btn btn-sm btn-outline-primary mr-1"
              :to="{
                name: 'client.schedules.edit',
                params: { id: schedule.id },
              }"
              ><EditIcon /> Editar</router-link
            >

            <button
              @click="destroy(schedule.id)"
              class="btn btn-sm btn-outline-danger"
            >
              <DeleteIcon /> Excluir
            </button>
          </div>
        </td>
      </tr>
      <tr v-if="schedules_filtered.length === 0">
        <td colspan="4" class="text-center">Nenhum agendamento encontrado.</td>
        <td style="display: none"></td>
        <td style="display: none"></td>
        <td style="display: none"></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { EditIcon, DeleteIcon, PlusIcon } from "@zhuowenli/vue-feather-icons";
import Swal from "sweetalert2";
import { daysDiff } from "../../../../../helpers";
import Header from "../../../../components/Header";
import { Schedules } from "../../../../rest/client";

export default {
  name: "Index",
  components: {
    Header,
    EditIcon,
    DeleteIcon,
    PlusIcon,
  },
  data() {
    return {
      date_min: null,
      date_max: null,
      schedules: [],
    };
  },
  async beforeCreate() {
    this.schedules = await Schedules.index();
  },
  computed: {
    schedules_filtered() {
      if (!this.date_min && !this.date_max) {
        return this.schedules;
      }

      return this.schedules.filter((s) => {
        const d = new Date(s.date);
        const d_min = this.date_min && new Date(this.date_min);
        const d_max = this.date_max && new Date(this.date_max);

        if (!d_min) {
          return d <= d_max;
        } else if (!d_max) {
          return d >= d_min;
        }

        return d >= d_min && d <= d_max;
      });
    },
  },
  methods: {
    daysDiff: (date1, date2) => daysDiff(date1, date2),

    destroy(id) {
      Swal.fire({
        title: "Tem certeza?",
        text: "Essa ação é irreversível!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, excluir!",
        cancelButtonText: "Não",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await Schedules.destroy(id)
            .then(() => {
              Swal.fire({
                title: "Excluído!",
                text: "Agendamento cancelado.",
                icon: "success",
              });

              this.schedules = this.schedules.filter((s) => s.id !== id);
            })
            .catch((e) => {
              Swal.fire({
                icon: "error",
                title: "Erro",
                text: e.message,
              });
            });
        }
      });
    },
  },
};
</script>
