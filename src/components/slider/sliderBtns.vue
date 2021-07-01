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
@use "~@/sass/styles" as styles;


@include styles.mxs-themes(light) {
  .btn {
    border: 2px solid var(--c-dprimary);
    
    background: styles.fns-lighten(var(--c-lprimary), 6);
    box-shadow: styles.$vars-box-shadow;
    -webkit-tap-highlight-color: transparent;

    &--img {
      @supports(mask: url("~@/assets/icons/arrow-2.svg")) {
        mask: url("~@/assets/icons/arrow-2.svg");
        @include styles.mxs-svg-contain;
        mask-position: center;
      }
      background: url("~@/assets/icons/arrow-2@2x.png");
    }
    &--img {
      @include styles.mxs-img-contain;
      background: var(--c-dprimary);   
    }

    &:hover {
      background: var(--c-dprimary);
    }
    &:hover .btn--img {
      background: var(--c-lprimary);
    }
  }
}


@include styles.mxs-themes(dark) {
  .btn {
    background: styles.fns-darken(var(--c-lprimary), 3);

    &:hover {
      background: var(--c-dprimary);
    }
    &:hover .btn--img {
      background: var(--c-lprimary);
    }
  }
}

</style>

<style scoped lang="scss">
@use "~@/sass/styles" as styles;

.btn {
  height: 5rem;
  width: 5rem;


  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10rem;

  position: absolute;
  bottom: -10rem;
  z-index: 100;


  cursor: pointer;
  transition: all .3s ease-in-out;

  @include styles.mxs-respond(ptablet) {
    height: 4rem;
    width: 4rem;
    bottom: -7rem;
  }

  &--left {
    right: 6rem;
    transform: rotateY(180deg);
    @include styles.mxs-respond(ptablet) {
      right: 5rem;
    }
  }
  &--right {
    right: 0;
  }
  &--img {
    height: 2rem;
    width: 2rem;

    background-position: center;
    transition: all .3s ease-in-out;

    @include styles.mxs-respond(ptablet) {
      height: 1rem;
      width: 1rem;
    }
  }
}
</style>
