<template>
  <section
    class="section section-countries"
    id="countries"
    @click="searchListBlur($event)"
    ref="sectCountries"
  >
    <div class="section-margin row" ref="titlegroup">
      <div class="section--titlegroup">
        <h1 class="section--title">Country Search</h1>
        <p class="section--subtitle">
          Daily Records of the Virus in each Country
        </p>
      </div>

      <div class="search-container" ref="searchContainer">
        <search-bar ref="search">
          <template #optionlist="slot">
            <search-list :input="slot.input"></search-list>
          </template>
          <template #errorlist>
            <search-list-error></search-list-error>
          </template>
        </search-bar>
      </div>

      <div class="country-block" id="cardContainer" ref="cardContainer">
        <!-- cards -->
        <template v-for="(obj, index) in countries" :key="index">
          <card-country :data="obj" :ref="(el) => countryCardEl(el)">
          </card-country>
        </template>

        <!-- covid -->
        <div class="covidCluster covidCluster-group--1" ref="covid1">
          <div class="covidCluster-img">&nbsp;</div>
        </div>
        <div class="covidCluster covidCluster-group--2" ref="covid2">
          <div class="covidCluster-img">&nbsp;</div>
        </div>

        <!-- grids -->
        <div class="grid grid-group--1">
          <div class="grid-img">&nbsp;</div>
        </div>
        <div class="grid grid-group--2">
          <div class="grid-img">&nbsp;</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import searchBar from "@/components/search/searchBar.vue";
import searchList from "@/components/search/searchList.vue";
import searchListError from "@/components/search/searchListError.vue";
import cardCountry from "@/components/cards/cardCountry.vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { ref } from "vue";
import { /*useStore,*/ createNamespacedHelpers } from "vuex";
const {
  mapState: countryState,
  mapGetters: countryGetters,
  mapMutations: countryMutations,
} = createNamespacedHelpers("countrySearch");

export default {
  components: {
    searchBar,
    searchList,
    searchListError,
    cardCountry,
  },
  setup() {
    let countryCards = ref([]);
    // const store = useStore();

    return {
      countryCards,
    };
  },
  computed: {
    ...countryState(["countries"]),
    ...countryGetters(["searchStates"]),
  },
  methods: {
    ...countryMutations(["pushState", "spliceState"]),
    countryCardEl(el) {
      if (el) {
        this.countryCards.push(ref(el));
        this.pushState({ prop: "countryCards", data: ref(el) });
      }
    },

    // search Field Events
    searchListBlur(event) {
      const state = this.searchStates(["els"]);
      const target = event.target;

      if (
        target === this.$refs.sectCountries ||
        target === this.$refs.titlegroup ||
        (target === this.$refs.cardContainer &&
          target !== this.$refs.searchContainer)
      ) {
        state.els.searchListBtn.checked = false;
        const animate = gsap.timeline();
        const duration = 0.2;
        animate.to(state.els.searchList, { y: 20, duration });
        animate.to(state.els.searchList, { opacity: 0, duration: 0.4 }, "<");
        animate.to(state.els.searchList, { display: "none", duration: 0 }, ">");
      }
    },

    // animations
    covidGroup() {
      const timelineObj = { repeat: -1, yoyo: true };
      const filter = "drop-shadow(0 2px 4px rgba(0,0,0, 0.5))";
      function animateObj(duration = 3) {
        return {
          ease: "ease",
          duration,
        };
      }

      const covid1 = gsap.timeline(timelineObj);
      covid1.to(this.$refs.covid1, { y: 10, ...animateObj(3) });
      covid1.to(this.$refs.covid1, { filter, ...animateObj(3) }, "<");

      const covid2 = gsap.timeline(timelineObj);
      covid2.to(this.$refs.covid2, { y: 10, ...animateObj(2) });
      covid2.to(this.$refs.covid2, { filter, ...animateObj(3) }, "<");
    },
    fadeIns() {
      const scroll = (el) =>
        gsap.timeline({
          scrollTrigger: {
            // markers: {
            //   startColor: "green",
            //   endColor: "red",
            //   fontSize: "16px"
            // },

            // trigger | (trigger, viewport)
            trigger: el,
            start: "top 75%",
            end: "bottom bottom",
          },
        });

      function animateObj() {
        return {
          ease: "ease",
          opacity: 0,
          duration: 2,
        };
      }

      const covid1 = scroll(this.$refs.covid1);
      covid1.from(this.$refs.covid1, { ...animateObj() });

      const covid2 = scroll(this.$refs.covid2);
      covid2.from(this.$refs.covid2, { ...animateObj() });
    },
  },
  beforeUpdate() {
    this.countryCards.splice(0);
    this.spliceState({ prop: "countryCards", data: 0 });
  },
  beforeMount() {
    this.spliceState({ prop: "countryCards", data: 0 });
  },
  mounted() {
    this.covidGroup();
    this.fadeIns();
  },
};
</script>

