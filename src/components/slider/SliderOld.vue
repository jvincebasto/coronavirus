<template>
  <!-- 	<card-continent></card-continent>
-->
  <!--  	<div class="block" ref="block">
	click here
</div> -->

  <div class="carousel carousel-container" ref="container">
    <div class="btn btn--left" ref="btnLeft">
      <span class="btn--img">&nbsp;</span>
    </div>
    <div class="btn btn--right" ref="btnRight">
      <span class="btn--img">&nbsp;</span>
    </div>
    <div class="carousel-slider" ref="slider">
      <template v-for="(value, index) in continents" :key="index">
        <div
          class="carousel-items"
          :class="`carousel-items--${(index += 1)}`"
          :ref="
            el => {
              slideList(el);
            }
          "
        >
          <slot name="component" :prop="value">
            {{ `item-${index}` }}
          </slot>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onBeforeUpdate } from "vue";
import { gsap } from "gsap";
import { createNamespacedHelpers } from "vuex";
const { mapGetters: covidGetters } = createNamespacedHelpers("covid");

export default {
  props: ["data"],
  setup(props) {
    const continents = reactive(props.data);
    const array = reactive([1, 2, 3, 4, 5, 6]);
    let slides = ref([]);

    let indices = reactive({
      offset: 0,
      curIndex: 0,

      prevIndex: 0,
      nextIndex: 0
    });
    let positions = reactive({
      direction: 0,
      curPos: 0
    });
    let dragPositions = reactive({
      curPos: 0,
      prevPos: 0,
      startPos: 0
    });

    let clickEvents = reactive({
      start: true,
      animated: false
    });
    let dragEvents = reactive({
      start: true,
      dragging: false,
      dragged: false,
      keyup: false,
      animated: false
    });

    onBeforeUpdate(() => {
      slides.value.splice(0);
    });

    return {
      continents,
      array,
      slides,

      indices,
      positions,
      dragPositions,
      clickEvents,
      dragEvents
    };
  },
  computed: {
    ...covidGetters(["dataStats"])
  },
  methods: {
    slideList(el) {
      if (el) {
        this.slides.push(ref(el));
      }
    },
    async block() {
      const data = {
        slides: this.slides,
        indices: this.indices,
        positions: this.positions,
        dragPositions: this.dragPositions,
        clickEvents: this.clickEvents,
        dragEvents: this.dragEvents
      };
      console.log("data", data);
    },

    // Index Positions
    adjacentIndex(list, cur) {
      let prev = cur;
      let next = cur;

      if (cur === 0) {
        prev = list.length - 1;
        next++;
      } else if (cur === list.length - 1) {
        next = 0;
        prev--;
      } else {
        prev--;
        next++;
      }

      return { prev, next };
    },
    trailingIndices(limit, cur, list, method = "add") {
      let varIndex = cur;
      let indices = [];
      let counter = 0;

      for (counter; counter < limit; counter++) {
        if (method === "add") {
          const { next } = this.adjacentIndex(list, varIndex);
          varIndex = next;
          indices.push(next);
        }
        if (method === "minus") {
          const { prev } = this.adjacentIndex(list, varIndex);
          varIndex = prev;
          indices.push(prev);
        }
      }

      return indices;
    },

    // Slide Computed Values
    removeUnit(val) {
      const values = val.split("px");
      return eval(values[0]);
    },
    slideValues(el, props) {
      const computedProps = getComputedStyle(el);
      let values = {};
      for (const cur in props) {
        values[cur] = this.removeUnit(
          computedProps.getPropertyValue(`${props[cur]}`)
        );
      }

      return values;
    },

    // Slide Widths and Spacing
    slideSpaces(el, props) {
      const computedProps = getComputedStyle(el);
      let width = 0;

      for (const cur of props) {
        const val = this.removeUnit(computedProps.getPropertyValue(`${cur}`));
        width += val;
      }
      return width;
    },
    slideWidths(indices, list) {
      const cont = this.$refs.container;
      const slider = this.$refs.slider;

      // console.log('slideWidths',this.slides);
      const slide = this.slides[this.indices.curIndex].value;

      const contWidth = cont.offsetWidth / 2;
      const contLeftPad = this.slideSpaces(cont, ["padding-left"]);
      const contLeftBorder = this.slideSpaces(cont, ["border-left-width"]);
      const slideWidth = slide.offsetWidth / 2;
      const slideLeftMargin = this.slideSpaces(slide, ["margin-left"]);

      const offset = contWidth - contLeftBorder - contLeftPad - slideWidth;
      slider.style.left = `${offset}px`;

      let width = 0;
      for (const cur of indices) {
        const slide = list[cur].value;
        width += slide.offsetWidth;
        width += this.slideSpaces(slide, ["margin-left"]) * 2;
      }
      width += slideLeftMargin;

      return width;
    },

    // Slide Transitions
    moveSlider(pos) {
      const slider = gsap.timeline();
      slider.to(this.$refs.slider, { x: pos, duration: 0.3 });
      return slider;
    },
    resetSlides(list) {
      const slider = gsap.timeline();
      for (const cur of list) {
        slider.to(cur.value, { scale: 1, /*rotateY: 0,*/ duration: 0 });
      }
      return slider;
    },
    animateSlides(list, cur) {
      const slider = gsap.timeline();
      const duration = 0;
      // const { prev, next } = this.adjacentIndex(list, cur);

      slider.to(list[cur].value, { scale: 1 /*1.2*/, duration }, "<");
      // slider.to(list[prev].value, { rotateY: 10, duration }, "<");
      // slider.to(list[next].value, { rotateY: -10, duration }, "<");

      const width = this.offsetSlider();
      this.positions.curPos = width;
      this.dragPositions.curPos = width;

      return slider;
    },
    slideTimeline(position) {
      const masterSlider = gsap.timeline({ onComplete: this.slideDirection });
      masterSlider.add(this.moveSlider(position));
      masterSlider.add(this.resetSlides(this.slides), "<");
      masterSlider.add(
        this.animateSlides(this.slides, this.indices.curIndex),
        "<"
      );
    },

    // positions
    slideBackward() {
      const { prev } = this.adjacentIndex(this.slides, this.indices.curIndex);
      this.indices.curIndex = prev;

      const indices = this.trailingIndices(
        this.indices.offset - 1,
        this.indices.curIndex,
        this.slides,
        "minus"
      );
      const pos = this.slideWidths(indices, this.slides);
      this.slideTimeline(-pos);
    },
    slideForward() {
      const { next } = this.adjacentIndex(this.slides, this.indices.curIndex);
      this.indices.curIndex = next;

      const indices = this.trailingIndices(
        this.indices.offset + 1,
        this.indices.curIndex,
        this.slides,
        "add"
      );
      const pos = this.slideWidths(indices, this.slides);
      this.slideTimeline(-pos);
    },

    // Slide Reset, Append and Prepend
    slideAppend() {
      const sliderEl = this.$refs.slider;
      const slider = gsap.timeline({ onComplete: this.resetProps() });

      sliderEl.appendChild(sliderEl.firstElementChild);
      slider.to(sliderEl, {
        x: this.positions.curPos,
        transition: "none",
        duration: 0
      });
      return slider;
    },
    slidePrepend() {
      const sliderEl = this.$refs.slider;
      const slider = gsap.timeline({ onComplete: this.resetProps() });

      sliderEl.prepend(sliderEl.lastElementChild);
      slider.to(sliderEl, {
        x: this.positions.curPos,
        transition: "none",
        duration: 0
      });
      return slider;
    },
    slideDirection() {
      const masterSlider = gsap.timeline();
      masterSlider.to(this.$refs.slider, { transition: "none", duration: 0 });

      if (this.positions.direction === -1) masterSlider.add(this.slideAppend());
      else if (this.positions.direction === 1)
        masterSlider.add(this.slidePrepend());
    },

    // Reset Properties
    resetProps() {
      if (!this.clickEvents.start) this.resetClickProps();
      if (!this.dragEvents.start) this.resetDragProps();
    },
    resetClickProps() {
      this.clickEvents.start = true;
      this.clickEvents.animated = false;
      this.dragEvents.start = true;
    },
    resetDragProps() {
      this.dragEvents.start = true;
      this.dragEvents.animated = false;
      this.dragEvents.keyup = false;
      this.clickEvents.start = true;
    },

    // Click Events
    btnPrev() {
      if (this.clickEvents.start && !this.clickEvents.animated) {
        this.dragEvents.start = false;
        this.clickEvents.start = false;
        this.clickEvents.animated = true;
        this.positions.direction = 1;

        this.slideBackward();
        // if (this.indices.curIndex > 0) {
        // } else this.resetProps();
      }
    },
    btnNext() {
      if (this.clickEvents.start && !this.clickEvents.animated) {
        this.dragEvents.start = false;
        this.clickEvents.start = false;
        this.clickEvents.animated = true;
        this.positions.direction = -1;

        this.slideForward();

        // if (this.indices.curIndex < this.slides.length - 1)
        // else this.resetProps();
      }
    },

    // Touch Animations
    getPositionX(event) {
      return event.type.includes("mouse")
        ? event.pageX
        : event.touches[0].clientX;
    },
    animateDrag(curObj, prevObj, nextObj) {
      let curSlide = this.slides[this.indices.curIndex].value;
      let prevSlide = this.slides[this.indices.prevIndex].value;
      let nextSlide = this.slides[this.indices.nextIndex].value;

      const slider = gsap.timeline();
      slider.to(prevSlide, prevObj, "<");
      slider.to(curSlide, curObj, "<");
      slider.to(nextSlide, nextObj, "<");

      return slider;
    },
    dragDirection() {
      const masterSlider = gsap.timeline();
      // const movedBy = this.dragPositions.curPos - this.dragPositions.prevPos;
      // let prevObj = {};
      // let curObj = {};
      // let nextObj = {};
      // let duration = 0;

      masterSlider.add(this.moveSlider(this.dragPositions.curPos));
      // if (movedBy > 50 && this.indices.curIndex > 0) {
      //   curObj = { scale: 1, rotateY: 10, duration };
      //   prevObj = { scale: 1 /*1.2*/, rotateY: 0, duration };
      //   nextObj = { scale: 1, rotateY: 0, duration };
      //   masterSlider.add(this.animateDrag(curObj, prevObj, nextObj), "<");
      // } else if (
      //   movedBy < -50 &&
      //   this.indices.curIndex < this.slides.length - 1
      // ) {
      //   curObj = { scale: 1, rotateY: 10, duration };
      //   prevObj = { scale: 1, rotateY: 0, duration };
      //   nextObj = { scale: 1 /*1.2*/, rotateY: 0, duration };
      //   masterSlider.add(this.animateDrag(curObj, prevObj, nextObj), "<");
      // } else {
      //   curObj = { scale: 1 /*1.2*/, rotateY: 0, duration };
      //   prevObj = { scale: 1, rotateY: -10, duration };
      //   nextObj = { scale: 1, rotateY: 10, duration };
      //   masterSlider.add(this.animateDrag(curObj, prevObj, nextObj), "<");
      // }
    },

    // Touch Events
    touchStart(event) {
      if (this.dragEvents.start) {
        this.clickEvents.start = false;
        this.dragEvents.dragging = true;

        this.dragPositions.curPos = this.positions.curPos;
        this.dragPositions.startPos = this.getPositionX(event);

        const { prev, next } = this.adjacentIndex(
          this.slides,
          this.indices.curIndex
        );
        this.indices.prevIndex = prev;
        this.indices.nextIndex = next;

        const masterSlider = gsap.timeline();
        const duration = 0;
        masterSlider.add(this.moveSlider(this.dragPositions.curPos));
        masterSlider.add(
          this.animateDrag(
            { scale: 1 /*1.2*/, rotateY: 0, duration },
            { scale: 1, rotateY: 0, duration: 0.3 },
            { scale: 1, rotateY: 0, duration: 0.3 }
          ),
          "<"
        );

        // this.slides[this.index].classList.add('drag-grabbing');
      }
    },
    touchEnd() {
      this.dragEvents.dragging = false;
      this.dragEvents.keyup = true;
      const movedBy = this.dragPositions.curPos - this.dragPositions.prevPos;

      if (this.dragEvents.dragged) {
        if (movedBy > 100 && this.indices.curIndex > 0) {
          this.dragEvents.start = false;
          this.dragEvents.dragged = false;
          this.dragEvents.animated = true;
          this.positions.direction = 1;
          this.slideBackward();
        } else if (
          movedBy < -100 &&
          this.indices.curIndex < this.slides.length - 1
        ) {
          this.dragEvents.start = false;
          this.dragEvents.dragged = false;
          this.dragEvents.animated = true;
          this.positions.direction = -1;
          this.slideForward();
        } else {
          this.dragPositions.curPos = this.positions.curPos;
          if (!this.dragEvents.keyup) this.dragDirection();
          this.clickEvents.start = true;
        }
      } else {
        this.dragStart = true;
        this.dragPositions.curPos = this.positions.curPos;
        if (!this.dragEvents.keyup) this.dragDirection();
        this.clickEvents.start = true;
      }

      // this.slides[this.indices.curIndex].classList.remove('drag-grabbing');
    },
    touchMove(event) {
      if (this.dragEvents.dragging) {
        this.dragEvents.dragged = true;

        const curDragPos = this.getPositionX(event);
        this.dragPositions.prevPos = this.positions.curPos;
        this.dragPositions.curPos =
          this.dragPositions.prevPos + curDragPos - this.dragPositions.startPos;

        this.dragDirection();
      }
    },

    // Slides Offset
    transposeSlides(val) {
      const containerEl = this.$refs.container;
      const masterSlider = gsap.timeline({ onComplete: this.slideTimeline });
      masterSlider.to(containerEl, { opacity: 0, duration: 0 });

      this.indices.offset = Math.floor(this.slides.length / 2);
      for (let x = 0; x < this.indices.offset; x++) {
        if (val === "prepend" || val === 1)
          this.$refs.slider.prepend(this.$refs.slider.lastElementChild);
        else if (val === "append" || val === -1)
          this.$refs.slider.appendChild(this.$refs.slider.firstElementChild);
      }

      return masterSlider;
    },
    offsetSlider() {
      this.indices.offset = Math.floor(this.slides.length / 2);
      const indices = this.trailingIndices(
        this.indices.offset,
        this.indices.curIndex,
        this.slides,
        "minus"
      );
      const width = this.slideWidths(indices, this.slides);

      this.positions.curPos = -width;
      this.dragPositions.curPos = -width;
      return -width;
    },

    // Initiate Slider and Events
    sliderInit() {
      const containerEl = this.$refs.container;
      const offsetSlider = this.offsetSlider;
      const slideTimeline = this.slideTimeline;

      const init = gsap.timeline();
      init.add(this.transposeSlides("prepend"));
      init.add(function() {
        const pos = offsetSlider();
        const masterSlider = gsap.timeline({
          onComplete: function() {
            slideTimeline(pos);
          }
        });

        masterSlider.to(containerEl, { opacity: 1, duration: 0.3 });
        return masterSlider;
      });
    },
    sliderEvents() {
      const btnLeft = this.$refs.btnLeft;
      const btnRight = this.$refs.btnRight;

      if (this.array.length > 1) {
        btnLeft.onclick = this.btnPrev;
        btnRight.onclick = this.btnNext;
      } else {
        btnLeft.style.display = "none";
        btnRight.style.display = "none";
      }

      for (const cur of this.slides) {
        cur.value.ondragstart = e => e.preventDefault();

        cur.value.ontouchstart = this.touchStart;
        cur.value.ontouchend = this.touchEnd;
        cur.value.ontouchmove = this.touchMove;

        cur.value.onmousedown = this.touchStart;
        cur.value.onmouseup = this.touchEnd;
        cur.value.onmouseleave = this.touchEnd;
        cur.value.onmousemove = this.touchMove;
      }

      const container = this.$refs.container;
      container.oncontextmenu = event => {
        event.preventDefault();
        event.stopPropagation();
        return false;
      };
    }
  },

  async mounted() {
    this.sliderInit();
    this.sliderEvents();
    // this.$refs.block.onclick = this.block;
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

    background-image: url("~@/assets/assets/icons/arrow-2@2x.png");
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
