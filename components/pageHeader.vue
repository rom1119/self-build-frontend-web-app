<template>
  <div class="page__header row">
    <h2 class="page__header-title col-6">{{ pageName }}</h2>
    <div class="page__header-actions col-6">
      <button
        class="btn page__header-actions-btn"
        v-for="(button, index) in buttons"
        :key="index"
        :to="button.href"
      >{{ button.name }}</button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      pageName: String,
      buttons: Array
    },
    name: "pageHeader"
  }
</script>

<style scoped>

</style>
