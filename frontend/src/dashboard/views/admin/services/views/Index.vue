<template>
  <Header>Serviços</Header>

  <router-link class="btn btn-outline-success mb-3" to="/admin/services/create"
    ><PlusIcon /> Adicionar</router-link
  >

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
          <router-link
            class="btn btn-sm btn-outline-primary mr-1"
            :to="{ name: 'admin.services.edit', params: { id: service.id } }"
            ><EditIcon /> Editar</router-link
          >

          <button
            @click="destroy(service.id)"
            class="btn btn-sm btn-outline-danger"
          >
            <DeleteIcon /> Excluir
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
</template>

<script>
import { EditIcon, DeleteIcon, PlusIcon } from "@zhuowenli/vue-feather-icons";
import Swal from "sweetalert2";
import Header from "../../../../components/Header";
import { Services } from "../../../../rest/admin";

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
      services: [],
    };
  },
  async beforeCreate() {
    this.services = await Services.index();
  },
  methods: {
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
          await Services.destroy(id)
            .then(() => {
              Swal.fire({
                title: "Excluído!",
                text: "Agendamento cancelado.",
                icon: "success",
              });

              this.services = this.services.filter((s) => s.id !== id);
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
