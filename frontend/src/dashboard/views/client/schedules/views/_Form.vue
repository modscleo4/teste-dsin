<template>
  <div class="form-row mb-3">
    <div class="input-group">
      <label class="form-label col-md-3" for="input_date"
        >Data do agendamento</label
      >
      <input
        type="datetime-local"
        class="form-control col-md-9"
        id="input_date"
        name="date"
        :min="min_input_date"
        v-model="input_date"
        required
      />
    </div>
  </div>

  <div class="form-row mb-3">
    <div class="input-group">
      <label class="form-label col-md-3" for="input_note">Observações</label>
      <textarea
        class="form-control col-md-9"
        rows="10"
        id="input_note"
        name="note"
        v-model="input_note"
      ></textarea>
    </div>
  </div>

  <div class="form-row mb-3" style="display: none">
    <select id="input_services" name="services" multiple>
      <option
        v-for="service in services"
        :key="service.id + 'a'"
        :value="service.id"
        :selected="input_services.includes(service.id)"
      >
        {{ service.name }}
      </option>
    </select>
  </div>

  <div class="form-row mb-3">
    <p>Serviços</p>

    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th>Nome</th>
          <th>Preço</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="service in services" :key="service.id">
          <th scope="row">{{ service.id }}</th>
          <td>{{ service.name }}</td>
          <td>R$ {{ service.price }}</td>
          <td class="text-center">
            <button
              v-if="!input_services.includes(service.id)"
              @click="input_services.push(service.id)"
              class="btn btn-sm btn-outline-success"
            >
              <Plus-Icon />
            </button>

            <button
              v-if="input_services.includes(service.id)"
              @click="
                input_services = input_services.filter((s) => s !== service.id)
              "
              class="btn btn-sm btn-outline-danger"
            >
              <Minus-Icon />
            </button>
          </td>
        </tr>

        <tr v-if="services.length === 0">
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
import { PlusIcon, MinusIcon } from "@zhuowenli/vue-feather-icons";
import { Services } from "../../../../rest/client";

export default {
  props: ["schedule"],
  components: {
    PlusIcon,
    MinusIcon,
  },
  data() {
    return {
      services: [],
      min_input_date: this.schedule?.date
        ? this.formatDate(new Date(this.schedule.date))
        : this.formatDate(new Date()),
      input_date: this.schedule?.date
        ? this.formatDate(new Date(this.schedule.date))
        : null,
      input_note: this.schedule?.note ?? null,
      input_services: this.schedule?.services
        ? this.schedule.services.map((s) => s.id)
        : [],
    };
  },
  async beforeCreate() {
    this.services = await Services.index();
  },
  methods: {
    formatDate: (date) => {
      return `${date.getFullYear()}-${("" + (date.getMonth() + 1)).padStart(
        2,
        "0"
      )}-${("" + date.getDate()).padStart(2, "0")}T${(
        "" + date.getHours()
      ).padStart(2, "0")}:${("" + date.getMinutes()).padStart(2, "0")}`;
    },
  },
};
</script>
