<template>
  <div class="carousel carousel-container" ref="container">
    <slider-btns></slider-btns>

    <div class="carousel-slider" ref="slider">
      <template v-for="(value, index) in continents" :key="index">
        <div class="carousel-items" :class="`carousel-items--${(index += 1)}`"
          :ref="el=>{slideList(el)}">
          <slot name="component" :prop="value">
            {{ `item-${index}` }}
          </slot>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
import sliderBtns from "@/components/slider/sliderBtns.vue";
import mixinSlider from "@/mixins/mixinSlider.vue";
import { ref, reactive } from "vue";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers(
  "slider"
);

export default {
  components: {
    sliderBtns
  },
  props: ["data"],
  mixins: [mixinSlider],
  setup(props) {
    const continents = reactive(props.data);
    let slides = ref([]);

    return {
      continents,
      slides
    };
  },
  computed: {
    ...mapGetters(["sliderStates"])
  },
  methods: {
    slideList(el) {
      if (el) {
        this.slides.push(ref(el));
        this.pushState({ prop: "slides", data: ref(el) });
      }
    },
    ...mapMutations(["stateItems", "stateObjs", "pushState", "spliceState"]),
    ...mapActions(["sliderCenterPos", "sliderCurPos", "transposeSlides"]),
    ...mapActions(["slideIndices"]),

    // Init
    sliderInit() {
      const state = this.sliderStates(["options", "positions", "indices"]);

      if (state.options.center && state.options.loop) {
        const els = {
          container: this.$refs.container,
          slider: this.$refs.slider
        };
        this.stateObjs({
          options: {
            offset: true,
            loop: true
          },
          offset: {
            mutate: false,
            initial: true
          },
          indices: {
            offset: Math.floor(this.slides.length / 2)
          }
        });
        this.transposeSlides({
          slider: els.slider,
          mode: "prepend",
          value: state.indices.offset
        });
        this.slideIndices("decr");
        this.sliderCenterPos(els);
        this.sliderCurPos(state.indices.trails);

        const init = gsap.timeline({
          onComplete: function() {
            const fadeinSlide = gsap.timeline();
            fadeinSlide.to(els.container, {
              opacity: 1,
              transition: "ease-in-out",
              duration: 0.3
            });
          }
        });
        init.to(els.container, { opacity: 0, transition: "none", duration: 0 });
        init.add(this.animateSlider(state.positions.curPos));
        init.to(els.container, { opacity: 1, duration: 0.3 });

        return init;
      }
    }
  },
  beforeUpdate() {
    this.slides.splice(0);
    this.spliceState({ prop: "slides", data: 0 });
  },
  beforeMount() {
    this.spliceState({ prop: "slides", data: 0 });
    this.stateObjs({
      els: {
        container: null,
        slider: null
      }
    });
  },
  mounted() {
    this.stateItems({ data: this.data });
    this.stateObjs({
      els: {
        container: this.$refs.container,
        slider: this.$refs.slider
      }
    });
    this.sliderInit();
  }
};
</script>

<style scoped lang="scss">
@use "~@/sass/abstracts/abstracts" as abs;

.block {
  height: 10rem;
  width: 10rem;
  background: green;
  display: none;
}

.btn {
  height: 6rem;
  width: 6rem;

  // background: abs.$vars-c-lprimary;
  border: 2px solid black;
  border-radius: 10rem;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: -10rem;
  z-index: 100;

  box-shadow: 0px 2px 5px rgba(black, 0.8), 0px 5px 10px rgba(black, 0.5);

  @include abs.mxs-respond(ptablet) {
    height: 4rem;
    width: 4rem;
    bottom: -7rem;
  }

  &--left {
    right: 10rem;
    transform: rotateY(180deg);
    @include abs.mxs-respond(ptablet) {
      right: 5rem;
    }
  }
  &--right {
    right: 0;
  }
  &--img {
    height: 2rem;
    width: 2rem;

    background-image: url("~@/assets/icons/arrow-2@2x.png");
    @include abs.mxs-img-contain;
    background-position: center;

    @include abs.mxs-respond(ptablet) {
      height: 1rem;
      width: 1rem;
    }
  }
}

.carousel {
  &-container {
    height: auto;
    width: 100%;
    min-height: 20rem;
    min-width: 20rem;

    margin: auto;
    // border: 2px solid black;

    display: flex;
    align-items: center;
    position: relative;
  }
  &-slider {
    height: 100%;
    width: 100%;
    // border: 2px solid green;

    display: flex;
    align-items: center;
    position: relative;
    left: 0;

    transition: all 0.3s;
  }
  &-items {
    height: 100%;
    max-width: 100%;
    margin: 0rem 2rem;
    // border: 2px solid orangered;

    display: flex;
    justify-content: center;
    align-items: center;
    // flex: 1 0 100%;

    cursor: grab;
    transition: all 0.3s;
  }
}
</style>
