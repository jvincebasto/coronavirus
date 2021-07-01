<template>
  <navbar :data="data" />
  <div class="section">
    <div class="section-margin section-margin--error">
      <h2 class="error-title">Error 404 | Not Found</h2>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/layouts/navbar.vue";

export default {
  components: {
    Navbar,
  },
  setup() {
    const logo = [
      {
        title: "vince.",
        router: "/",
      },
    ];
    const data = {
      logo,
    };

    return {
      logo,
      data,
    };
  },
};
</script>

<style scoped lang="scss">
@use "~@/sass/styles" as styles;

.section-margin {
  &--error {
    margin-top: 4rem;
    min-height: 50vh;

    display: flex;
    justify-content: center;
  }
}

.error-title {
  color: var(--c-dprimary);
  margin-top: 20vh;

  @include styles.mxs-respond(ltablet) {
    @include styles.mxs-font-size(heading3);
  }
  @include styles.mxs-respond(ptablet) {
    @include styles.mxs-font-size(heading4);
  }
  @include styles.mxs-respond(pphone) {
    @include styles.mxs-font-size(heading5);
    margin-top: 10vh;
  }
}
</style>
