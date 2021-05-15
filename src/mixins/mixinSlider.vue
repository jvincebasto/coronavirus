<script>
import { gsap } from "gsap";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers(
  "slider"
);

export default {
  computed: {
    ...mapGetters(["sliderStates", "adjacentIndices"])
  },
  methods: {
    ...mapMutations(["stateObjs"]),
    ...mapActions(["resetProps"]),
    ...mapActions(["slideIndices", "sliderCenterPos", "sliderCurPos"]),
    ...mapActions(["transposeSlides"]),

    // Animate Slider
    moveSlider(pos) {
      const state = this.sliderStates([
        "positions",
        "options",
        "offset",
        "els"
      ]);
      let curPos = pos;
      let sliderObj = { x: curPos, transition: "ease-in-out", duration: 0.3 };

      if (state.options.center && state.options.loop) {
        if (state.offset.initial)
          sliderObj = { x: curPos, transition: "none", duration: 0 };
      } else {
        if (pos < state.positions.endPos) {
          curPos = state.positions.endPos;
          sliderObj = { x: curPos, transition: "ease-in-out", duration: 0.5 };
        }
      }

      const animate = gsap.timeline();
      animate.to(state.els.slider, sliderObj);
      return animate;
    },
    animateSlides() {
      const state = this.sliderStates(["slides", "indices"]);
      const cur = state.indices.curIndex;
      const { prev, next } = this.adjacentIndices();
      this.stateObjs({
        indices: {
          prevIndex: prev,
          nextIndex: next,
        }
      });


      const duration = 0.3;
      const curObj = { scale: 1.05, duration };
      const prevObj = { scale: 1, duration };
      const nextObj = { scale: 1, duration };


      const animate = gsap.timeline();
      animate.to(state.slides[cur].value, curObj, "<");
      animate.to(state.slides[prev].value, prevObj, "<");
      animate.to(state.slides[next].value, nextObj, "<");

      return animate;
    },


    animateSlider(position) {
      const state = this.sliderStates(["animations"]);
      const animate = gsap.timeline({ onComplete: this.resetSlider });

      animate.add(this.moveSlider(position));
      if (state.animations.default) animate.add(this.animateSlides(), "<");
    },


    // Reset Slider
    animateResetSlider(direction) {
      const state = this.sliderStates(["positions", "indices", "els"]);
      this.stateObjs({
        offset: {
          initial: false,
          mutate: true
        }
      });

      const animate = gsap.timeline();
      animate.to(state.els.slider, { transition: "none", duration: 0 });
      animate.add(
        this.transposeSlides({
          slider: state.els.slider,
          mode: direction,
          value: state.indices.offset
        })
      );

      this.stateObjs({
        offset: {
          initial: true,
          mutate: false
        }
      });
      animate.add(this.moveSlider(state.positions.curPos));
      animate.add(this.resetProps());

      return animate;
    },
    resetSlider() {
      const state = this.sliderStates([
        "options",
        "indices",
        "positions",
        "els"
      ]);

      if (state.options.center && state.options.loop) {
        this.stateObjs({
          offset: {
            initial: true,
            mutate: false
          }
        });
        this.slideIndices("decr");
        this.sliderCenterPos(state.els);
        this.sliderCurPos(state.indices.trails);
        this.animateResetSlider(state.positions.direction);
      } 
      else this.resetProps();
    }
  }
};
</script>
