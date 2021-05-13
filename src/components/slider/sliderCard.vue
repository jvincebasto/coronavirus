<template>
  <div class="carousel-items" :class="`carousel-items--${index}`"
    :ref="el => {slideList(el)}">
    <slot name="component" :prop="value">
      {{ `item-${index}` }}
    </slot>
  </div>
</template>


<script>
// import { gsap } from "gsap";
import mixinSlider from "@/mixins/mixinSlider.vue";
// import { createNamespacedHelpers } from "vuex";
// const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers("slider");

export default {
  props: ["index"],
  mixins: [mixinSlider],
  setup() {
  },
  computed: {
  },
  methods: {
  },
  mounted() {
  }
};
</script>
