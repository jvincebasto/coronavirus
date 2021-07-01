<template>
  <li class="link">
    <template v-if="data.router">
      <router-link class="link--text" :to="data.router ? data.router : '/'">
        <slot name="routerName">
          {{ data.title ? data.title : "Router Link" }}
        </slot>
      </router-link>
    </template>
    <template v-else>
      <a class="link--text" :href="data.hash ? data.hash : '#'">
        <slot name="linkName">
          {{ data.title ? data.title : "Normal Link" }}
        </slot>
      </a>
    </template>
  </li>
</template>

<script>
export default {
  props: ["data"],
};
</script>

<style scoped lang="scss">
@use "~@/sass/styles" as styles;


@include styles.mxs-themes(light) {
  // navlink text
  .link {
    &--text {
      font-weight: 600;
      color: var(--c-def-black);
    }
    &::before {
      background: var(--c-dprimary);
    }
    &:hover .link--text {
      color: var(--c-lprimary);
    }
  }
}


@include styles.mxs-themes(dark) {
  .link {
    &--text {
      color: var(--c-dprimary);
      // font-weight: 400;
    }
    &::before {
      background: var(--c-dprimary);
    }
    &:hover .link--text {
      color: var(--c-lprimary);
    }
  }
}
</style>

<style scoped lang="scss">
@use "~@/sass/styles" as styles;

// navlink before psuedo
.link {
  height: 100%;
  position: relative;
  -webkit-tap-highlight-color: transparent;

  &::before {
    content: "";
    display: block;

    height: 100%;
    width: 0;
    border-radius: inherit;

    position: absolute;
    right: 0;
    bottom: 0;
    transform-origin: right;

    transition: all 0.3s ease-in-out;
  }
  &:hover::before {
    width: 100%;

    right: unset;
    left: 0;
    transform-origin: left;
  }
}

// navlink text
.link {
  &--text {
    height: 100%;
    display: flex;
    align-items: center;
    text-align: center;

    @include styles.mxs-font-size(body1);
    white-space: pre;

    padding: 0 2rem;
    position: relative;

    transition: color 0.3s ease-in-out;

    @include styles.mxs-respond(ltablet) {
      @include styles.mxs-font-size(body2);
    }
  }
}
</style>
