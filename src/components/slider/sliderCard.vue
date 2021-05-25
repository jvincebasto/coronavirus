<template>
  <div class="carousel-items" :class="`carousel-items--${index}`">
    <slot>
      {{ `Slider Card Slot ${index}` }}
    </slot>
  </div>
</template>


<script>
import { gsap } from "gsap";
import mixinSlider from "@/mixins/mixinSlider.vue";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("slider");


export default {
  props: ["index"],
  mixins: [mixinSlider],
  setup() {
  },
  computed: {
    ...mapGetters(["sliderStates","adjacentIndices"]),
  },
  methods: {
    ...mapMutations(["stateObjs"]),
    ...mapActions(["sliderEndPos","sliderCenterPos","sliderCurPos"]),
    ...mapActions(["sliderDirection","resetProps"]),




    // Drag Positions
    dragPositionX(event) {
      return event.type.includes("mouse")
        ? event.pageX
        : event.touches[0].clientX;
    },



    // Animate Drag Slider 
    animateDragSlide(curObj, prevObj, nextObj) {
      const state = this.sliderStates(["slides","indices"]);
      let curSlide = state.slides[state.indices.curIndex].value;
      let prevSlide = state.slides[state.indices.prevIndex].value;
      let nextSlide = state.slides[state.indices.nextIndex].value;


      const animate = gsap.timeline();
      animate.to(curSlide, curObj, "<");
      animate.to(prevSlide, prevObj, "<");
      animate.to(nextSlide, nextObj, "<");

      return animate;
    },
    animateDragDirection() {
      const state = this.sliderStates(["dragPositions","indices","slides"]);
      const movedBy = state.dragPositions.curPos - state.dragPositions.prevPos;
      let prevObj = {};
      let curObj = {};
      let nextObj = {};
      let duration = 0.3;
      let transition = "ease-in-out";


      if (movedBy > 50 && state.indices.curIndex > 0) {
        curObj = { scale: 1, transition, duration };
        prevObj = { scale: 1.05, transition, duration };
        nextObj = { scale: 1, transition, duration };
      } 
      else if (movedBy < -50 && state.indices.curIndex < state.slides.length - 1) {
        curObj = { scale: 1, transition, duration };
        prevObj = { scale: 1, transition, duration };
        nextObj = { scale: 1.05, transition, duration };
      } 
      else {
        curObj = { scale: 1.05, transition, duration };
        prevObj = { scale: 1, transition, duration };
        nextObj = { scale: 1, transition, duration };
      }


      const animate = gsap.timeline();
      animate.add(this.moveSlider(state.dragPositions.curPos));
      animate.add(this.animateDragSlide(curObj, prevObj, nextObj));

      return animate;
    },


    // Touch Events
    dragStart(direction) {
      const state = this.sliderStates(["positions","indices","offset","els"]);
      this.stateObjs({
        drag: { animating: true },
        positions: { direction },
        offset: {
          initial: false,
          mutate: true
        },
      });

      this.sliderEndPos(state.els.container);
      this.sliderCenterPos(state.els);

      this.sliderDirection(direction);
      this.sliderCurPos(state.indices.trails);
      this.animateSlider(state.positions.curPos);
    },
    touchStart(event) {
      const state = this.sliderStates(["drag","btns","positions","dragPositions","els","animations","slides","indices"]);
      this.sliderEndPos(state.els.container);
      this.sliderCenterPos(state.els);

      if (state.drag.start && !state.drag.dragging && !state.drag.animating) {
        this.stateObjs({
          btns: { start: false },
          drag: { 
            start: false,
            dragging: true,
          },
          dragPositions: { 
            curPos: state.positions.curPos, 
            startPos: this.dragPositionX(event),
            movedBy: 0
          },
        });


        const { prev, next } = this.adjacentIndices();
        this.stateObjs({
          indices: {
            prevIndex: prev,
            nextIndex: next,
          }
        });

        // const duration = 0.3;
        // const curObj = { scale: 1.05, duration };
        // const prevObj = { scale: 1, duration };
        // const nextObj = { scale: 1, duration };


        const animate = gsap.timeline();
        // animate.add(this.moveSlider(state.dragPositions.curPos));
        // animate.add(this.animateDragSlide(curObj,prevObj,nextObj));
        const curSlide = state.slides[state.indices.curIndex].value;
        animate.to(curSlide,{ scale: .98, ease: "ease", duration: .2 });
        // animate.to(curSlide,{ cursor: "grab", ease: "ease", duration: .2 },"<");
      }
    },
    touchMove(event) {
      const state = this.sliderStates(["drag","dragPositions","positions"]);


      if (state.drag.dragging) {
        const curDragPos = this.dragPositionX(event);
        this.stateObjs({
          dragPositions: { 
            prevPos: state.positions.curPos, 
            curPos: state.dragPositions.prevPos + curDragPos - state.dragPositions.startPos,
          },
          drag: { dragged: true },
        });

        const animate = gsap.timeline();
        animate.add(this.moveSlider(state.dragPositions.curPos));


        // This is the glitch while dragging
        // animate.add(this.animateDragDirection(),"<");
      }
    },
    touchEnd() {
      const state = this.sliderStates(["drag","dragPositions","positions","slides","indices"]);
      this.stateObjs({
        drag: { 
          dragging: false,
          start: true
        },
        btns: { start: true },
      });


      const animate = gsap.timeline();
      const curSlide = state.slides[state.indices.curIndex].value;
      animate.to(curSlide,{ scale: 1.05, ease: "ease", duration: .2 });
      // animate.to(curSlide,{ cursor: "-webkit-grabbing", ease: "ease", duration: .2 },"<");


      if (state.drag.dragged && !state.drag.animating) {
        const limit = 150;
        this.stateObjs({
          dragPositions: { 
            movedBy: state.dragPositions.curPos - state.dragPositions.prevPos
          },
        });

        if (state.dragPositions.movedBy > limit) this.dragStart(1);
        else if (state.dragPositions.movedBy < -limit) this.dragStart(-1);
        else { 
          const animate = gsap.timeline({ onComplete: this.resetProps });
          animate.add(this.moveSlider(state.positions.curPos),"+1");
          // animate.add(this.animateSlides(),"<");
        }
      }
    },



    // Drag Events
    dragEvents() {
      const state = this.sliderStates(["slides","els"]);

      for (const cur of state.slides) {
        const el = cur.value;
        el.ondragstart = e => e.preventDefault();

        el.ontouchstart = this.touchStart;
        el.ontouchmove = this.touchMove;
        el.ontouchend = this.touchEnd;

        el.onmousedown = this.touchStart;
        el.onmousemove = this.touchMove;
        el.onmouseup = this.touchEnd;
        el.onmouseleave = this.touchEnd;
      }
    }
  },
  mounted() {
    this.dragEvents();
  }
};
</script>


<style scoped lang="scss">
@use "~@/sass/abstracts/abstracts" as abs;


.carousel {
  &-items {
    height: 100%;
    max-width: 100%;
    margin: 0rem 2rem;
    // border: 2px solid orangered;

    display: flex;
    justify-content: center;
    align-items: center;
    // flex: 1 0 100%;

    cursor: pointer;
    transition: all 0.3s;
  }
}

// .drag-grabbing {
//   cursor: webkit-grabbing;
// }
</style>
