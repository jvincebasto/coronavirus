<template>
  <div class="card card-container" ref="continentSlide">
      <!-- <div class="card-img" ref="img" 
        :style="cardImage(data.continent)">
      </div> -->
    <div class="card-imgbox">
      <div class="card-img" ref="img" :class="continentNamesClassName(data.continent)">
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
    },
    continentNamesClassName(value) {
      const continent = this.continentNames(value);
      return `card-img--${continent}`;
    }
  },
  mounted() {
    // console.log("cardContinent", this.data);
  }
};
</script>

<style scoped lang="scss">
@use "~@/sass/styles" as styles;


@include styles.mxs-themes(light) {
  .card {
    &-container {
      background: styles.fns-lighten(var(--c-lprimary), 6);
      box-shadow: styles.$vars-box-shadow;
      -webkit-tap-highlight-color: transparent;
    }
  }


  // card image
  .card {
    &-imgbox {
      filter: drop-shadow(0 0 4px rgba(crimson, 0.8))
        drop-shadow(0 4px 4px rgba(black, 0.5));
    }
    &-img {
      height: 100%;
      width: 60%;

      &--europe,
      &--asia {
        width: 80%;
      }

      &--world {
        @supports(mask: url("~@/assets/continents/worldmap.svg")) {
          mask: url("~@/assets/continents/worldmap.svg");
          @include styles.mxs-svg-contain;
        }
        background: url("~@/assets/continents/worldmap@2x.png");
      }
      &--north-america {
        @supports(mask: url("~@/assets/continents/north-america.svg")) {
          mask: url("~@/assets/continents/north-america.svg");
          @include styles.mxs-svg-contain;
        }
        background: url("~@/assets/continents/north-america@2x.png");
      }
      &--south-america {
        @supports(mask: url("~@/assets/continents/south-america.svg")) {
          mask: url("~@/assets/continents/south-america.svg");
          @include styles.mxs-svg-contain;
        }
        background: url("~@/assets/continents/south-america@2x.png");
      }
      &--europe {
        @supports(mask: url("~@/assets/continents/europe.svg")) {
          mask: url("~@/assets/continents/europe.svg");
          @include styles.mxs-svg-contain;
        }
        background: url("~@/assets/continents/europe@2x.png");
      }
      &--australia {
        @supports(mask: url("~@/assets/continents/australia.svg")) {
          mask: url("~@/assets/continents/australia.svg");
          @include styles.mxs-svg-contain;
        }
        background: url("~@/assets/continents/australia@2x.png");
      }
      &--antartica {
        @supports(mask: url("~@/assets/continents/antartica.svg")) {
          mask: url("~@/assets/continents/antartica.svg");
          @include styles.mxs-svg-contain;
        }
        background: url("~@/assets/continents/antartica@2x.png");
      }


      // broken images: africa and asia
      &--africa {
        @supports(mask: url("~@/assets/continents/africa.svg")) {
          mask: url("~@/assets/continents/africa.svg");
          @include styles.mxs-svg-contain;
        }
        background: url("~@/assets/continents/africa@2x.png");
      }
      &--asia {
        @supports(mask: url("~@/assets/continents/asia.svg")) {
          mask: url("~@/assets/continents/asia.svg");
          @include styles.mxs-svg-contain;
        }
        background: url("~@/assets/continents/asia@2x.png");
      }
    }
    &-img {
      @include styles.mxs-img-contain;
      background-position: center;
      background: var(--c-dprimary);
    }
  }


  .card {
    :deep(.case-content--block) {
      background: transparent;
      box-shadow: none;
    }
  }
}

@include styles.mxs-themes(dark) {
  .card {
    &-container {
      background: styles.fns-darken(var(--c-lprimary), 3);
    }
  }
}
</style>


<style scoped lang="scss">
@use "~@/sass/styles" as styles;


.card {
  &-container {
    height: auto;
    width: 35rem;

    margin: auto;
    border-radius: 1rem;
    padding: 2rem;

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
  }
}

.card {
  :deep(.case-content--block) {
    min-width: unset;
    padding: 0;
  }
}
</style>
