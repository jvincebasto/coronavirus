<template>
  <ul class="links">
    <template v-for="(obj, index) in data" :key="index">
      <nav-link :data="obj"></nav-link>
    </template>
  </ul>
</template>

<script>
import NavLink from "@/components/navs/navLinkItem.vue";

export default {
  props: ["data"],
  components: {
    NavLink,
  },
  setup() {
    const links = [];

    return {
      links,
    };
  },
  methods: {},
};
</script>

<style scoped lang="scss">
@use "~@/sass/styles" as styles;
</style>

<style scoped lang="scss">
@use "~@/sass/styles" as styles;

// Nav Links
.links {
  height: 100%;
  display: flex;
  z-index: 5;
}
</style>
