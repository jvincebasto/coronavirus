<template>
  <section class="section section-global" id="global" ref="sectGlobal">
    <div class="section-margin row row--1">
      <div class="section--titlegroup">
        <h4 class="section--title">global cases</h4>
        <p class="section--subtitle">
          Daily records of the virus around the world
        </p>
      </div>
    </div>

    <div class="section-margin row row--2">
      <template v-if="globalBool">
        <card-global :data="globalres" :els="els"></card-global>
      </template>
    </div>
  </section>
</template>

<script>
import stringUtilities from "@/mixins/stringUtilities.vue";
import { ref, reactive, defineAsyncComponent } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { createNamespacedHelpers } from "vuex";
const { mapActions: covidActions } = createNamespacedHelpers("covid");

export default {
  mixins: [stringUtilities],
  components: {
    cardGlobal: defineAsyncComponent({
      loader: () => import("@/components/cards/cardGlobal.vue"),
      // delay: 200,
      // timeout: 3000,
      // errorComponent: errorComponent,
      // loadingComponent: loadingComponent,
    }),
  },
  setup() {
    const globalres = reactive([]);
    const els = reactive({});
    let bool = ref(false);

    return {
      globalres,
      els,
      bool,
    };
  },
  computed: {
    globalBool() {
      return this.bool;
    },
  },
  methods: {
    ...covidActions(["fetchAll"]),
    async getGlobalRes() {
      this.globalres = await this.fetchAll();
      if (this.globalres) {
        this.bool = true;
        this.els.container = this.$refs.sectGlobal;
      }
    },
  },
  mounted() {
    this.getGlobalRes();
  },
};
</script>

<style scoped lang="scss">
@use "~@/sass/styles" as styles;

@include styles.mxs-themes(light) {
  .section {
    &-global {
      background: styles.fns-lighten(var(--c-lprimary), 2);
      // background: var(--c-white);
    }
  }
}

@include styles.mxs-themes(dark) {
  .section {
    &-global {
      background: var(--c-white);
    }
  }
}

@include styles.mxs-colorThemes("brown", light) {
  .section {
    &-global {
      background: styles.fns-lighten(var(--c-lprimary), 6);
      // background: var(--c-white);
    }
  }
}

@include styles.mxs-colorThemes("brown", dark) {
  .section {
    &-global {
      background: var(--c-white);
    }
  }
}
</style>

<style scoped lang="scss">
@use "~@/sass/styles" as styles;

.row {
  justify-content: center;

  &--1 {
    margin-bottom: 8rem;
  }
  &--2 {
    margin-bottom: 4rem;
    position: relative;
  }
}

.section {
  &-global {
    position: relative;
  }
}
</style>
