<template>
  <section
    class="section section-countries"
    id="countries"
    data-section="countries"
    ref="sectCountries"
  >
    <div class="section-vector--cchand">&nbsp;</div>

    <div class="section-margin">
      <div class="section-search-group">
        <div class="section-grouptitle">
          <h1 class="section-title">Search Countries</h1>
          <p class="section-subtitle">Affected by the Virus</p>
        </div>

        <div class="search-container">
          <search ref="search"></search>
        </div>
      </div>

      <!-- <div class="block" ref="block">here</div> -->

      <div class="country-block" ref="cardContainer" id="cardContainer">
        <template v-for="(obj, index) in stateCards" :key="index">
          <card-country
            :data="obj"
            :ref="
              el => {
                cardEls(el, obj);
              }
            "
          ></card-country>
        </template>
      </div>
    </div>

    <div class="section-vector--ctop">&nbsp;</div>
  </section>
</template>

<script>
import Search from "@/components/Search.vue";
import CardCountry from "@/components/CardCountry.vue";
import { ref, onBeforeUpdate } from "vue";
import { useStore, createNamespacedHelpers } from "vuex";

const { mapState, mapMutations } = createNamespacedHelpers("cards");
const { mapState: covidState } = createNamespacedHelpers("covid");

export default {
  components: {
    CardCountry,
    Search
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

<style lang="scss">
@use "./../../sass/abstracts/abstracts" as abs;

.block {
  height: 10rem;
  width: 10rem;
  background: crimson;
  // display: none;
}

$case-title: lighten(abs.$vars-c-dprimary, 20%);

.section {
  &-search-group {
    margin-top: 36rem;
    margin-bottom: 18rem;

    display: flex;
    flex-direction: column;
    align-items: center;

    @include abs.mxs-respond(lphone) {
      margin-top: 50vw;
    }
    @include abs.mxs-respond(pphone) {
      margin-top: 45vw;
    }
  }

  &-countries {
    position: relative;

    .section {
      &-grouptitle {
        margin-bottom: 1rem;

        display: flex;
        flex-direction: column;
        align-items: center;
      }

      &-title {
        @include abs.mxs-respond(lphone) {
          font-size: 4.8rem;
        }
        @include abs.mxs-respond(pphone) {
          font-size: 3.2rem;
        }
      }
      &-subtitle {
        letter-spacing: 5px;
        text-transform: uppercase;
        margin-top: -8px;
        margin-bottom: 2rem;

        @include abs.mxs-respond(lphone) {
          letter-spacing: 4px;
          text-transform: capitalize;
        }
        @include abs.mxs-respond(lphone) {
          font-size: 1.2rem;
          margin-top: -4px;
        }
      }
    }

    .search {
      &-container {
        width: 50rem;
        position: relative;

        @include abs.mxs-respond(lphone) {
          width: 90%;
        }
      }
    }
  }

  &-vector {
    &--cchand {
      height: 65rem;
      width: 65rem;

      position: absolute;
      top: -1px;
      left: -1px;

      @supports (mask: url(../../assets/cchand.svg)) {
        mask: url(../../assets/cchand.svg);
        @include abs.mxs-svg-contain;
      }
      background-image: url(../../assets/cchand.svg);
      @include abs.mxs-img-contain;

      @include abs.mxs-respond(lphone) {
        height: 40rem;
        width: 85%;
      }
      @include abs.mxs-respond(pphone) {
        height: 30rem;
        width: 90%;
      }
    }

    &--ctop {
      height: 30rem;
      width: 30rem;

      position: absolute;
      bottom: -16rem;
      right: -5rem;

      @supports (mask: url(../../assets/bgctop.svg)) {
        mask: url(../../assets/bgctop.svg);
        @include abs.mxs-svg-contain;
      }
      background-image: url(../../assets/bgctop.svg);
      @include abs.mxs-img-contain;

      background: abs.$vars-c-black;
      transform: rotateX(180deg) rotateY(180deg);

      @include abs.mxs-respond(lphone) {
        height: 22rem;
        width: 22rem;

        bottom: -12rem;
        right: -4rem;
      }
      @include abs.mxs-respond(pphone) {
        height: 15rem;
        width: 15rem;

        bottom: -8rem;
        right: -2rem;
      }
    }
  }
}

.country {
  &-block {
    width: 100%;

    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 21rem;
    margin-left: 1.5rem;

    @include abs.mxs-respond(lphone) {
      margin-left: 0;
    }
    @include abs.mxs-respond(pphone) {
      margin-bottom: 15rem;
    }
  }
}
</style>
