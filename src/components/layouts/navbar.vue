<template>
  <!-- Navbar -->
  <nav class="nav section" color-static="dark">
    <div class="section-margin section-margin--nav">
      <!-- nav bg -->
      <div class="nav-bg">&nbsp;</div>

      <!-- nav logo -->
      <div class="nav-logo">
        <nav-links :data="data.logo ? data.logo : logo"></nav-links>
      </div>

      <!-- links exsists -->
      <template v-if="data.links">
        <!-- nav links -->
        <div class="nav-links">
          <nav-links
            id="links"
            :data="data.links ? data.links : {}"
          ></nav-links>
          <color-scheme
            :data="{ id: 'theme-toggle--1' }"
            class="themebtn themebtn--1"
          />
        </div>

        <!-- hamburger links -->
        <div class="nav-burger">
          <burger-links :data="data.links ? data.links : {}"></burger-links>
          <color-scheme
            :data="{ id: 'theme-toggle--2' }"
            class="themebtn themebtn--2"
          />
        </div>
      </template>

      <!-- no links -->
      <template v-else>
        <!-- nav links -->
        <div class="nav-links">
          <color-scheme
            :data="{ id: 'theme-toggle--1' }"
            class="themebtn themebtn--1"
          />
        </div>

        <!-- hamburger links -->
        <div class="nav-burger">
          <color-scheme
            :data="{ id: 'theme-toggle--2' }"
            class="themebtn themebtn--2"
          />
        </div>
      </template>
    </div>
  </nav>
</template>

<script>
import NavLinks from "@/components/navs/navLinks.vue";
import BurgerLinks from "@/components/navs/burgerLinks.vue";
import colorScheme from "@/components/theme/colorScheme.vue";
// import styles from "@/sass/abstracts/_variables.scss";

export default {
  props: ["data"],
  components: {
    NavLinks,
    BurgerLinks,
    colorScheme,
  },
  setup() {
    const logo = [
      {
        title: "corona.",
        hash: "#",
      },
    ];

    return {
      logo,
    };
  },
};
</script>

<style scoped lang="scss">
@use "~@/sass/styles" as styles;


@include styles.mxs-themes(light) {
  .themebtn {
    &--1 {
    }
    &--2 {
      margin-left: 1rem;
    }
  }

  // navbar
  .nav {
    background: var(--c-lprimary);
    box-shadow: 0 0 10px black;
    overflow: unset;
  }

  // nav logo
  .nav-logo {
    :deep(*) {
      .link {
        &::before {
          background: var(--c-dprimary);
        }
        &--text {
          color: var(--c-dprimary);
        }
      }
      .link:hover .link--text {
        color: var(--c-dprimary);
      }
    }
  }

  // nav bg
  .nav-bg {
    background: var(--c-lprimary);
    // box-shadow: 0 0 10px black;
  }
} 


@include styles.mxs-themes(dark) {
  .nav-logo {
    :deep(*) {
      .link {
        &--text {
          font-weight: 400;
        }
      }
      .link:hover .link--text {
        color: var(--c-dprimary);
      }
    }
  }
}

@include styles.mxs-colorThemes('brown',light) {
  .nav {
    background: var(--c-white);
  }
  .nav-bg {
    background: var(--c-white);
  }
  .nav-logo {
    :deep(*) {
      .link {
        &::before {
          background: var(--c-dprimary);
        }
        &--text {
          color: var(--c-dprimary);
        }
      }
      .link:hover .link--text {
        color: var(--c-dprimary);
      }
    }
  }
}
@include styles.mxs-colorThemes('brown',dark) {
  .nav-bg {
    background: var(--c-white);
  }
}
</style>

<style scoped lang="scss">
@use "~@/sass/styles" as styles;

#links {
  margin-right: 1rem;
}

.section {
  &-margin {
    &--nav {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      position: relative;
    }
  }
}

// navbar
.nav {
  -webkit-tap-highlight-color: transparent;

  min-height: unset;
  height: 7rem;
  width: 100%;
  padding: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 5000;
}

// nav logo
.nav-logo {
  position: relative;
  z-index: 100;

  :deep(*) {
    .link {
      &::before {
        height: 10%;
        border-radius: 2px;
      }
      &--text {
        font-family: heading;
        @include styles.mxs-font-size(heading6);
        font-size: 2.7rem;
        padding: 0;

        @include styles.mxs-respond(ltablet) {
          font-size: 2.4rem;
        }
      }
    }
  }
}

// nav links
.nav-links {
  height: 100%;
  display: flex;
  align-items: center;

  @include styles.mxs-respond(ptablet) {
    display: none;
  }
}

// nav bg
.nav-bg {
  height: 7rem;
  width: 100%;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}

// nav burger
.nav-burger {
  display: none;

  @include styles.mxs-respond(ptablet) {
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>
