<template>
  <div class="container">
    <p class="query query--pphone">480max: phone portrait</p>
    <p class="query query--lphone">768max: phone landscape</p>

    <p class="query query--ptablet">992max: tablet portrait</p>
    <p class="query query--ltablet">1280max: tablet landscape</p>

    <p class="query query--laptop">1440max: laptop</p>
    <p class="query query--desktop">1440min: desktop</p>
    <p class="query query--ldesktop">1920min: Large Desktop</p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
@use "~@/sass/abstracts/abstracts" as abs;

.container {
  background: abs.$vars-c-black;

  position: fixed;
  top: 8rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 8000;
}

.query {
  color: abs.$vars-c-white;
  display: none;

  &--pphone {
    @include abs.mxs-respond-minmax(320px, 480px) {
      display: unset;
    }
  }
  &--pphone ~ * {
    display: none;
    @include abs.mxs-respond-minmax(320px, 480px) {
      display: none;
    }
  }

  &--lphone {
    @include abs.mxs-respond-minmax(481px, 768px) {
      display: unset;
    }
  }
  &--lphone ~ * {
    display: none;
    @include abs.mxs-respond-minmax(481px, 768px) {
      display: none;
    }
  }

  &--ptablet {
    @include abs.mxs-respond-minmax(769px, 992px) {
      display: unset;
    }
  }
  &--ptablet ~ * {
    display: none;
    @include abs.mxs-respond-minmax(769px, 992px) {
      display: none;
    }
  }

  &--ltablet {
    @include abs.mxs-respond-minmax(993px, 1280px) {
      display: unset;
    }
  }
  &--ltablet ~ * {
    display: none;
    @include abs.mxs-respond-minmax(993px, 1280px) {
      display: none;
    }
  }

  &--laptop {
    // display: unset;

    @include abs.mxs-respond-minmax(1281px, 1440px) {
      display: unset;
    }
  }
  &--laptop ~ * {
    display: none;
    @include abs.mxs-respond-minmax(1281px, 1440px) {
      display: none;
    }
  }

  &--desktop {
    @include abs.mxs-respond-minmax(1441px, 1920px) {
      display: unset;
    }
  }
  &--desktop ~ * {
    display: none;
    @include abs.mxs-respond-minmax(1441px, 1920px) {
      display: none;
    }
  }

  &--ldesktop {
    @include abs.mxs-respond-minmax(1921px, 2021px) {
      display: unset;
    }
  }
  &--ldesktop ~ * {
    display: none;
    @include abs.mxs-respond-minmax(1921px, 2021px) {
      display: none;
    }
  }
}
</style>
