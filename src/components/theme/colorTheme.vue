<template>
  <div class="colortheme colortheme-conatiner">
    <template v-for="(color, index) in colors" :key="index">
      <div class="colortheme-group" @click="colorTheme(color)">
        <div class="colortheme-color" :class="'colortheme-color--' + color">
          &nbsp;
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: ["data"],
  setup() {
    const colors = ["blue", "green", "brown"];

    return {
      colors,
    };
  },
  methods: {
    colorTheme(color) {
      const html = document.documentElement;
      const hasAttr = html.hasAttribute("color-theme") ? true : false;
      const attr = html.getAttribute("color-theme");

      if (hasAttr) {
        if (attr.toLowerCase() !== color.toLowerCase()) {
          localStorage.setItem("colorTheme", color);
          html.setAttribute("color-theme", color);
        }
      } else {
        localStorage.setItem("colorTheme", color);
        html.setAttribute("color-theme", color);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@use "~@/sass/styles" as styles;

@include styles.mxs-themes(light) {
  .colortheme {
    &-group {
      border: 2px solid styles.fns-alpha(var(--c-dprimary), 0.2);
    }
    &-color {
      &--blue {
        background: styles.fns-darken(var(--cblue-lprimary), 10);
      }
      &--green {
        background: styles.fns-darken(var(--cgreen-lprimary), 10);
      }
      &--brown {
        background: styles.fns-darken(var(--cbrown-lprimary), 10);
      }
    }
    &-group:hover {
      border-color: styles.fns-alpha(var(--sc-white), 1);
    }
  }
}

@include styles.mxs-themes(dark) {
  .colortheme {
    &-color {
      &--blue {
        background: styles.fns-darken(var(--cblue-lprimary), 20);
      }
      &--green {
        background: styles.fns-darken(var(--cgreen-lprimary), 20);
      }
      &--brown {
        background: styles.fns-darken(var(--cbrown-lprimary), 20);
      }
    }
  }
}

@include styles.mxs-scopedStaticModes(light,dark) {
  .colortheme {
    &-color {
      &--blue {
        background: styles.fns-lighten(var(--cblue-lprimary), 10);
      }
      &--green {
        background: styles.fns-lighten(var(--cgreen-lprimary), 10);
      }
      &--brown {
        background: styles.fns-lighten(var(--cbrown-lprimary), 10);
      }
    }
  }
}
</style>

<style scoped lang="scss">
@use "~@/sass/styles" as styles;

.colortheme {
  &-container {
    height: 100%;
    width: 100%;
  }
  &-group {
    height: 4rem;
    width: 4rem;

    border-radius: 5rem;
    margin: 4px;

    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-color {
    height: 90%;
    width: 90%;
    border-radius: inherit;
  }
}
</style>
