<template>
  <div class="form-row mb-3">
    <div class="input-group">
      <label class="form-label col-md-3" for="input_role_id">Grupo</label>
      <select
        id="input_role_id"
        class="form-control col-md-9"
        v-model="input_role_id"
        required
      >
        <option v-for="role in roles" :key="role.id" :value="role.id">
          {{ role.name }}
        </option>
      </select>
    </div>
  </div>

  <div class="form-row mb-3">
    <div class="input-group">
      <label class="form-label col-md-3" for="input_name">Nome</label>
      <input
        type="text"
        class="form-control col-md-9"
        id="input_name"
        name="name"
        v-model="input_name"
        required
      />
    </div>
  </div>

  <div class="form-row mb-3">
    <div class="input-group">
      <label class="form-label col-md-3" for="input_phone">Celular</label>
      <input
        type="text"
        class="form-control col-md-9"
        id="input_phone"
        name="phone"
        v-model="input_phone"
        required
      />
    </div>
  </div>

  <div class="form-row mb-3">
    <div class="input-group">
      <label class="form-label col-md-3" for="input_email">Email</label>
      <input
        type="email"
        class="form-control col-md-9"
        id="input_email"
        name="email"
        v-model="input_email"
        required
      />
    </div>
  </div>

  <div v-if="!user" class="form-row mb-3">
    <div class="input-group">
      <label class="form-label col-md-3" for="input_password">Senha</label>
      <input
        type="password"
        class="form-control col-md-9"
        id="input_password"
        name="password"
        v-model="input_password"
        required
      />
    </div>
  </div>

  <div class="input-group mb-3">
    <label class="form-label col-md-3" for="input_active">Ativo</label>
    <select
      id="input_active"
      class="form-control col-md-9"
      v-model="input_active"
      required
    >
      <option value="1">Sim</option>
      <option value="0">Não</option>
    </select>
  </div>
</template>

<script>
import { Roles } from "../../../../rest/admin";

export default {
  props: ["user"],
  components: {},
  data() {
    return {
      roles: [],
      input_role_id: this.user?.roles[0].id ?? null,
      input_name: this.user?.name ?? null,
      input_phone: this.user?.phone ?? null,
      input_email: this.user?.email ?? null,
      input_active: this.user?.active ?? true ? 1 : 0,
    };
  },
  async beforeCreate() {
    this.roles = await Roles.index();
  },
};
</script>
