<template>
  <section class="section section-continents" id="continents" ref="sectContinents">
    <div class="section-margin section-margin--titlegroup">
      <div class="section--titlegroup">
        <h1 class="section--title">Continental Cases</h1>
        <p class="section--subtitle">
          Daily Records of the Virus in each Continent
        </p>
      </div>
    </div>

    <!--     <div class="block" ref="block">
      click here
    </div>
    <p ref="text">block text</p> -->

    <div class="section-margin slider-container">
      <div class="section-grid section-grid--1">&nbsp;</div>
      <template v-if="continentBool">
        <slider :data="continents">
          <template #component="slot">
            <card-continent :data="slot.prop"></card-continent>
          </template>
        </slider>
      </template>
    </div>

    <div class="section-grid section-grid--2">&nbsp;</div>
  </section>
</template>

<script>
import cardContinent from "@/components/cards/cardContinent.vue";
import { ref, reactive, defineAsyncComponent } from "vue";
import { /*useStore,*/ createNamespacedHelpers } from "vuex";
const { mapActions: covidActions } = createNamespacedHelpers("covid");

export default {
  components: {
    slider: defineAsyncComponent({
      loader: () => import("@/components/slider/slider.vue")
      // delay: 200,
      // timeout: 3000,
      // errorComponent: errorComponent,
      // loadingComponent: loadingComponent,
    }),
    cardContinent,
  },
  setup() {
    const continents = reactive([]);
    let bool = ref(false);
    // const store = useStore();

    return {
      continents,
      bool
    };
  },
  methods: {
    ...covidActions(["fetchAllContinents"]),
    async getContinents() {
      this.continents = await this.fetchAllContinents();
      if (this.continents) this.bool = true;
    },
    block() {
      const data = {
        // continents: JSON.stringify(this.continents),
        continents: this.continents,
        bool: this.bool
      };
      console.log("data", data);
    }
  },
  computed: {
    continentBool() {
      return this.bool;
    }
  },
  async mounted() {
    await this.getContinents();
    // this.$refs.block.onclick = this.block;

    // const date = this.$refs.date;
    // const time = this.$refs.time;
    // this.startClock(date, time);
  }
};
</script>

<style scoped lang="scss">
@use "~@/sass/abstracts/abstracts" as abs;

$case-bg: darken(abs.$vars-c-lprimary, 10%);

.block {
  height: 10rem;
  width: 10rem;
  background: green;
  display: none;
}

.slider-container {
  margin: auto;
  margin-bottom: 10rem;

  position: relative;
  z-index: 100;

}

.section {
  &-continents {
    $section-bg: lighten(abs.$vars-c-lprimary, 5%);
    background: $section-bg;
    min-height: 50vh;

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
      top: -4rem;
      left: -10rem;
    }
    &--2 {
      background-image: url("~@/assets/bgs/circle-grid-10@2x.png");
      bottom: -10.5rem;
      right: 0rem;
    }
  }
  &-grid {
    @include abs.mxs-img-contain;
  }
}

</style>
