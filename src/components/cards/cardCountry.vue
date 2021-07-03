<template>
  <div class="card" ref="card">
    <div class="cardbtn--box" ref="exit">
      <div @click="removeCard($event)" class="cardbtn--icon">&nbsp;</div>
    </div>

    <div class="cardimg--box">
      <div class="cardimg--country" ref="icon"
        :style="cardImage(data.countryInfo.iso2)">
      </div>
    </div>

    <card-case>
      <template #title>
        {{ `${data.country} | ${nullCheck(data.countryInfo.iso2)}` }}
      </template>
      <template #deathsValue>
        {{ numberFormat(`${data.deaths}`) }}
      </template>
      <template #activeValue>
        {{ numberFormat(`${data.active}`) }}
      </template>
      <template #recoveredValue>
        {{ numberFormat(`${data.recovered}`) }}
      </template>
      <template #totalValue>
        {{ numberFormat(`${data.cases}`) }}
      </template>
    </card-case>

  </div>
</template>

<script>
import stringUtilities from "@/mixins/stringUtilities.vue";
import cardCase from "@/components/cards/cardCase.vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { createNamespacedHelpers } from "vuex";
const { mapGetters: countryGetters, mapMutations: countryMutations } = createNamespacedHelpers("countrySearch");

export default {
  components: {
    cardCase
  },
  mixins: [stringUtilities],
  props: ["data"],
  setup() {
    return {};
  },
  computed: {
    ...countryGetters(["searchStates","validateCountryName","validateCountryNameList"]),
  },
  methods: {
    ...countryMutations(["spliceStateItem"]),
    

    // Props
    nullCheck(value,nullValue = "") {
      if(value !== "null") return value;
      else return nullValue
    },
    propName(prefix,value,nullValue = ""){
      return `${prefix}${this.nullCheck(value,nullValue)}`
    },
    cardImage(image) {
      const img = image.toLowerCase();
      let path = "";
      if (image !== "null") path = `${require(`@/assets/flags/original/${img}.png`)}`;
      else if (this.data.countryInfo.iso2 !== "null") path = this.data.countryInfo.flag;
      else path = "";
      return `background-image: url(${path})`;
    },



    // Enable List Item
    enableListItem(input) {
      const state = this.searchStates(["listItems"]);
      const value = input.toLowerCase();
      const match = state.listItems.find((obj) => this.validateCountryNameList(obj.data,value,obj));
      if(match) { 
        match.refs.input.checked = false;
        match.refs.input.disabled = false;
      }
    },
    // Remove Card Event
    removeCard(event) {
      const state = this.searchStates(["countries"])
      event.cancelBubble = true;

      const country = this.data.country.toLowerCase();
      const first = state.countries[0].country.toLowerCase();
      if(country === first) { 
        this.spliceStateItem({ prop: "countries", data: 0 });
        this.enableListItem(country);
      }
      else {
        const index = state.countries.findIndex((obj,index) => this.validateCountryName(obj,country,index));
        if(index > -1) {
          this.spliceStateItem({ prop: "countries", data: index });        
          this.enableListItem(country);
        }
      }

    },



    // animations
    fadeIns() {
      const scroll = (el) => gsap.timeline({
        scrollTrigger: {
          // markers: {
          //   startColor: "green",
          //   endColor: "red",
          //   fontSize: "16px"
          // },

          // trigger | (trigger, viewport)
          trigger: el,
          start: "top 95%",
          end: "bottom bottom",
          // scrub: 1,
        }
      });
      function animateObj() {
        return {
          ease: "ease",
          opacity: 0,
          duration: 2
        }
      }

      const card = scroll(this.$refs.card);
      card.from(this.$refs.card,{ y: -25, ...animateObj() });
    }
  },
  mounted() {
    this.fadeIns();
  }
};
</script>

<style scoped lang="scss">
@use "~@/sass/styles" as styles;


@include styles.mxs-themes(light) {
  .card {
    background: styles.fns-lighten(var(--c-lprimary), 6);
    box-shadow: styles.$vars-box-shadow;
  }
  .cardbtn {
    &--icon {
      @supports(mask: url("~@/assets/icons/cross.svg")) {
        mask: url("~@/assets/icons/cross.svg");
        @include styles.mxs-svg-contain;
      }
      background: url("~@/assets/icons/cross.svg");

      &:hover {
        background: var(--c-lprimary);
      }
    }
    &--icon {
      @include styles.mxs-img-contain;
      background: var(--c-dprimary);
    }
  }
  .cardimg {
    &--country {
      @include styles.mxs-img-cover;
    }
  }
  .card {
    :deep(.case-content--block) {
      background: transparent;
      box-shadow: none;
    }
  }
}


@include styles.mxs-themes(dark) {
  .card {
    background: styles.fns-darken(var(--c-lprimary), 3);
  }
}


@include styles.mxs-colorThemes('brown',light) {
  .card {
    background: styles.fns-lighten(var(--c-white), 6);
  }
}
@include styles.mxs-colorThemes('brown',dark) {
  .card {
    background: styles.fns-darken(var(--c-white), 3);
  }
}
</style>


<style scoped lang="scss">
@use "~@/sass/styles" as styles;


.card {
  max-width: 30rem;
  height: auto;
  flex: 1 0 100%;

  border-radius: 1rem;
  margin-right: 4rem;
  margin-bottom: 4rem;

  position: relative;
  z-index: 100;

  @include styles.mxs-respond(ptablet) {
    max-width: 27rem;
    margin-right: 3rem;
    margin-bottom: 3rem;
  }
  @include styles.mxs-respond(pphone) {
    margin-right: 0;
    max-width: 30rem;
    width: 100%;
  }
}



// cardBtn
.cardbtn {
  &--box {
    height: 3rem;
    width: 3rem;
    border-radius: inherit;

    position: absolute;
    top: 2rem;
    right: 2rem;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    overflow: hidden;

    @include styles.mxs-respond(pphone) {
      height: 3rem;
      width: 3rem;
    }
  }
  &--icon {
    height: 100%;
    width: 100%;

    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
}


// cardImg
.cardimg {
  &--box {
    height: 20rem;
    width: inherit;

    border-radius: inherit;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    overflow: hidden;

    @include styles.mxs-respond(ptablet) {
      height: 18rem;
    }
  }
  &--country {
    height: 100%;
    width: 100%;
  }
}


// cardCase
.card {
  :deep(.case-content--block) {
    height: auto;
    border-radius: 0;

    @include styles.mxs-respond(ptablet) {
      min-width: unset;
    }
  }
}

</style>
