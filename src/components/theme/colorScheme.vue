<template>
  <div class="theme theme--container">
    <!-- checkbox -->
    <input
      type="checkbox"
      class="theme-checkbox"
      :id="data.id ? data.id : 'theme-toggle'"
      ref="checkbox"
    />

    <div class="theme-group">
      <!-- themebtn toggle btn -->
      <label
        class="themebtn themebtn-toggle"
        :for="data.id ? data.id : 'themebtn-toggle'"
      >
        <span class="themebtn-circle themebtn-circle--1">&nbsp;</span>
        <span class="themebtn-circle themebtn-circle--2">&nbsp;</span>
        <span class="themebtn-circle themebtn-circle--3">&nbsp;</span>
        <div class="themebtn-bg themebtn-bg--1">&nbsp;</div>
      </label>

      <!-- themebtn toggle list -->
      <div class="themelist--container">
        <color-mode></color-mode>
        <color-theme></color-theme>
      </div>
    </div>
  </div>
</template>

<script>
import colorMode from "@/components/theme/colorMode.vue";
import colorTheme from "@/components/theme/colorTheme.vue";
import { ref } from "vue";

export default {
  props: ["data"],
  components: {
    colorMode,
    colorTheme,
  },
  setup() {
    const bool = ref(false);
    const colors = ["blue", "green"];

    return {
      bool,
      colors,
    };
  },
};
</script>

<style scoped lang="scss">
@use "~@/sass/styles" as styles;

// theme btn
.themebtn {
  &-toggle {
    border: 2px solid styles.fns-alpha(var(--c-dprimary), 0.1);
  }
  &-circle {
    background: var(--c-lprimary);
  }
  &-bg {
    background: var(--c-dprimary);
  }
  &-toggle:hover {
    background: var(--sc-white);
  }
}

// theme list
.themelist {
  &--container {
    background: var(--c-lprimary);
  }
}

// theme css functions
.theme {
  &-checkbox:checked ~ &-group &btn-toggle {
    border: 2px solid styles.fns-alpha(var(--c-dprimary), 1);
  }
  &-checkbox:checked ~ &-group &list--container {
    top: 0;
    opacity: 1;
  }
}
</style>

<style scoped lang="scss">
@use "~@/sass/styles" as styles;

// theme container
.theme--container {
  height: 100%;
}

// theme group
.theme-group {
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
}

// checkbox
.theme {
  &-checkbox {
    height: 4rem;
    width: 4rem;
    display: none;
  }
}

// theme btn
.themebtn {
  &-toggle {
    height: 5rem;
    width: 5rem;

    border-radius: 50%;
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

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

// theme list
.themelist {
  &--container {
    height: auto;
    max-width: 12rem;
    padding: 5px;

    display: flex;
    justify-content: center;
    flex-wrap: wrap;

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
</style>
