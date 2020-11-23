<template>
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
      <label class="form-label col-md-3" for="input_price">Preço</label>
      <input
        type="number"
        class="form-control col-md-9"
        id="input_price"
        name="price"
        v-model="input_price"
        step="0.01"
        required
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["service"],
  components: {},
  data() {
    return {
      input_name: this.service?.name ? this.service.name : null,
      input_price: this.service?.price ? this.service.price : null,
    };
  },
  async beforeCreate() {},
  methods: {},
};
</script>
