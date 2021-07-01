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
@use "~@/sass/styles" as styles;

@include styles.mxs-themes(light) {
  .search {
    &--errorgroup {
      background: var(--sc-dprimary);
      box-shadow: styles.$vars-box-shadow;
    }
    &--error {
      &-title {
        // complementary
        // color: hsl(1, 80%, 55%);
        color: var(--sc-lprimary);
      }
      &-content {
        color: var(--sc-white);
      }
      &-title, &-content {
        display: flex;
        align-items: flex-end;
      }
    }
  }
}
</style>


<style scoped lang="scss">
@use "~@/sass/styles" as styles;


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

    padding: 1rem;
    padding-left: 2rem;
    margin-bottom: 1rem;
  }
  &--error {
    &-title {
      margin-right: 1rem;
  
      font-family: tsemibold;
      @include styles.mxs-font-size(body2);
    }
    &-content {
      @include styles.mxs-font-size(captions);
    }
    &-title, &-content {
      display: flex;
      align-items: flex-end;
    }
  }
}

</style>