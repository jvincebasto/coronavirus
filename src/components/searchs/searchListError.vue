<template>
  <div class="search-errors">
    <template v-for="(obj, index) in errors" :key="index">
      <div class="search--errorgroup" :ref="`error--${obj.title}`">      
        <p class="search--error-title">{{ obj.title }}</p>
        <p class="search--error-content">{{ obj.content }}</p>
      </div>
    </template>
  </div>
</template>


<script>
import { createNamespacedHelpers } from "vuex";
const { mapState: countryState, mapGetters: countryGetters, mapMutations: countryMutations } = createNamespacedHelpers("countrySearch");


export default {
  computed: {
    ...countryState({
      errors: state => state.errors,
    }),
    ...countryGetters(["searchStates"]),
  },
  methods: {
    ...countryMutations(["pushState"]),


    // Search ErrorList
    searchErrorList() {
      const state = this.searchStates(["inputs"]);
      const erorFormat = function(list) {
        const last = list.length - 1;
        const inputs = list.filter((val,index) => index !== last);

        let string = inputs.join(", ");
        string += list.length === 1 ? list[last] : ` and ${list[last]}`;

        return string;
      }

      if(state.inputs.invalid.length > 0) {
        let error = erorFormat(state.inputs.invalid);
        error = `request for ${error} were not found, please try again`;
        this.pushState({ prop: "errors", data: { title: "Not Found:", content: error } });
      }
      if(state.inputs.duplicates.length > 0) {
        let error = erorFormat(state.inputs.duplicates);
        error = ` ${error} already exists`;
        this.pushState({ prop: "errors", data: { title: "Duplicates:", content: error } });
      }
      if(state.inputs.excess.length > 0) {
        let error = erorFormat(state.inputs.excess);
        error = `Limit of 10 exceeded, request for ${error} has been cancelled`;
        this.pushState({ prop: "errors", data: { title: "Excess:", content: error } });
      }
    },
  }
};

</script>

<style scoped lang="scss">

// Search Errors
.search {
  &-errors {
    width: 100%;
  }
  &--errorgroup {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    border-radius: .5rem;

    // complementary
    background: hsl(1, 85%, 50%);
    padding: 1rem;
    padding-left: 2rem;
    margin-bottom: 1rem;

    box-shadow: 0 0px 5px rgba(0,0,0,.2), 0 2px 5px rgba(0,0,0,.5);

    color: white;
    font-size: 1.3rem;
  }
  &--error {
    &-title {
      font-family: tbold;
      margin-right: 1rem;
    }
  }
}

</style>