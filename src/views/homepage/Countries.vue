<template>
  <section class="section section-countries" id="countries" ref="sectCountries">

    <div class="section-margin section-margin--titlegroup">
      <div class="section--titlegroup">
        <h1 class="section--title">Country Search</h1>
        <p class="section--subtitle">
          Daily Records of the Virus in each Country
        </p>
      </div>


<!--       <div class="search-container">
        <search-bar ref="search"></search-bar>
      </div> -->

      <div class="search-container">
        <search-bar ref="search">
          <template #component>
            <search-list></search-list>
          </template>
        </search-bar>
      </div>


      <div class="country-block" ref="cardContainer" id="cardContainer">
        <template v-for="(obj, index) in countries" :key="index">
          <card-country :data="obj" :ref="el=>countryCardEl(el)">
          </card-country>
        </template>
    
        <div class="section-grid section-grid--1">&nbsp;</div>
        <div class="section-grid section-grid--2">&nbsp;</div>
      </div>
    </div>
  </section>
</template>

<script>
import searchBar from "@/components/searchs/searchBar.vue";
import searchList from "@/components/searchs/searchList.vue";
import cardCountry from "@/components/cards/cardCountry.vue";
import { ref } from "vue";
import { /*useStore,*/ createNamespacedHelpers } from "vuex";
const { mapState: countryState, mapGetters: countryGetters, mapMutations: countryMutations } = createNamespacedHelpers("countrySearch");

export default {
  components: {
    searchBar,
    searchList,
    cardCountry,
  },
  setup() {
    let countryCards = ref([]);
    // const store = useStore();

    return {
      countryCards
    };
  },
  computed: {
    ...countryState(["countries"]),
    ...countryGetters(["searchStates"]),
  },
  methods: {
    ...countryMutations(["pushState","spliceState"]),
    countryCardEl(el) {
      if (el) { 
        this.countryCards.push(ref(el));
        this.pushState({ prop: "countryCards", data: ref(el) });
      }
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
    // const state = this.searchStates(["countries","countryCards"]);
    // console.log(state.countries,state.countryCards);
  }
};
</script>

<style scoped lang="scss">
@use "~@/sass/abstracts/abstracts" as abs;

.block {
  height: 10rem;
  width: 10rem;
  background: crimson;
  // display: none;
}

.section {
  &-countries {
    min-height: 150vh;
    $section-bg: lighten(abs.$vars-c-lprimary, 10%);
    background: $section-bg;

    position: relative;
  }
  &-margin {
    &--titlegroup {
      margin: 8rem auto 3rem;

      @include abs.mxs-respond(lphone) {
        margin-top: 6rem;
      }
    }
  }
  &--titlegroup {
    margin-bottom: 4rem;
    position: relative;
    z-index: 200;
  }
}

.search {
  &-container {
    width: 50rem;
    margin: auto;
    margin-bottom: 12rem;
    
    position: relative;
    z-index: 200;


    @include abs.mxs-respond(lphone) {
      width: 80%;
    }
    @include abs.mxs-respond(pphone) {
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

    @include abs.mxs-respond(pphone) {
      padding: 0;
    }
  }
}

.section {
  &-grid {
    height: 15rem;
    width: 15rem;
    position: absolute;

    @include abs.mxs-respond(pphone) {
      // display: none;
    }

    &--1 {
      background-image: url("~@/assets/bgs/circle-grid-10@2x.png");
      top: -6rem;
      left: -1rem;

    }
    &--2 {
      background-image: url("~@/assets/bgs/circle-grid-10@2x.png");
      bottom: -2rem;
      right: -1rem;

    }
  }
  &-grid {
    @include abs.mxs-img-contain;
  }
}
</style>
