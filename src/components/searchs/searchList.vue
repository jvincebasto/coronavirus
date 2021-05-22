<template>

  <div class="countrylist countrylist--container" ref="container">
    <template v-for="(obj, index) in countryNames" :key="index">
      <search-list-item :data="obj" :ref="el=>listEl(el,obj)">
      </search-list-item>
    </template>    
  </div>

</template>

<script>
import stringUtilities from "@/mixins/stringUtilities.vue";
import searchListItem from "@/components/searchs/searchListItem.vue";
import { reactive, onBeforeUpdate } from "vue";
import { createNamespacedHelpers } from "vuex";
const { mapState: covidState } = createNamespacedHelpers("covid");
const { mapMutations: countryMutations } = createNamespacedHelpers("countrySearch");



export default {
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
  },
  methods: {
    ...countryMutations(["pushState","spliceState"]),



    // List Items
    listEl(el, obj) {
      if (el) {
        this.listItems.push({ data: obj, el: el.$el, refs: el.$refs });
        this.pushState({ prop: "listItems", data: { data: obj, el: el.$el, refs: el.$refs } });
      }
    },
  },
  beforeUpdate() {
    this.spliceState({ prop: "listItems", data: 0 });
  },
  beforeMount() {
    this.spliceState({ prop: "listItems", data: 0 });
  },
};
</script>

<style scoped lang="scss">
@use "~@/sass/abstracts/abstracts" as abs;

.countrylist {
  &--container {
    height: 100%;
    max-height: 30rem;
    width: 100%;
    overflow-y: scroll; 
  }
}
</style>
