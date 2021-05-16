<template>
  <section class="section section-countries" id="countries" ref="sectCountries">

    <div class="section-margin section-margin--titlegroup">
      <div class="section--titlegroup">
        <h1 class="section--title">Country Search</h1>
        <p class="section--subtitle">
          Daily Records of the Virus in each Country
        </p>
      </div>


      <div class="search-container">
        <search-bar ref="search"></search-bar>
      </div>


      <div class="country-block" ref="cardContainer" id="cardContainer">
        <template v-for="(obj, index) in stateCards" :key="index">
          <card-country :data="obj" :ref="el=>{cardEls(el, obj)}">
          </card-country>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import searchBar from "@/components/search/searchBar.vue";
import cardCountry from "@/components/cards/cardCountry.vue";
import { ref, onBeforeUpdate } from "vue";
import { useStore, createNamespacedHelpers } from "vuex";

const { mapState, mapMutations } = createNamespacedHelpers("cards");
const { mapState: covidState } = createNamespacedHelpers("covid");

export default {
  components: {
    cardCountry,
    searchBar
  },
  setup() {
    const store = useStore();

    onBeforeUpdate(() => {
      store.state.cards.cardRefs.splice(0);
    });

    return {};
  },
  methods: {
    cardEls(el, obj) {
      if (el) {
        this.addCardEl(
          ref({
            country: obj.value.country,
            el
          })
        );
      }
    },
    stateLogs() {
      console.log("cards", this.states);
      console.log("covid", this.covid);
    },
    ...mapMutations(["addCardEl"])
  },
  computed: {
    ...covidState({
      covid: state => state
    }),
    ...mapState({
      cards: state => state
    }),
    states() {
      const stateVars = {
        cardRefs: this.cards.cardRefs,
        cardList: this.cards.cardList,
        cards: this.cards
      };
      return stateVars;
    },
    stateCards() {
      return this.cards.cardList;
    }
  },
  mounted() {
    // this.$refs.block.onclick = this.stateLogs;
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
    $section-bg: lighten(abs.$vars-c-lprimary, 10%);
    background: $section-bg;
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
    text-align: center;
    margin-bottom: 4rem;
  }
  &--title {
    font-family: tbold;
    line-height: 1;
  }
  &--subtitle {
    font-family: tbold;
    color: abs.$vars-c-dprimary;
    text-transform: lowercase;
  }
}

.search {
  &-container {
    width: 50rem;
    margin: auto;
    margin-bottom: 12rem;
  }
}

.country {
  &-block {
    width: 100%;

    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding-left: 4rem;
  }
}
</style>
