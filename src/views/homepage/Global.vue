<template>
  <section class="section section-global" id="global" ref="sectGlobal">
    <div class="section-margin section-margin--global">
      <div class="section--titlegroup">
        <h1 class="section--title">Global Cases</h1>
        <p class="section--subtitle">
          Daily records of the virus around the world
        </p>
      </div>

      <div class="row">
        <div class="col col--1">
          <div class="map map--group">
            <!-- covid clusters -->
            <div class="section-covidCluster section-covidCluster--1" ref="covid1">&nbsp;</div>
            <div class="section-covidCluster section-covidCluster--2" ref="covid2">&nbsp;</div>
            <div class="section-covidCluster section-covidCluster--3" ref="covid3">&nbsp;</div>

            <!-- map group -->
            <div class="map-bg map-bg--blob" ref="blob">&nbsp;</div>
            <div class="map-bg map-bg--globalmap" ref="map">&nbsp;</div>
          </div>
        </div>
        <div class="col col--2">
          <template v-if="globalBool">
            <card-global :data="globalres" :els="els"></card-global>
          </template>
        </div>
      </div>
    </div>


    <!-- covid scroll -->
    <div class="section-covidCluster section-covidCluster--4" ref="covid4">&nbsp;</div>
    <div class="section-covidCluster section-covidCluster--5" ref="covid5">&nbsp;</div>


    <!-- grids -->
    <div class="section-grid section-grid--1">&nbsp;</div>
    <div class="section-grid section-grid--2">&nbsp;</div>
  </section>
</template>

<script>
import stringUtilities from "@/mixins/stringUtilities.vue";
import { ref, reactive, defineAsyncComponent } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { createNamespacedHelpers } from "vuex";
const { mapActions: covidActions } = createNamespacedHelpers("covid");


export default {
  mixins: [stringUtilities],
  components: {
    cardGlobal: defineAsyncComponent({
      loader: () => import("@/components/cards/cardGlobal.vue")
      // delay: 200,
      // timeout: 3000,
      // errorComponent: errorComponent,
      // loadingComponent: loadingComponent,
    })
  },
  setup() {
    const globalres = reactive([]);
    const els = reactive({});
    let bool = ref(false);

    return {
      globalres,
      els,
      bool,
    };
  },
  computed: {
    globalBool() {
      return this.bool;
    },
  },
  methods: {
    ...covidActions(["fetchAll"]),
    async getGlobalRes() {
      this.globalres = await this.fetchAll();
      if (this.globalres) { 
        this.bool = true;
        this.els.container = this.$refs.sectGlobal;
      }
    },

    // animations
    mapGroup() {
      const ease = "ease";
      const timelineObj = { repeat: -1, yoyo: true };

      const blob = gsap.timeline(timelineObj);
      blob.from(this.$refs.blob,{ scale: .95, ease, duration: 5 });
      blob.to(this.$refs.blob,{ filter: "drop-shadow(0 2px 10px rgba(0,0,0,.5))", ease, duration: 5 },"<");


      const map = gsap.timeline(timelineObj);
      map.from(this.$refs.map,{ y: -10, ease, duration: 5 });
      map.to(this.$refs.map,{ filter: "drop-shadow(0 2px 5px rgba(220, 20, 60, 0.8)) drop-shadow(0px 8px 15px rgba(0,0,0, 0.5))", duration: 5 },"<");

    },
    covidGroup() {
      const ease = "ease";
      const timelineObj = { repeat: -1, yoyo: true };

      const covid1 = gsap.timeline(timelineObj);
      covid1.to(this.$refs.covid1,{ y: 10, ease, duration: 3 });
      covid1.to(this.$refs.covid1,{ filter: "drop-shadow(0 2px 4px rgba(0,0,0, 0.5))", duration: 3 },"<");

      const covid2 = gsap.timeline(timelineObj);
      covid2.to(this.$refs.covid2,{ y: 10, ease, duration: 2 });
      covid2.to(this.$refs.covid2,{ filter: "drop-shadow(0 2px 4px rgba(0,0,0, 0.5))", duration: 2 },"<");

      const covid3 = gsap.timeline(timelineObj);
      covid3.to(this.$refs.covid3,{ y: 5, ease, duration: 1 });
      covid3.to(this.$refs.covid3,{ filter: "drop-shadow(0 2px 2px rgba(0,0,0, 0.5))", duration: 1 },"<");
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

      const covid4 = scroll(this.$refs.covid4);
      covid4.from(this.$refs.covid4,{ y: -25, opacity, duration });

      const covid5 = scroll(this.$refs.covid5);
      covid5.from(this.$refs.covid5,{ y: -25, opacity, duration });
    }
  },
  mounted() {
    this.getGlobalRes();
    this.mapGroup();
    this.covidGroup();
    this.covidScroll();
  }
};
</script>

<style scoped lang="scss">
@use "~@/sass/abstracts/abstracts" as abs;


.section {
  &-global {
    $section-bg: lighten(abs.$vars-c-lprimary, 10%);
    background: $section-bg;

    position: relative;
  }
  &-margin {
    &--global {
      margin: 8rem auto 3rem;

      @include abs.mxs-respond(lphone) {
        margin-top: 6rem;
      }
    }
  }

  &-grid {
    height: 15rem;
    width: 15rem;
    position: absolute;

    @include abs.mxs-respond(pphone) {
      // display: none;
    }

    &--1 {
      background-image: url("~@/assets/bgs/circle-grid-10@2x.png");
      bottom: 10rem;
      left: -9rem;

      @include abs.mxs-respond(lphone) {
        bottom: 2rem;
      }
      @include abs.mxs-respond(pphone) {
        left: -11rem;
      }
    }
    &--2 {
      background-image: url("~@/assets/bgs/circle-grid-10@2x.png");
      top: 18rem;
      right: -9rem;

      @include abs.mxs-respond(ptablet) {
        top: 45%;
      }
      @include abs.mxs-respond(pphone) {
        right: -11rem;
      }
    }
  }
  &-grid {
    @include abs.mxs-img-contain;
  }
}


