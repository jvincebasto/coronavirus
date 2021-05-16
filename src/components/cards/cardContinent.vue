<template>
  <div class="card card-container" ref="continentSlide">
    <div class="card-imgbox">
      <div
        class="card-img"
        :style="`${cardImage(data.continent)}`"
        ref="img"
      ></div>
      <!-- <div class="slide-img" ref="img">&nbsp;</div> -->
    </div>

    <card-case :data="data">
      <template #title>{{ data.continent }}</template>
    </card-case>
  </div>
</template>

<script>
import cardCase from "@/components/cards/cardCase.vue";

export default {
  props: ["data"],
  components: {
    cardCase
  },
  methods: {
    continentNames(value) {
      const lvalue = value.toLowerCase();
      if (lvalue === "North America".toLowerCase()) return "north-america";
      else if (lvalue === "South America".toLowerCase()) return "south-america";
      else if (lvalue === "Australia/Oceania".toLowerCase()) return "australia";
      else return lvalue;
    },
    cardImage(value) {
      const continent = this.continentNames(value);
      const path = `${require(`@/assets/continents/${continent}@2x.png`)}`;
      return `background-image: url(${path})`;
    }
  },
  mounted() {
    // console.log("cardContinent", this.data);
  }
};
</script>

<style scoped lang="scss">
@use "~@/sass/abstracts/abstracts" as abs;

.card {
  &-container {
    height: auto;
    width: 35rem;

    margin: auto;
    border-radius: 1rem;
    padding: 2rem;

    box-shadow: 0px 0px 10px rgba(black, 0.8), 0px 10px 15px rgba(black, 0.5);

    position: relative;
    z-index: 100;

    $section-bg: lighten(abs.$vars-c-lprimary, 5%);
    background: $section-bg;
  }
  &-imgbox {
    height: 16rem;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 0;

    margin-bottom: 2rem;
    overflow: hidden;
  }
  &-img {
    height: 100%;
    width: 100%;

    // &--world {
    //   background-image: url("~@/assets/continents/worldmap@2x.png");
    // }
    // &--north-america {
    //   background-image: url("~@/assets/continents/north-america@2x.png");
    // }
    // &--south-america {
    //   background-image: url("~@/assets/continents/south-america@2x.png");
    // }
    // &--europe {
    //   background-image: url("~@/assets/continents/europe@2x.png");
    // }
    // &--australia {
    //   background-image: url("~@/assets/continents/australia@2x.png");
    // }
    // &--antartica {
    //   background-image: url("~@/assets/continents/antartica@2x.png");
    // }
    //
    // &--africa {
    //   background-image: url("~@/assets/continents/africa@2x.png");
    // }
    // &--asia {
    //   background-image: url("~@/assets/continents/asia@2x.png");
    // }
  }
  &-img {
    @include abs.mxs-img-contain;
    background-position: center;
    filter: drop-shadow(0 2px 5px rgba(crimson, 0.8))
      drop-shadow(0 5px 10px rgba(black, 0.5));
  }
}

.card {
  :deep(.case-content--block) {
    min-width: unset;
    padding: 0;
    background: transparent;
    box-shadow: none;
  }
}
</style>
