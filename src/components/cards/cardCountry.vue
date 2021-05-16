<template>
  <div class="card">
    <div class="cardbtn--box" ref="exit">
      <div class="cardbtn--icon">&nbsp;</div>
    </div>

    <div class="cardimg--box">
      <img class="cardimg--country"
        :src="`${cardImage(data.value.countryInfo.iso2)}`"
        ref="icon"
      />
    </div>

    <card-case>
      <template #title>
        {{ `${data.value.country} ${attribute(data.value.countryInfo.iso2)}` }}
      </template>
      <template #deathsValue>
        {{ numberFormat(`${data.value.deaths}`) }}
      </template>
      <template #activeValue>
        {{ numberFormat(`${data.value.active}`) }}
      </template>
      <template #recoveredValue>
        {{ numberFormat(`${data.value.recovered}`) }}
      </template>
      <template #totalValue>
        {{ numberFormat(`${data.value.cases}`) }}
      </template>
    </card-case>

  </div>
</template>

<script>
import cardCase from "@/components/cards/cardCase.vue";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapMutations } = createNamespacedHelpers("cards");

export default {
  components: {
    cardCase
  },
  props: ["data"],
  setup() {
    return {};
  },
  methods: {
    numberFormat(number) {
      const strNumber = `${number}`;
      const [int, dec] = strNumber.split(".");
      let counter = 1;
      let reset = false;
      let num = ``;

      for (const value of [...int].reverse()) {
        if (reset) counter = 2;
        if (counter === 4) {
          num += `,${value}`;
          reset = true;
        } else {
          num += `${value}`;
          reset = false;
          counter++;
        }
      }

      num =
        dec !== undefined
          ? `${[...num].reverse().join("")}.${dec}`
          : `${[...num].reverse().join("")}`;

      return num;
    },
    attribute(value) {
      let newValue = "";
      if (value !== null) newValue = `(${value})`;
      else newValue = "";

      return newValue;
    },
    cardImage(image) {
      let path = "";
      if (image !== "null") {
        const img = image.toLowerCase();
        // const path = `background-image: url(${require(`@/assets/flags/original/${img}.png`)})`;
        path = `${require(`@/assets/flags/original/${img}.png`)}`;
      } else {
        if (this.data.value.countryInfo.iso2 !== "null") {
          path = `background-image: url(${this.data.value.countryInfo.flag})`;
        } else path = "";
      }
      return path;
    },

    ...mapMutations(["removeCardData"]),
    removeCard() {
      const countryName = this.data.value.country;
      const dataIndex = this.dataCardIndex(countryName);
      if (dataIndex > -1) this.removeCardData(dataIndex);
    }
  },
  computed: {
    ...mapGetters(["dataCardIndex"])
  },
  mounted() {
    this.$refs.exit.onclick = this.removeCard;
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

  box-shadow: 0px 0px 10px rgba(black, 0.8), 0px 10px 15px rgba(black, 0.5);

  @include abs.mxs-respond(ltablet) {
    max-width: 38rem;
  }
  @include abs.mxs-respond(ptablet) {
    max-width: 29rem;
  }
  @include abs.mxs-respond(lphone) {
    margin-right: 0;
    max-width: 80%;
  }
  @include abs.mxs-respond(pphone) {
    max-width: 90%;
  }


}


// cardBtn
.cardbtn {
  &--box {
    height: 3rem;
    width: 3rem;

    background: rgba(black,.2);
    border-radius: inherit;

    position: absolute;
    top: 2rem;
    right: 2rem;

    display: flex;
    justify-content: center;
    align-items: center;

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

    // background-image: url("~@/assets/icons/cross.svg");
    // mask: url("~@/assets/icons/cross.svg");

    background-size: contain;
    background-repeat: no-repeat;

    mask-size: contain;
    mask-repeat: no-repeat;

    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background: rgba(white,.5);
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
      height: 22rem;
    }
    @include abs.mxs-respond(lphone) {
      height: 28rem;
    }
    @include abs.mxs-respond(pphone) {
      height: 22rem;
    }
  }
  &--country {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
}


// cardCase
.card {
  :deep(.case-content--block) {
    border-radius: 0;
    background: transparent;
    box-shadow: none;
  }
}

</style>
