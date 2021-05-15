export default {
  state() {
    // Data
    let data = [];


    // Elements
    let slides = [];
    let els = {
    	container: null,
    	slider: null
    };



    // Slider Options
    let options = {
    	loop: false,
    	center: false,
    };
    let animations = {
      default: true,
    } 



    // Indices
    let indices = {
      offset: Math.floor(slides.length / 2),
      curIndex: 0,

      prevIndex: 0,
      nextIndex: 0,
      trails: [],
    };



    // Positions
    let positions = {
      direction: 0,
      curPos: 0,
      centerPos: 0,
      endPos: 0,
    };
    let dragPositions = {
      curPos: 0,
      prevPos: 0,
      startPos: 0,
      moveBy: 0
    };



    // Transpose
    let offset = {
      initial: false,
      mutate: false,
    }


    // Events
    let btns = {
      start: true,
      animating: false
    };
    let drag = {
      start: true,
      dragging: false,
      animating: false
    };

    return {
      data,
      slides,
      els,

      options,
      animations,

      offset,
      indices,
      
      positions,
      dragPositions,
      
      btns,
      drag,
    };
  },
  getters: {
    // States
    allStates: state => {
      return state;
    },
    sliderStates: state => props => {
    	let obj = {};
    	for(const prop of props) obj[prop] = state[prop];
    	return obj;
    },
    

    // Index Positions
    adjacentIndices: state => 
    (list = state.slides, cur = state.indices.curIndex) => {
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
    trailingIndices: (state, getters) => 
  	(method, limit = 1, list = state.slides, cur = state.indices.curIndex) => {
  		const { options } = state;
      let start = 0;
      let indices = [];
      let counter = 0;

      if (options.offset && options.loop) start = cur;

      for (counter; counter < limit; counter++) {
        if (method === "incr") {
          const { next } = getters.adjacentIndices(list, start);
          start = next;
          indices.push(next);
        }
        if (method === "decr") {
          const { prev } = getters.adjacentIndices(list, start);
          start = prev;
          indices.push(prev);
        }
      }

      return indices;
    },


    // Element's Computed Values
    removeUnit: () => (val) => {
    	// Single Property Only
      const values = val.split("px");
      return eval(values[0]);
    },
    computedValues: (state,getters) => (el, props) => {
      const computedProps = getComputedStyle(el);
      let values = {};

      for (const prop in props) {
        values[prop] = getters.removeUnit(
          computedProps.getPropertyValue(`${props[prop]}`)
        );
      }

      return values;
    },
    totalComputedValues: (state,getters) => (el, props) => {
      const computedProps = window.getComputedStyle(el);
      let width = 0;

      // Single Property Only 
      for (const cur of props) {
        const val = getters.removeUnit(computedProps.getPropertyValue(`${cur}`));
        width += val;
      }
      return width;
    },
  },
  mutations: {
	  // Add and Remove States
    pushState(state,payload) {
    	const { prop: arr, data } = payload;
      state.[arr].push(data);
    },
    spliceState(state,payload) {
    	const { prop: arr, data } = payload;
      state.[arr].splice(data);
    },



  	// Set States
    stateItems(state,payload) {
    	for(const item in payload) {
    		state[item] = payload[item];
    	}
    },
    stateObj(state,payload) {
    	const { prop: obj, data } = payload;

    	for(const item in data) {
    		state[obj][item] = payload[item];
    	}
    },
    stateObjs(state,payload) {
    	for(const obj in payload) {
    		const stateObj = payload[obj];

    		for(const item in stateObj) {
    			state[obj][item] = stateObj[item];
    		}
    	}
    },
  },
  actions: {



    // Trailing Indices
    slideIndices({ state, getters, commit }, mode) {
      const { options, offset, indices } = state;
      let trails = [];

      if (options.offset && options.loop) {
        if (offset.initial) trails = getters.trailingIndices("decr", indices.offset);
        else if(offset.mutate) {
          // relative to left position, slides array @ index 0;
          // [0,1,2,3,4,5] -> [4,5,6,1,2,3] = "decr"
          if (mode === "incr")
            trails = getters.trailingIndices("decr", indices.offset + 1);
          else if (mode === "decr")
            trails = getters.trailingIndices("decr", indices.offset - 1);
        }
      } 
      else {
        // position = (width of curIndex) * curIndex
        if(mode === "incr")
          trails = getters.trailingIndices("incr", indices.curIndex);
        else if (mode === "decr")
          trails = getters.trailingIndices("decr", indices.curIndex);
      }
      commit("stateObjs", {
      	indices: {
      		trails
      	}
      });
    },
    // Slide Direction
    slideBackward({ getters, commit, dispatch }) {
      const { prev } = getters.adjacentIndices();
      commit("stateObjs",{
        indices: {
          curIndex: prev
        }
      });
      dispatch("slideIndices","decr");
    },
    slideForward({ getters, commit, dispatch }) {
      const { next } = getters.adjacentIndices();
      commit("stateObjs",{
        indices: {
          curIndex: next
        }
      });
      dispatch("slideIndices","incr");
    },
    sliderDirection({ state, dispatch }, direction) {
      const { options, indices, slides, positions } = state;

      if (options.offset && options.loop) {
        if (direction === 1) dispatch("slideBackward");
        else if (direction === -1) dispatch("slideForward");
      }
      else {
        if (direction === 1) {
          if (indices.curIndex > 0) dispatch("slideBackward");
          }
        else if (direction === -1) {
          const isLastSlide = indices.curIndex < slides.length - 1;
          const isEndSlide = positions.curPos > positions.endPos ? true : false;
          if (isLastSlide && isEndSlide) dispatch("slideForward");
          }
      }
    },



    // Slider Width Positions
    sliderEndPos({ state, getters, commit }, container) {
      const { slides } = state;

      // full container width
      const containerWidth = container.offsetWidth;
      let width = 0;
      for (const slide of slides) {
        const curSlide = slide.value;
        // slides total width, margin and border (both sides)
        width += curSlide.offsetWidth;
        width += getters.totalComputedValues(curSlide, ["border-left-width","border-right-width"]);
        width += getters.totalComputedValues(curSlide, ["margin-left","margin-right"]);
      }
      width -= containerWidth;

      commit("stateObjs",{
        positions: {
          endPos: -width
        }
      });
    },
    sliderCenterPos({ state, getters, commit }, els) {
      const { options, slides, indices } = state;
      const { container, slider } = els;

    	if (options.center && options.loop) {
	      const curSlide = slides[indices.curIndex].value;


	      // container half width, current slide half width
	      const containerWidth = container.offsetWidth / 2;
	      const slideWidth = curSlide.offsetWidth / 2;
	      // container left padding, container left border
	      const removeContainerWidth = getters.totalComputedValues(container, [
	        "padding-left",
	        "border-left-width"
	      ]);


	      const width = containerWidth - removeContainerWidth - slideWidth;
	      slider.style.left = `${width}px`;

	      commit("stateObjs",{
	        positions: {
	          centerPos: width
	        }
	      });
	    }
    },
    sliderCurPos({ state, getters, commit }, trails) {
      const { slides, indices } = state;
      const curSlide = slides[indices.curIndex].value;

      let width = 0;
      for (const cur of trails) {
        // width per slide, margin both sides
        const slide = slides[cur].value;
        width += slide.offsetWidth;
        width += getters.totalComputedValues(slide, ["margin-left","margin-right"]);
      }
      // left margin of current slide
      width += getters.totalComputedValues(curSlide, ["margin-left"]);


      commit("stateObjs",{
        positions: { curPos: -width },
        dragPositions: { curPos: -width }
      });

      return width;
    },



    // Reset Slider
    transposeSlides({ state, commit }, data) {
      const { options, indices, offset } = state;
      const { slider, mode, value } = data;
      if (value) commit("stateObjs",{
        indices: {
        	offset: value,
        },
      });


      if (options.center && options.loop) {
      	if(offset.initial) {
	        for (let x = 0; x < indices.offset; x++) {
	          if (mode === "prepend" || mode === 1)
	            slider.prepend(slider.lastElementChild);
	          else if (mode === "append" || mode === -1)
	            slider.appendChild(slider.firstElementChild);
	        }
      	}
      	else if (offset.mutate) {
	        if (mode === "prepend" || mode === 1)
	          slider.prepend(slider.lastElementChild);
	        else if (mode === "append" || mode === -1)
	          slider.appendChild(slider.firstElementChild);
      	}
      }
      else {
        if (mode === "prepend" || mode === 1)
          slider.prepend(slider.lastElementChild);
        else if (mode === "append" || mode === -1)
          slider.appendChild(slider.firstElementChild);
      }
    },



    // Reset Slider States
    resetBtnState({ commit }) {
      commit("stateObjs",{
        btns: {
          start: true,
          animating: false
        },
      });
    },
    resetDragState({ commit }) {
      commit("stateObjs",{
        drag: {
          start: true,
          dragging: false,
          animating: false,
        },
        dragPositions: {
          moveBy: 0
        },
      });
    },
    resetProps({ commit, dispatch }) {
      dispatch("resetDragState");
      dispatch("resetBtnState");

      commit("stateObjs",{
        offset: {
          initial: false,
          mutate: false,
        },
      });
    },  	
  },
  modules: {}
};
