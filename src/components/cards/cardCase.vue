<template>
  <div class="case-content case-content--block">
    <h4 class="case-content--title">
      <slot name="title">Cases Title</slot>
    </h4>

    <ul class="case--group">
      <slot name="deathsRow">
        <li class="case--row" ref="deaths">
          <span class="case-icon case-icon--deaths">&nbsp;</span>
          <div class="case--infogroup">
            <p class="case--title">Deaths</p>
            <p class="case--value">
              <slot name="deathsValue">
                {{ setDomValue(numberFormat(data.deaths), 56, 789) }}
              </slot>
            </p>
          </div>
        </li>
      </slot>
      <slot name="activeRow">
        <li class="case--row" ref="active">
          <span class="case-icon case-icon--active">&nbsp;</span>
          <div class="case--infogroup">
            <p class="case--title">Active</p>
            <p class="case--value">
              <slot name="activeValue">
                {{ setDomValue(numberFormat(data.active), 6, 789) }}
              </slot>
            </p>
          </div>
        </li>
      </slot>
      <slot name="recoveredRow">
        <li class="case--row" ref="recovered">
          <span class="case-icon case-icon--recovered">&nbsp;</span>
          <div class="case--infogroup">
            <p class="case--title">Recovered</p>
            <p class="case--value">
              <slot name="recoveredValue">
                {{ setDomValue(numberFormat(data.recovered), 56, 789) }}
              </slot>
            </p>
          </div>
        </li>
      </slot>
      <slot name="totalRow">
        <li class="case--row" ref="total">
          <span class="case-icon case-icon--total">&nbsp;</span>
          <div class="case--infogroup">
            <p class="case--title">Total Cases</p>
            <p class="case--value">
              <slot name="totalValue">
                {{ setDomValue(numberFormat(data.cases), 123, 456, 789) }}
              </slot>
            </p>
          </div>
        </li>
      </slot>
    </ul>
  </div>
</template>

<script>
import stringUtilities from "@/mixins/stringUtilities.vue";

export default {
  props: ["data"],
  mixins: [stringUtilities],
  methods: {
    setDomValue(val, defval) {
      if (!val) return defval;
      else return val;
    }
  }
};
</script>

<style scoped lang="scss">
@use "~@/sass/abstracts/abstracts" as abs;

.case-content {
  &--block {
    height: auto;
    width: 100%;
    min-width: 30rem;

    padding: 2rem;
    border-radius: 1rem;

    box-shadow: 0 2px 10px rgba(black, 0.8), 0px 8px 20px rgba(black, 0.5);
    $bg-block: lighten(abs.$vars-c-lprimary, 10%);
    background: $bg-block;

    position: relative;
    z-index: 50;
  }
  &--title {
    font-family: tbold;
    margin-bottom: 2rem;
  }
}

.case {
  &--group {
  }
  &--row {
    display: flex;
    padding: 5px 0rem;
  }

  &-icon {
    min-height: 3rem;
    min-width: 3rem;

    margin-right: 1rem;
    border-radius: 5px;

    // $icon: darken(abs.$vars-c-lprimary,10%);
    // background: $icon;

    &--deaths {
      background-image: url("~@/assets/covidicons/deaths@2x.png");
    }
    &--active {
      background-image: url("~@/assets/covidicons/active@2x.png");
    }
    &--recovered {
      background-image: url("~@/assets/covidicons/recovered@2x.png");
    }
    &--total {
      background-image: url("~@/assets/covidicons/total@2x.png");
    }
  }
  &-icon {
    @include abs.mxs-img-contain;
  }

  &--infogroup {
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    & > * {
      flex: 1 0 50%;
    }
  }
  &--title {
    font-family: tbold;
    color: abs.$vars-c-dprimary;
  }
  &--value {
    text-align: end;
  }
}
</style>
