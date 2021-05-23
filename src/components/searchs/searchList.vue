<template>

  <input type="checkbox" :id="input.id" class="countrylist--checkbox" ref="btn"/>


  <div class="countrylist--container" ref="container">
    <div class="countrylist countrylist--overflow" ref="overflow">
      <template v-for="(obj, index) in countryNames" :key="index">
        <search-list-item :data="obj" :ref="el=>listEl(el,obj)">
        </search-list-item>
      </template>    
    </div>
  </div>

</template>

<script>
import stringUtilities from "@/mixins/stringUtilities.vue";
import searchListItem from "@/components/searchs/searchListItem.vue";
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
@use "~@/sass/abstracts/abstracts" as abs;

.countrylist {
  &--container {
    max-height: 30rem;
    width: 100%;

    $section-bg: lighten(abs.$vars-c-lprimary, 10%);
    background: $section-bg;

    border-radius: 1rem;
    box-shadow: 0px 0px 5px rgba(black, 0.8), 0px 5px 8px rgba(black, 0.5);

    position: absolute;
    z-index: -1;
    top: 0rem;
    opacity: 0;

    overflow: hidden;

    transition: all 0.3s ease-in-out;
  }
  &--overflow {
    height: 100%;
    max-height: 30rem;
    width: 100%;
    overflow-y: scroll; 
  }
  &--checkbox {
    display: none;
  }
}


// Searchlist Functions
.countrylist {
  &--checkbox:checked ~ &--container {
    opacity: 1;
    top: 8rem;
  }
}
</style>
