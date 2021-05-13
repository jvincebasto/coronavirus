<template>
  <div class="card">
    <div class="card-btnbox" ref="exit">
      <div class="card-btn--exit">&nbsp;</div>
    </div>

    <div class="card-imgbox">
      <!-- <div class="card-img-country" :style="`${cardImage(cardList.countryInfo.iso2)}`" ref="icon">&nbsp;</div> -->

      <img
        class="card-img-country"
        :src="`${cardImage(data.value.countryInfo.iso2)}`"
        ref="icon"
      />
    </div>

    <div class="card-casebox">
      <h6 class="card-title" ref="countryName">
        {{ `${data.value.country} ${attribute(data.value.countryInfo.iso2)}` }}
      </h6>

      <ul class="card-caseblock">
        <li class="card-casegroup">
          <span class="card-caseicon card-caseicon--deaths">&nbsp;</span>

          <div class="card-caseinfo">
            <p class="card-caseinfo-title">Deaths</p>
            <h6 class="card-caseinfo-value" ref="deaths">
              {{ numberFormat(`${data.value.deaths}`) }}
            </h6>
          </div>
        </li>
        <li class="card-casegroup">
          <span class="card-caseicon card-caseicon--active">&nbsp;</span>

          <div class="card-caseinfo">
            <p class="card-caseinfo-title">Active</p>
            <h6 class="card-caseinfo-value" ref="active">
              {{ numberFormat(`${data.value.active}`) }}
            </h6>
          </div>
        </li>
        <li class="card-casegroup">
          <span class="card-caseicon card-caseicon--recovered">&nbsp;</span>

          <div class="card-caseinfo">
            <p class="card-caseinfo-title">Recovered</p>
            <h6 class="card-caseinfo-value" ref="recovered">
              {{ numberFormat(`${data.value.recovered}`) }}
            </h6>
          </div>
        </li>
        <li class="card-casegroup">
          <span class="card-caseicon card-caseicon--total">&nbsp;</span>
          <div class="card-caseinfo">
            <p class="card-caseinfo-title">Total Cases</p>
            <h6 class="card-caseinfo-value" ref="cases">
              {{ numberFormat(`${data.value.cases}`) }}
            </h6>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapMutations } = createNamespacedHelpers("cards");

export default {
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

<style lang="scss">
@use "~@/sass/abstracts/abstracts" as abs;

.card {
  max-width: 33rem;
  height: auto;
  flex: 1 0 100%;

  // $card-bg: darken(abs.$vars-c-lprimary, 10%);
  // background: $card-bg;

  border-radius: 2rem;
  position: relative;

  margin-right: 3rem;
  margin-bottom: 3rem;

  $card-items: darken(abs.$vars-c-lprimary, 20%);
  box-shadow: 0px 5px 10px abs.$vars-c-dprimary,
    0px 15px 30px rgba(abs.$vars-c-dprimary, 0.5);

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

  &-btn {
    &box {
      height: 3rem;
      width: 3rem;

      // $card-btn: darken(abs.$vars-c-lprimary,30%);
      // background: $card-btn;
      border-radius: 1rem;

      position: absolute;
      top: 3rem;
      right: 3rem;

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
    &--exit {
      height: 100%;
      width: 100%;

      background-image: url(./../assets/ccross.svg);
      mask: url(./../assets/ccross.svg);

      background-size: contain;
      background-repeat: no-repeat;

      mask-size: contain;
      mask-repeat: no-repeat;

      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        background: abs.$vars-c-lprimary;
      }
    }
  }

  &-img {
    &box {
      height: 24rem;
      width: inherit;
      border-radius: 2rem 2rem 0 0;
      overflow: hidden;

      // $imgbox: darken(abs.$vars-c-lprimary, 10%);
      // background: $imgbox;

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
    &-country {
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: left top;
    }
  }

  &-casebox {
    padding: 3rem;
    @include abs.mxs-respond(lphone) {
      // padding: 3rem 1.5rem;
    }
  }
  &-title {
    line-height: 145%;
    max-height: 7.5rem;

    overflow: hidden;
    margin-bottom: 3rem;
    @include abs.mxs-respond(lphone) {
      margin-left: 1.5rem;
    }
    @include abs.mxs-respond(pphone) {
      margin-left: 0;
    }
  }

  &-case {
    &block {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      @include abs.mxs-respond(lphone) {
        padding-left: 1.5rem;
      }
      @include abs.mxs-respond(pphone) {
        padding-left: 0;
      }
    }
    &group {
      min-width: 100%;
      flex: 1 0 auto;

      display: flex;
      align-items: center;

      margin-bottom: 1.5rem;
      @include abs.mxs-respond(lphone) {
        min-width: 20rem;
        margin-right: 1.5rem;
      }
      @include abs.mxs-respond(pphone) {
        min-width: 100%;
        margin-right: 0;
      }
    }
    &group:last-child {
      // margin-bottom: 0;
    }

    &icon {
      min-height: 5rem;
      min-width: 5rem;

      // background: $card-items;

      border-radius: 1rem;
      margin-right: 1.5rem;

      @include abs.mxs-respond(pphone) {
        min-height: 4rem;
        min-width: 4rem;
      }

      &--total {
        background-image: url(./../assets/ctotal.svg);
        mask: url(./../assets/ctotal.svg);
      }
      &--deaths {
        background-image: url(./../assets/cdeaths.svg);
        mask: url(./../assets/cdeaths.svg);
      }
      &--recovered {
        background-image: url(./../assets/crecovered.svg);
        mask: url(./../assets/crecovered.svg);
      }
      &--active {
        background-image: url(./../assets/cactive.svg);
        mask: url(./../assets/cactive.svg);
      }
    }
    &icon {
      background-size: contain;
      background-repeat: no-repeat;

      mask-size: contain;
      mask-repeat: no-repeat;
    }

    &info {
      &-title {
        $case-title: lighten(abs.$vars-c-dprimary, 20%);
        color: $case-title;
        font-family: tbold;
        text-transform: capitalize;

        @include abs.mxs-respond(pphone) {
          font-size: 1.3rem;
        }
      }
      &-value {
        font-family: tlight;

        @include abs.mxs-respond(pphone) {
          font-size: 1.6rem;
        }
      }
    }
  }
}
</style>
