<template>
  <div class="card card-container" ref="continentSlide">
    <div class="card-imgbox">
      <div class="card-img" ref="img" 
        :style="`${cardImage(data.continent)}`">
      </div>
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
      else if (lvalue === "Australia-Oceania".toLowerCase()) return "australia";
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

    background: lighten(abs.$vars-c-lprimary, 6%);
    box-shadow: abs.$vars-box-shadow;
    -webkit-tap-highlight-color: transparent;


    position: relative;
    z-index: 100;
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
}


// card image
.card {
  &-img {
    height: 100%;
    width: 100%;

    @include abs.mxs-img-contain;
    background-position: center;
    filter: drop-shadow(0 0 4px rgba(crimson, 0.8))
      drop-shadow(0 4px 4px rgba(black, 0.5));

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


    // broken images: africa and asia
    // &--africa {
    //   background-image: url("~@/assets/continents/africa@2x.png");
    // }
    // &--asia {
    //   background-image: url("~@/assets/continents/asia@2x.png");
    // }
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
