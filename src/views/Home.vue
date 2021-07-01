<template>

  <navbar :data="data" />
  <hero />
  <global />
  <continent />
  <countries />
  <my-footer />

</template>

<script>
import Navbar from "@/components/layouts/navbar.vue";
import Hero from "./homepage/Hero.vue";
import Global from "./homepage/Global.vue";
import Continent from "./homepage/Continent.vue";
import Countries from "./homepage/Countries.vue";
import MyFooter from "@/components/layouts/footer.vue";

export default {
  components: {
    Navbar,
    Hero,
    Global,
    Continent,
    Countries,
    MyFooter,
  },
  setup() {
    const links = [
      {
        title: "Global",
        hash: "#global",
      },
      {
        title: "Continents",
        hash: "#continents",
      },
      {
        title: "Countries",
        hash: "#countries",
      },
      {
        title: "Contacts",
        hash: "#contacts",
      },
    ];
    const data = {
      links,
    };

    return {
      links,
      data,
    };
  },
};
</script>

<style lang="scss">
@use "~@/sass/styles" as styles;
</style>
