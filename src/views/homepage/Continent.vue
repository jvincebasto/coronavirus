<template>
  <section class="section section-continents" id="continents"
    ref="sectContinents">
    

    <div class="section-margin row">
      <div class="section--titlegroup">
        <h1 class="section--title">continental cases</h1>
        <p class="section--subtitle">
          Daily Records of the Virus in each Continent
        </p>
      </div>
    </div>


    <div class="section-margin slider-container">
      <div class="gridgroup gridgroup--1">
        <div class="grid-img">&nbsp;</div>
      </div>
      <div class="covidgroup covidgroup--1" ref="covid1">
        <div class="covid-img">&nbsp;</div>
      </div>
      <div class="covidgroup covidgroup--2" ref="covid2">
        <div class="covid-img">&nbsp;</div>
      </div>


      <template v-if="continentBool">
        <slider :data="continents">
          <template #component="slot">
            <card-continent :data="slot.prop"></card-continent>
          </template>
        </slider>
      </template>
    </div>

    <div class="gridgroup gridgroup--2">
      <div class="grid-img">&nbsp;</div>
    </div>

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


    // animations
    covidIcon() {
      const timelineObj = { repeat: -1, yoyo: true };
      const filter = "drop-shadow(0 2px 4px rgba(0,0,0, 0.5))";
      function animateObj(duration = 3) {
        return {
          ease: "ease",
          duration,
        }
      }

      const covid1 = gsap.timeline(timelineObj);
      covid1.to(this.$refs.covid1,{ y: 10, ...animateObj(3) });
      covid1.to(this.$refs.covid1,{ filter, ...animateObj(3) },"<");


      const covid2 = gsap.timeline(timelineObj);
      covid2.to(this.$refs.covid2,{ y: 10, ...animateObj(2) });
      covid2.to(this.$refs.covid2,{ filter, ...animateObj(2)},"<");
    },
    fadeIns() {
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
          // scrub: 1,
        }
      });

      function animateObj() {
        return {
          ease: "ease",
          opacity: 0,
          duration: 2,
        }
      }

      const covid1 = scroll(this.$refs.covid1);
      covid1.from(this.$refs.covid1,{ ...animateObj() });

      const covid2 = scroll(this.$refs.covid2);
      covid2.from(this.$refs.covid2,{ ...animateObj() });
    }
  },
  mounted() {
    this.getContinents();
    this.covidIcon();
    this.fadeIns();
  }
};
</script>

<style scoped lang="scss">
@use "~@/sass/styles" as styles;


@include styles.mxs-themes(light) {
  .section {
    &-continents {
      background: styles.fns-lighten(var(--c-lprimary), 4);
    }
  }


  // covid
  .covid {
    &group {
      filter: drop-shadow(0 0 0 rgba(black,0));      
    }

    &-img {
      @supports(mask: url("~@/assets/covidicons/covid.svg")) {
        mask: url("~@/assets/covidicons/covid.svg");
        @include styles.mxs-svg-contain;
      }
      background: url("~@/assets/covidicons/covid@2x.png");
    }
  }
  .covid {
    &-img {
      @include styles.mxs-img-contain;
      background: var(--c-dprimary);
    }
  }


  // grid
  .grid {
    &-img {
      @supports(mask: url("~@/assets/bgs/circle-grid-10.svg")) {
        mask: url("~@/assets/bgs/circle-grid-10.svg");
        @include styles.mxs-svg-contain;
      }
      background: url("~@/assets/bgs/circle-grid-10@2x.png");
    }
  }

  .grid {
    &-img {
      @include styles.mxs-img-contain;
      background: var(--c-dprimary);
    }
  }
}


@include styles.mxs-themes(dark) {
  .section {
    &-continents {
      background: styles.fns-darken(var(--c-lprimary), 2);
    }
  }
}


@include styles.mxs-colorThemes('brown',light) {
  .section {
    &-continents {
      background: styles.fns-lighten(var(--c-white), 4);
    }
  }
  .grid {
    &-img {
      background: var(--c-black);
    }
  }
}
@include styles.mxs-colorThemes('brown',dark) {
  .section {
    &-continents {
      background: styles.fns-darken(var(--c-white), 2);
    }
  }
  .grid {
    &-img {
      background: var(--c-dprimary);
    }
  }
}

</style>


<style scoped lang="scss">
@use "~@/sass/styles" as styles;

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


.row {
  margin: 4rem auto 10rem;
  justify-content: center;
}


.slider-container {
  margin: auto;
  margin-bottom: 10rem;

  position: relative;
  z-index: 100;
}


.section {
  &-continents {
    min-height: 50vh;    
    position: relative;
  }
}


// covid
.covidgroup {
  position: absolute;

  &--1 {
    height: 18rem;
    width: 18rem;

    top: -8rem;
    right: 6%;

    @include styles.mxs-respond(ltablet) {
      height: 15rem;
      width: 15rem;
      top: -6rem;
      right: 0rem;
    }
    @include styles.mxs-respond(ptablet) {
      height: 12rem;
      width: 12rem;
      top: -5rem;
    }
    @include styles.mxs-respond(lphone) {
      top: -7rem;
      right: -9rem;
    }
  }
  &--2 {
    height: 15rem;
    width: 15rem;

    bottom: -6rem;
    left: 10%;
    transform: rotateY(180deg);

    @include styles.mxs-respond(ltablet) {
      height: 12rem;
      width: 12rem;
      bottom: -5rem;
    }
    @include styles.mxs-respond(ptablet) {
      height: 10rem;
      width: 10rem;
      bottom: -4rem;
      left: -5%;
    }
    @include styles.mxs-respond(lphone) {
      bottom: -5rem;
      left: -8rem;
    }
  }
}
.covid {
  &-img {
    height: 100%;
    width: 100%;
  }
}


// grid
.gridgroup {
  height: 15rem;
  width: 15rem;
  position: absolute;

  &--1 {
    top: -4rem;
    left: -10rem;
  }
  &--2 {
    bottom: -10.5rem;
    right: 0rem;
  }
}

.grid {
  &-img {
    height: 100%;
    width: 100%;
  }
}
</style>
