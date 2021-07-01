<template>
  <div class="colormode colormode-btn" @click="themeBtn()">
    <div class="colormode-icon colormode-icon--bulb">&nbsp;</div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const bool = ref(false);

    return {
      bool,
    };
  },
  methods: {
    themeBtn() {
      const html = document.documentElement;
      this.bool = !this.bool;

      // toggle
      let mode = html.getAttribute("color-mode");
      mode = mode === "dark" ? "light" : "dark";
      localStorage.setItem("colorMode", mode);
      html.setAttribute("color-mode", mode);
    },
  },
};
</script>

<style scoped lang="scss">
@use "~@/sass/styles" as styles;

// checkbox
.theme {
  &-checkbox {
    height: 4rem;
    width: 4rem;
    display: none;
  }

  // &-checkbox,
  // &-btn {
  //   position: absolute;
  //   top: 50%;
  //   right: 0;
  //   transform: translateY(-50%);
  // }
}

.theme {
  &-btngroup {
    height: 4rem;
    width: 4rem;

    border: 2px solid styles.fns-alpha(var(--c-dprimary), 0.2);
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

    background: var(--c-dprimary);
    border-radius: inherit;

    &--blue {
      background: styles.fns-lighten(var(--cblue-dprimary), 10);
    }
    &--green {
      background: styles.fns-lighten(var(--cgreen-dprimary), 10);
    }
  }
  &-btngroup:hover {
    border-color: styles.fns-alpha(var(--sc-white), 1);
  }
}

@include styles.mxs-themes(dark) {
  .theme {
    &-color {
      &--blue {
        background: var(--cblue-dprimary);
      }
      &--green {
        background: var(--cgreen-dprimary);
      }
    }
  }
}

// theme btn
.theme {
  &-togglebtn {
    height: 5rem;
    width: 5rem;

    border-radius: 50%;
    border: 2px solid styles.fns-alpha(var(--c-dprimary), 0.1);
    cursor: pointer;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: relative;
    z-index: 5;

    @include styles.mxs-respond(ptablet) {
      height: 4rem;
      width: 4rem;
    }
  }
  &-circle {
    display: block;
    height: 4px;
    width: 4px;

    background: var(--c-lprimary);
    margin-bottom: 4px;
    border-radius: 50%;
    z-index: 1;

    transition: all 0.3s ease-in-out;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
  &-bg {
    height: 90%;
    width: 90%;

    border-radius: 50%;
    background: var(--c-dprimary);

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &-togglebtn:hover {
    background: var(--sc-white);
  }
  &togglebtn:hover &-circle {
    background: var(--c-black);
  }
}

.theme {
  &-options {
    height: auto;
    max-width: 12rem;
    padding: 5px;

    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    background: var(--c-lprimary);
    box-shadow: 0 0 10px black;
    border-radius: 4rem;

    position: absolute;
    right: 0;
    top: -50rem;
    margin-top: 10rem;
    z-index: -2;

    opacity: 0;
    transition: all 0.3s ease-in-out;
  }
}

.theme {
  &-checkbox:checked ~ &-block &-togglebtn {
    border: 2px solid styles.fns-alpha(var(--c-dprimary), 1);
  }
  &-checkbox:checked ~ &-block &-options {
    top: 0;
    opacity: 1;
  }
}

.theme {
  &-container {
    height: 100%;
  }
}

.colormode {
  &-icon {
    &--bulb {
      background-image: url("~@/assets/icons/day@2x.png");
    }
  }

  &-btn {
    background: styles.fns-darken(var(--c-lprimary), 5);
  }
  &-icon {
    background: styles.fns-lighten(var(--c-dprimary), 10);
  }
  &-btn:hover {
    background: styles.fns-lighten(var(--c-lprimary), 10);
  }
  &-btn:hover &-icon {
    background: var(--c-black);
  }
}

@include styles.mxs-themes(dark) {
  .colormode {
    &-btn {
      background: styles.fns-darken(var(--c-lprimary), 5);
    }
    &-icon {
      background: var(--c-dprimary);
    }
    &-btn:hover {
      background: var(--c-dprimary);
    }
    &-btn:hover .colormode-icon {
      background: var(--c-white);
    }
  }
}
</style>

<style scoped lang="scss">
@use "~@/sass/styles" as styles;

.colormode {
  &-btn {
    height: 4rem;
    width: 4rem;

    border-radius: 10rem;
    cursor: pointer;
    margin: 4px;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    z-index: 500;

    transition: all 0.3s ease-in-out;
  }
  &-icon {
    height: 2rem;
    width: 2rem;
    border-radius: inherit;

    @include styles.mxs-img-contain;
    transition: background-color 0.3s ease-in-out;

    &--bulb {
      @supports (mask: url("~@/assets/icons/day.svg")) {
        mask: url("~@/assets/icons/day.svg");
        @include styles.mxs-svg-contain;
      }
    }
  }
}
</style>
