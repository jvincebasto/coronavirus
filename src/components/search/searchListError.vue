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

    background: abs.$vars-c-dprimary;
    box-shadow: abs.$vars-box-shadow;

    padding: 1rem;
    padding-left: 2rem;
    margin-bottom: 1rem;

  }
  &--error {
    &-title {
      margin-right: 1rem;
  
      font-family: tsemibold;
      @include abs.mxs-font-type(body2);

      // complementary
      color: hsl(1, 80%, 55%);
    }
    &-content {
      color: white;
      @include abs.mxs-font-type(captions);
    }
    &-title, &-content {
      display: flex;
      align-items: flex-end;
    }
  }
}

</style>