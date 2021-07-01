<template>
  <!-- <media-queries /> -->
  <theme-init />
  <router-view />
</template>

<script>
// import MediaQueries from "@/components/helpers/mediaQueries.vue";
import themeInit from "@/components/theme/themeInit.vue";

export default {
  components: {
    // MediaQueries,
    themeInit,
  },
};
</script>

<style scoped lang="scss">
@use "~@/sass/styles" as styles;
</style>
