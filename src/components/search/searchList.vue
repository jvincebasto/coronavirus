<template>

  <input type="checkbox" :id="input.id" class="countrylist--checkbox" 
    @click="searchListToggle($event)" ref="btn"/>


  <div class="countrylist--container" ref="container">
    <div class="countrylist countrylist--overflow-scroll" ref="overflowScroll">
      <template v-for="(obj, index) in countryNames" :key="index">
        <search-list-item :data="obj" :ref="el=>listEl(el,obj)">
        </search-list-item>
      </template>    
    </div>
  </div>

</template>

<script>
import stringUtilities from "@/mixins/stringUtilities.vue";
import searchListItem from "@/components/search/searchListItem.vue";
import { gsap } from "gsap";
import { reactive, onBeforeUpdate } from "vue";
import { createNamespacedHelpers } from "vuex";
const { mapState: covidState } = createNamespacedHelpers("covid");
const { mapGetters: countryGetters, mapMutations: countryMutations } = createNamespacedHelpers("countrySearch");



export default {
  props: ["input"],
  mixins: [stringUtilities],
  components: {
    searchListItem
  },
  setup() {
    let listItems = reactive([]);

    onBeforeUpdate(() => {
      listItems.splice(0);
    });

    return {
      listItems
    };
  },
  computed: {
    ...covidState({
      countryNames: state => state.countryNames,
    }),
    ...countryGetters(["searchStates"]),
  },
  methods: {
    ...countryMutations(["pushState","spliceState","stateObjs"]),



    // List Items
    listEl(el, obj) {
      if (el) {
        this.listItems.push({ data: obj, el: el.$el, refs: el.$refs });
        this.pushState({ prop: "listItems", data: { data: obj, el: el.$el, refs: el.$refs } });
      }
    },


    // List Init
    setSearchEls() {
      this.stateObjs({ els: {
        searchList: this.$refs.container,
        searchListBtn: this.$refs.btn,
        }
      });
    },


    // SearchList Event
    searchListToggle(event) {
      const toggleState = event.target.checked;

      const duration = 0.2;
      const container = this.$refs.container;

      const animate = gsap.timeline();
      if(toggleState) {
        animate.to(container, { display: "block", duration: 0 });
        animate.to(container, { opacity: 1, duration: .3 },">");
        animate.to(container, { y: 80, duration },"<");
      }
      else {
        animate.to(container, { y: 20, duration });
        animate.to(container, { opacity: 0, duration: .4 },"<");
        animate.to(container, { display: "none", duration: 0 },">");
      }
    }

  },
  beforeUpdate() {
    this.spliceState({ prop: "listItems", data: 0 });
  },
  beforeMount() {
    this.spliceState({ prop: "listItems", data: 0 });
    this.stateObjs({ els: {
      searchList: null,
      searchListBtn: null,
      }
    });
  },
  mounted() {
    this.setSearchEls();
  }
};
</script>

<style scoped lang="scss">
@use "~@/sass/styles" as styles;


@include styles.mxs-themes(light) {
  .countrylist {
    &--container {
      background: styles.fns-darken(var(--c-white), 4);
      box-shadow: styles.$vars-box-shadow;
    }
  }
  .countrylist--overflow-scroll  {
    scrollbar-width: 15px;
    scrollbar-color: var(--sc-defwhite);

    &::-webkit-scrollbar {
      width: 15px;
    }
    &::-webkit-scrollbar-track {
      background: var(--sc-defwhite);
    }
    &::-webkit-scrollbar-thumb {
      background: var(--c-black);
    }
    &::-webkit-scrollbar-thumb:hover {
      // background: var(--c-black);
    }
  }
}

@include styles.mxs-themes(dark) {
  .countrylist {
    &--container {
      background: var(--c-white);
    }
  }
  .countrylist--overflow-scroll  {
    scrollbar-color: var(--c-dprimary);

    &::-webkit-scrollbar-track {
      background: var(--c-white);
    }
    &::-webkit-scrollbar-thumb {
      background: var(--c-black);
    }
  }
}

</style>

<style scoped lang="scss">
@use "~@/sass/styles" as styles;

.countrylist {
  &--container {
    max-height: 30rem;
    width: 100%;
    display: none;
    border-radius: 1rem;

    position: absolute;
    z-index: 10;
    top: 0;
    opacity: 0;

    overflow: hidden;
    transition: all 0.3s ease-in-out;
  }
  &--overflow {
    &-scroll {
      height: 100%;
      max-height: 30rem;
      width: 100%;
      overflow-y: scroll;
    }
  }
  &--checkbox {
    display: none;
  }
}


// Searchlist Functions
.countrylist {
  // &--checkbox:checked ~ &--container {
  //   opacity: 1;
  //   top: 8rem;
  // }
}
</style>
