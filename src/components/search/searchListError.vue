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
const { mapState: countryState } = createNamespacedHelpers("countrySearch");


export default {
  computed: {
    ...countryState({
      errors: state => state.errors,
    }),
  },
  methods: {
  }
};

</script>

<style scoped lang="scss">
@use "~@/sass/abstracts/abstracts" as abs;


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
    background: abs.$vars-c-dprimary;
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
  
      // complementary
      color: hsl(1, 80%, 55%);
    }
  }
}

</style>