<style scoped lang="scss">
@use "~@/sass/styles" as styles;

@include styles.mxs-themes(light) {
  .section {
    &-countries {
      background: styles.fns-lighten(var(--c-lprimary), 6);
      // background: styles.fns-darken(var(--c-white), 4);
    }
  }
  .covidCluster {
    &-group {
      filter: drop-shadow(0 0 0 rgba(black, 0));
    }
    &-img {
      @supports (mask: url("~@/assets/covidicons/covid.svg")) {
        mask: url("~@/assets/covidicons/covid.svg");
        @include styles.mxs-svg-contain;
      }
      background: url("~@/assets/covidicons/covid@2x.png");
    }
    &-img {
      @include styles.mxs-img-contain;
      background: var(--c-dprimary);
    }
  }
  .grid {
    &-img {
      @supports (mask: url("~@/assets/bgs/circle-grid-10.svg")) {
        mask: url("~@/assets/bgs/circle-grid-10.svg");
        @include styles.mxs-svg-contain;
      }
      background: url("~@/assets/bgs/circle-grid-10@2x.png");
    }
    &-img {
      @include styles.mxs-img-contain;
      background: var(--c-dprimary);
    }
  }
}

@include styles.mxs-themes(dark) {
  .section {
    &-countries {
      background: var(--c-white);
    }
  }
}
</style>

<style scoped lang="scss">
@use "~@/sass/styles" as styles;

.row {
  margin: 4rem auto 4rem;
  display: block;

  @include styles.mxs-respond(lphone) {
    margin-top: 6rem;
  }
}

.section {
  &-countries {
    position: relative;
  }
  &--titlegroup {
    margin-bottom: 4rem;
    position: relative;
    z-index: 200;
  }
}

// covid
.covidCluster {
  position: absolute;

  &-group {
    &--1 {
      height: 18rem;
      width: 18rem;

      top: 25rem;
      right: 0%;

      @include styles.mxs-respond(ltablet) {
        height: 15rem;
        width: 15rem;
      }
      @include styles.mxs-respond(ptablet) {
        height: 12rem;
        width: 12rem;
      }
      @include styles.mxs-respond(lphone) {
      }
    }
    &--2 {
      height: 15rem;
      width: 15rem;

      bottom: 20rem;
      left: 2%;
      transform: rotateY(180deg);

      @include styles.mxs-respond(ltablet) {
        height: 12rem;
        width: 12rem;
      }
      @include styles.mxs-respond(ptablet) {
        height: 10rem;
        width: 10rem;
      }
    }
  }
  &-img {
    height: 100%;
    width: 100%;
  }
}

.search {
  &-container {
    width: 50rem;
    margin: auto;
    margin-bottom: 12rem;

    position: relative;
    z-index: 200;

    @include styles.mxs-respond(lphone) {
      width: 80%;
    }
    @include styles.mxs-respond(pphone) {
      width: 100%;
    }
  }
}

.country {
  &-block {
    width: 100%;

    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding-left: 4rem;

    position: relative;

    @include styles.mxs-respond(pphone) {
      padding: 0;
    }
  }
}

.grid {
  height: 15rem;
  width: 15rem;
  position: absolute;

  &-group {
    &--1 {
      top: -6rem;
      left: -1rem;
    }
    &--2 {
      bottom: -2rem;
      right: -1rem;
    }
  }
  &-img {
    height: 100%;
    width: 100%;
  }
}
</style>
