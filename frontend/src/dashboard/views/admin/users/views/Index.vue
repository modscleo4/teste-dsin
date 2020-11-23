<template>
  <Header>Usuários</Header>

  <router-link class="btn btn-outline-success mb-3" to="/admin/users/create"
    ><PlusIcon /> Adicionar</router-link
  >

  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th>Nome</th>
        <th>Email</th>
        <th>Grupo</th>
        <th>Ativo</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <th scope="row">{{ user.id }}</th>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.roles[0].name }}</td>
        <td>{{ user.active ? "Sim" : "Não" }}</td>
        <td class="text-center">
          <div v-if="user.id !== curr_user.id">
            <router-link
              class="btn btn-sm btn-outline-primary mr-1"
              :to="{ name: 'admin.users.edit', params: { id: user.id } }"
              ><EditIcon /> Editar</router-link
            >

            <button
              @click="destroy(user.id)"
              class="btn btn-sm btn-outline-danger"
            >
              <DeleteIcon /> Excluir
            </button>
          </div>
        </td>
      </tr>
      <tr v-if="users.length === 0">
        <td colspan="6" class="text-center">Nenhum usuário encontrado.</td>
        <td style="display: none"></td>
        <td style="display: none"></td>
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
import { Users } from "../../../../rest/admin";

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
      curr_user: JSON.parse(localStorage.getItem("user")),
      users: [],
    };
  },
  async beforeCreate() {
    this.users = await Users.index();
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
          await Users.destroy(id)
            .then(() => {
              Swal.fire({
                title: "Excluído!",
                text: "Agendamento cancelado.",
                icon: "success",
              });

              this.users = this.users.filter((s) => s.id !== id);
            })
            .catch((e) => {
              Swal.fire({
                icon: "error",
                title: "Erro",
                text: e.message(),
              });
            });
        }
      });
    },
  },
};
</script>
