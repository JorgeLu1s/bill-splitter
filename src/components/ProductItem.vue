<template>
  <div>
    <input v-model="product.name">
    <input type="number" v-model="product.price">
    <button @click="remove">Remove</button>
  </div>
</template>

<script>
export default {
  name: 'ProductItem',
  props: ['product', 'index'],
  methods: {
    remove: function () {
      this.$emit('remove-product', this.index)
    }
  }
}
</script>
