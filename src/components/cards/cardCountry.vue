<template>
  <div class="card">
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
        {{ `${data.country} ${nullCheck(data.countryInfo.iso2)}` }}
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
    ...countryGetters(["searchStates","validateCountryName"]),
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



    // Remove Card Event
    removeCard(event) {
      const state = this.searchStates(["countries"])
      event.cancelBubble = true;

      const country = this.data.country.toLowerCase();
      const first = state.countries[0].country.toLowerCase();
      if(country === first) this.spliceStateItem({ prop: "countries", data: 0 });
      else {
        const index = state.countries.findIndex((obj,index) => this.validateCountryName(obj,country,index));
        if(index > -1) this.spliceStateItem({ prop: "countries", data: index });        
      }
    }
  },
  mounted() {
  }
};
</script>

<style scoped lang="scss">
@use "~@/sass/abstracts/abstracts" as abs;

.card {
  max-width: 30rem;
  height: auto;
  flex: 1 0 100%;

  border-radius: 1rem;
  position: relative;

  margin-right: 4rem;
  margin-bottom: 4rem;

  box-shadow: 0px 2px 10px rgba(black, 0.8), 0px 10px 15px rgba(black, 0.5);

  position: relative;
  z-index: 100;

  $section-bg: lighten(abs.$vars-c-lprimary, 10%);
  background: $section-bg;


  @include abs.mxs-respond(ptablet) {
    max-width: 27rem;
    margin-right: 3rem;
    margin-bottom: 3rem;
    box-shadow: 0px 2px 5px rgba(black, 0.5), 0px 5px 8px rgba(black, 0.5);
  }
  @include abs.mxs-respond(pphone) {
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

    // background: rgba(black,.2);
    border-radius: inherit;

    position: absolute;
    top: 2rem;
    right: 2rem;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    overflow: hidden;
    // display: none;

    @include abs.mxs-respond(pphone) {
      height: 3rem;
      width: 3rem;
    }
  }
  &--icon {
    height: 100%;
    width: 100%;

    background: abs.$vars-c-dprimary;

    @supports(mask: url("~@/assets/icons/cross.svg")) {
      mask: url("~@/assets/icons/cross.svg");
      @include abs.mxs-svg-contain;
    }

    background-image: url("~@/assets/icons/cross.svg");
    @include abs.mxs-img-contain;

    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      background: abs.$vars-c-lprimary;
      // background: rgba(white,.5);
    }
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


    @include abs.mxs-respond(ptablet) {
      height: 18rem;
    }
  }
  &--country {
    height: 100%;
    width: 100%;
    @include abs.mxs-img-cover;
  }
}


// cardCase
.card {
  :deep(.case-content--block) {
    border-radius: 0;
    background: transparent;
    box-shadow: none;

    @include abs.mxs-respond(ptablet) {
      min-width: unset;
    }
  }
}

</style>
