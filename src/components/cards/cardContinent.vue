<template>
  <div class="slide slide-container" ref="continentSlide">
    <div class="slide-imgbox">
      <div
        class="slide-img"
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
      const path = `${require(`@/assets/continent/${continent}.png`)}`;
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

.slide {
  &-container {
    height: auto;
    width: 35rem;

    margin: auto;
    border-radius: 1rem;
    padding: 2rem;

    box-shadow: 0px 0px 10px rgba(black, 0.8), 0px 10px 15px rgba(black, 0.5);
  }
  &-imgbox {
    height: 20rem;
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
    //   background-image: url("~@/assets/continent/worldmap.png");
    // }
    // &--north-america {
    //   background-image: url("~@/assets/continent/north-america.png");
    // }
    // &--south-america {
    //   background-image: url("~@/assets/continent/south-america.png");
    // }
    // &--europe {
    //   background-image: url("~@/assets/continent/europe.png");
    // }
    // &--australia {
    //   background-image: url("~@/assets/continent/australia.png");
    // }
    // &--antartica {
    //   background-image: url("~@/assets/continent/antartica.png");
    // }
    //
    // &--africa {
    //   background-image: url("~@/assets/continent/africa.png");
    // }
    // &--asia {
    //   background-image: url("~@/assets/continent/asia.png");
    // }
  }
  &-img {
    @include abs.mxs-img-contain;
    background-position: center;
    filter: drop-shadow(0 2px 5px rgba(crimson, 0.8))
      drop-shadow(0 5px 10px rgba(black, 0.5));
  }
}

.slide {
  :deep(.case-content--block) {
    min-width: unset;
    padding: 0;
    background: transparent;
    box-shadow: none;
  }
}
</style>
