<template>
  <ul class="theme theme-container">
    <template v-for="(obj, index) in data" :key="index">
      <li class="theme-item">
        <p class="theme-content theme-content--1">{{ obj.string }}</p>
        <p class="theme-content theme-content--2">{{ obj.value }}</p>
      </li>
    </template>
  </ul>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    let data = ref([]);

    return {
      data,
    };
  },
  methods: {
    themeLog(string, value) {
      const obj = {
        string,
        value,
      };
      this.data.push(obj);
    },
    setColorTheme() {
      const html = document.documentElement;
      const lsColor = localStorage.getItem("colorTheme");

      if (lsColor) {
        localStorage.getItem("colorTheme", lsColor);
        html.setAttribute("color-theme", lsColor);
      }
    },
    setColorMode(matches) {
      const html = document.documentElement;
      let mode = "light";

      if (matches) mode = "dark";
      else mode = "light";

      localStorage.setItem("colorMode", mode);
      html.setAttribute("color-mode", mode);
      // this.themeLog("Set Theme", `${mode}(${typeof mode})`);
    },
    themeInit() {
      const html = document.documentElement;
      const scheme = window.matchMedia("(prefers-color-scheme: dark)");
      const matches = eval(scheme.matches);
      const lsMode = localStorage.getItem("colorMode");
      // this.themeLog("Theme Init Dark?", `${matches}(${typeof matches})`);

      const setColorMode = this.setColorMode;
      // const themeLog = this.themeLog;

      if (lsMode.toLowerCase() === "light" || lsMode.toLowerCase() === "dark") {
        this.setColorTheme();
        localStorage.setItem("colorMode", lsMode);
        html.setAttribute("color-mode", lsMode);
      } else {
        this.setColorTheme();
        setColorMode(matches);
      }

      scheme.addListener((e) => {
        setColorMode(e.matches);
        // themeLog("Event", `${e.matches}(${typeof e.matches})`);
      });
    },
  },
  mounted() {
    // must be placed at the level of the structure
    this.themeInit();
  },
};
</script>

<style scoped lang="scss">
@use "~@/sass/styles" as styles;

.theme {
  &-container {
    height: auto;
    width: 100%;
    margin-top: 8rem;

    display: none;
  }
  &-item {
    width: 100%;
    height: auto;

    display: flex;
    align-items: center;
  }
  &-content {
    flex: 1 0 50%;
    &--1 {
      font-weight: var(--c-defblack);
    }
    &--2 {
    }
  }
}
</style>
