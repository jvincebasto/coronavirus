<template>
  <section class="section section-continents" id="continents"
    ref="sectContinents">
    
    
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
      <div class="section-covidCluster section-covidCluster--1" ref="covid1">&nbsp;</div>
      <div class="section-covidCluster section-covidCluster--2" ref="covid2">&nbsp;</div>


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
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
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
  computed: {
    continentBool() {
      return this.bool;
    }
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
    },


    // animations
    covidGroup() {
      const ease = "ease";
      const timelineObj = { repeat: -1, yoyo: true };

      const covid1 = gsap.timeline(timelineObj);
      covid1.to(this.$refs.covid1,{ y: 10, ease, duration: 3 });
      covid1.to(this.$refs.covid1,{ filter: "drop-shadow(0 2px 4px rgba(0,0,0, 0.5))", duration: 3 },"<");

      const covid2 = gsap.timeline(timelineObj);
      covid2.to(this.$refs.covid2,{ y: 10, ease, duration: 2 });
      covid2.to(this.$refs.covid2,{ filter: "drop-shadow(0 2px 4px rgba(0,0,0, 0.5))", duration: 2 },"<");
    },
    covidScroll() {
      const scroll = (el) => gsap.timeline({
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
          scrub: 1,
        }
      });

      const opacity = 0;
      const duration = 2;

      const covid1 = scroll(this.$refs.covid1);
      covid1.from(this.$refs.covid1,{ opacity, duration });

      const covid2 = scroll(this.$refs.covid2);
      covid2.from(this.$refs.covid2,{ opacity, duration });
    }
  },
  mounted() {
    this.getContinents();
    this.covidGroup();
    this.covidScroll();
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

#cursor {
  height: 4rem;
  width: 4rem;

  border-radius: 50%;
  border: 2px solid black;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 200;

  transform: translate(-50%,-50%);
  transform-origin: 100% 100%;
  cursor: none;
  // backdrop-filter: grayscale();

  pointer-events: none;
  transition: all .3s ease;
  transition-property: background, transform;
}

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


// covid
.section {
  &-covidCluster {
    position: absolute;
    @include abs.mxs-img-contain;

    filter: drop-shadow(0 0 0 rgba(black,0));

    &--1 {
      height: 18rem;
      width: 18rem;

      background: url("~@/assets/covidicons/covid@2x.png");
      top: -8rem;
      right: 6%;

      @include abs.mxs-respond(ltablet) {
        height: 15rem;
        width: 15rem;
        top: -6rem;
        right: 0rem;
      }
      @include abs.mxs-respond(ptablet) {
        height: 12rem;
        width: 12rem;
        top: -5rem;
      }
      @include abs.mxs-respond(lphone) {
        top: -7rem;
        right: -9rem;
      }
    }
    &--2 {
      height: 15rem;
      width: 15rem;

      background: url("~@/assets/covidicons/covid@2x.png");
      bottom: -6rem;
      left: 10%;
      transform: rotateY(180deg);

      @include abs.mxs-respond(ltablet) {
        height: 12rem;
        width: 12rem;
        bottom: -5rem;
      }
      @include abs.mxs-respond(ptablet) {
        height: 10rem;
        width: 10rem;
        bottom: -4rem;
        left: -5%;
      }
      @include abs.mxs-respond(lphone) {
        bottom: -5rem;
        left: -8rem;
      }
    }
  }
  &-covidCluster {
    @include abs.mxs-img-contain;
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
