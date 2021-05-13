<template>
  <navbar />
  <router-view />
  <!-- <my-footer /> -->
</template>

<script>
import navbar from "@/components/layouts/navbar.vue";
// import myFooter from "@/components/layouts/footer.vue";

export default {
  components: {
    navbar
    // myFooter
  },
};
</script>

<style scoped lang="scss">
@use "~@/sass/abstracts/abstracts" as abs;
</style>
