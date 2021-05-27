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

    <div class="section-grid section-grid--1">&nbsp;</div>
    <div class="section-grid section-grid--2">&nbsp;</div>
  </section>
</template>

<script>
import stringUtilities from "@/mixins/stringUtilities.vue";
import { ref, reactive, defineAsyncComponent } from "vue";
import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);
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


      // const num = gsap.timeline();
      // num.from(this.$refs.num,{ opacity: 0, ease });
      // num.counter(this.$refs.num,{ end: 123456, ease: "linear", increment: 10, duration: 2 })
    },
  },
  computed: {
    globalBool() {
      return this.bool;
    },
  },
  mounted() {
    this.getGlobalRes();
    this.mapGroup();
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
