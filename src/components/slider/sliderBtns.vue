<template>
  <div class="btn btn--left" ref="btnLeft">
    <span class="btn--img">&nbsp;</span>
  </div>
  <div class="btn btn--right" ref="btnRight">
    <span class="btn--img">&nbsp;</span>
  </div>
</template>

<script>
import mixinSlider from "@/mixins/mixinSlider.vue";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers(
  "slider"
);

export default {
  mixins: [mixinSlider],
  computed: {
    ...mapGetters(["sliderStates"])
  },
  methods: {
    ...mapMutations(["stateObjs"]),
    ...mapActions(["sliderDirection", "resetProps"]),
    ...mapActions(["sliderEndPos", "sliderCenterPos", "sliderCurPos"]),

    // Btn Events
    btnStart(direction) {
      const state = this.sliderStates([
        "btns",
        "drag",
        "offset",
        "indices",
        "positions",
        "els",
        "animations"
      ]);

      if (state.btns.start && !state.btns.animating) {
        this.stateObjs({
          btns: {
            start: false,
            animating: true
          },
          drag: { start: false },
          offset: {
            initial: false,
            mutate: true
          },
          positions: { direction }
        });
        
        this.sliderEndPos(state.els.container);
        this.sliderCenterPos(state.els);

        this.sliderDirection(direction);
        this.sliderCurPos(state.indices.trails);
        this.animateSlider(state.positions.curPos);
      }
    },
    btnPrev() {
      this.btnStart(1);
    },
    btnNext() {
      this.btnStart(-1);
    },

    // Events
    btnEvents() {
      const state = this.sliderStates(["slides"]);
      const btnLeft = this.$refs.btnLeft;
      const btnRight = this.$refs.btnRight;

      if (state.slides.length > 1) {
        btnLeft.onclick = this.btnPrev;
        btnRight.onclick = this.btnNext;
      } else {
        btnLeft.style.display = "none";
        btnRight.style.display = "none";
      }
    }
  },
  mounted() {
    this.btnEvents();
  }
};
</script>

<style scoped lang="scss">
@use "~@/sass/abstracts/abstracts" as abs;

.btn {
  height: 5rem;
  width: 5rem;

  $section-bg: lighten(abs.$vars-c-lprimary, 5%);
  background: $section-bg;

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

  transition: all .3s ease-in-out;

  @include abs.mxs-respond(ptablet) {
    height: 4rem;
    width: 4rem;
    bottom: -7rem;
  }

  &--left {
    right: 6rem;
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
    background: abs.$vars-c-dprimary;

    transition: all .3s ease-in-out;

    @supports(mask: url("~@/assets/icons/arrow-2.svg")) {
      mask: url("~@/assets/icons/arrow-2.svg");
      @include abs.mxs-svg-contain;
      mask-position: center;
    }
    background-image: url("~@/assets/icons/arrow-2@2x.png");
    @include abs.mxs-img-contain;
    background-position: center;

    @include abs.mxs-respond(ptablet) {
      height: 1rem;
      width: 1rem;
    }
  }

  &:hover {
    background: abs.$vars-c-dprimary;
  }
  &:hover &--img {
    background: abs.$vars-c-lprimary;
  }
}
</style>