.section {
    &-covidCluster {
    position: absolute;
    @include abs.mxs-img-contain;

    filter: drop-shadow(0 0 0 rgba(black,0));

    &--1 {
      height: 18rem;
      width: 18rem;

      background: url("~@/assets/covidicons/covidCluster1@2x.png");
      top: -15rem;
      left: 2rem;

      @include abs.mxs-respond(ltablet) {
        height: 15rem;
        width: 15rem;
        left: 0rem;
      }
      @include abs.mxs-respond(ptablet) {
        height: 12rem;
        width: 12rem;
        top: -6rem;
        left: -8rem;
      }
      @include abs.mxs-respond(pphone) {
        height: 10rem;
        width: 10rem;
      }
    }
    &--2 {
      height: 15rem;
      width: 15rem;

      background: url("~@/assets/covidicons/covidCluster1@2x.png");
      bottom: -10rem;
      left: -8rem;
      transform: rotateY(180deg);

      @include abs.mxs-respond(ltablet) {
        height: 12rem;
        width: 12rem;
      }
      @include abs.mxs-respond(ptablet) {
        height: 10rem;
        width: 10rem;
        bottom: -6rem;
        left: -4rem;
      }
      @include abs.mxs-respond(pphone) {
        height: 8rem;
        width: 8rem;
      }
    }
    &--3 {
      height: 10rem;
      width: 10rem;

      background: url("~@/assets/covidicons/covidCluster2@2x.png");
      bottom: 0rem;
      right: -10rem;

      @include abs.mxs-respond(ptablet) {
        height: 8rem;
        width: 8rem;
        bottom: 2rem;
      }
      @include abs.mxs-respond(pphone) {
        height: 6rem;
        width: 6rem;
        bottom: 0rem;
        right: -8rem;
      }
    }
    &--4 {
      height: 15rem;
      width: 15rem;

      background: url("~@/assets/covidicons/covidCluster1@2x.png");
      top: 10rem;
      right: 18%;
      transform: rotateY(180deg);

      @include abs.mxs-respond(ltablet) {
        top: 4rem;
        right: 13%;
      }
      @include abs.mxs-respond(ptablet) {
        top: unset;
        right: unset;

        bottom: 34rem;
        left: 7%;
        transform: unset;
      }
    }
    &--5 {
      height: 15rem;
      width: 15rem;

      background: url("~@/assets/covidicons/covidCluster1@2x.png");
      bottom: 20rem;
      right: -2rem;
      transform: rotateY(180deg);

      @include abs.mxs-respond(ptablet) {
        height: 20rem;
        width: 20rem;

        bottom: 17rem;
        right: 5%;
        transform: unset;
      }
    }
  }
  &-covidCluster {
    @include abs.mxs-img-contain;
  }
}

.row {
  height: auto;
  min-height: 50rem;
  width: 100%;

  display: flex;
  flex: 1 0 50%;
  align-items: center;

  @include abs.mxs-respond(ptablet) {
    flex-direction: column;
  }
}

.col {
  height: 100%;
  width: 100%;

  &--1 {
    display: flex;
    justify-content: center;
    align-items: center;

    @include abs.mxs-respond(ptablet) {
      margin-bottom: 8rem;
    }
  }
  &--2 {
    display: flex;
    flex-direction: column;
    align-items: center;

    :deep(.card) {
      width: 35rem;

      @include abs.mxs-respond(ltablet) {
        width: 32rem;
      }
      @include abs.mxs-respond(pphone) {
        min-width: unset;
        max-width: 30rem;
        width: 100%;
      }
    }
  }
}

.map {
  &--group {
    height: 35rem;
    width: 35rem;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    top: -4rem;
    left: 4rem;

    @include abs.mxs-respond(ltablet) {
      height: 32rem;
      width: 32rem;
    }
    @include abs.mxs-respond(ptablet) {
      height: 40rem;
      width: 40rem;

      top: 0;
      left: 0;
    }
    @include abs.mxs-respond(lphone) {
      height: 25rem;
      width: 25rem;
    }
    @include abs.mxs-respond(pphone) {
      height: 20rem;
      width: 20rem;
    }
  }

  &-bg {
    height: 100%;
    width: 100%;

    position: absolute;

    &--blob {
      background-image: url("~@/assets/bgs/blob2@2x.png");
      // filter: drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.5));
      filter: drop-shadow(0px 0 0 rgba(0, 0, 0, 0));
    }
    &--globalmap {
      width: 50rem;
      height: 25rem;

      background-image: url("~@/assets/continents/worldmap@2x.png");
      // filter: drop-shadow(0px 2px 5px rgba(crimson, 0.8))
      //   drop-shadow(0px 8px 15px rgba(black, 0.5));
      filter: drop-shadow(0 0 0 rgba(crimson, 0));

      @include abs.mxs-respond(ltablet) {
        width: 42rem;
        height: 21rem;
      }
      @include abs.mxs-respond(ptablet) {
        width: 50rem;
        height: 25rem;
      }
      @include abs.mxs-respond(lphone) {
        width: 35rem;
        height: 18rem;
      }
      @include abs.mxs-respond(pphone) {
        width: 30rem;
        height: 15rem;
      }
    }
  }
  &-bg {
    @include abs.mxs-img-contain;
  }
}
</style>
