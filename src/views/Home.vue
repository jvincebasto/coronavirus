<template>
  <!-- <media-queries /> -->

  <hero />
  <global />
  <continent />
  <countries />

</template>

<script>
import Hero from "./homepage/Hero.vue";
import Global from "./homepage/Global.vue";
import Continent from "./homepage/Continent.vue";
import Countries from "./homepage/Countries.vue";

// import styles from "@/sass/abstracts/_variables.scss";
// import mediaQueries from "@/components/helpers/mediaQueries.vue";

export default {
  components: {
    Hero,
    Global,
    Continent,
    Countries,
    // mediaQueries,
  },
  mounted() {
  }
};
</script>

<style lang="scss">
@use "~@/sass/abstracts/abstracts" as abs;

.section {
  height: auto;
  min-height: 25vh;
  width: auto;
  max-width: 144rem;

  overflow: hidden;

  &-global,
  &-continents,
  &-countries,
  &-footer {
    padding: 7rem 0;
    background: abs.$vars-c-lprimary;
  }

  &-margin {
    height: auto;
    width: 100%;
    max-width: 85%;
    margin: auto;
  }


  &--titlegroup {
    text-align: center;
    margin-top: 4rem;
  }
  &--title {
    @include abs.mxs-font-type(heading3);

    @include abs.mxs-respond(pphone) {
      @include abs.mxs-font-type(heading4);
    }
  }
  &--subtitle {
    @include abs.mxs-font-type(subtitle1);

    @include abs.mxs-respond(pphone) {
      @include abs.mxs-font-type(subtitle2);
    }
  }
}
</style>
