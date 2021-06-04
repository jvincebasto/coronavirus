<template>
  <div class="case-content case-content--block">
    <h6 class="case-content--title">
      <slot name="title">Cases Title</slot>
    </h6>

    <ul class="case--group">
      <slot name="deathsRow">
        <li class="case--row" ref="deaths">
          <!-- <span class="caseicon caseicon--deaths">&nbsp;</span> -->
          <div class="case--infogroup">
            <p class="case--title">Deaths</p>
            <p class="case--value" ref="deathsValue">
              <slot name="deathsValue">
                {{ setDomValue(numberFormat(data.deaths), "56, 789") }}
              </slot>
            </p>
          </div>
        </li>
      </slot>
      <slot name="activeRow">
        <li class="case--row" ref="active">
          <!-- <span class="caseicon caseicon--active">&nbsp;</span> -->
          <div class="case--infogroup">
            <p class="case--title">Active</p>
            <p class="case--value" ref="activeValue">
              <slot name="activeValue">
                {{ setDomValue(numberFormat(data.active), "6,789") }}
              </slot>
            </p>
          </div>
        </li>
      </slot>
      <slot name="recoveredRow">
        <li class="case--row" ref="recovered">
          <!-- <span class="caseicon caseicon--recovered">&nbsp;</span> -->
          <div class="case--infogroup">
            <p class="case--title">Recovered</p>
            <p class="case--value" ref="recoveredValue">
              <slot name="recoveredValue">
                {{ setDomValue(numberFormat(data.recovered), "56,789") }}
              </slot>
            </p>
          </div>
        </li>
      </slot>
      <slot name="totalRow">
        <li class="case--row" ref="total">
          <!-- <span class="caseicon caseicon--total">&nbsp;</span> -->
          <div class="case--infogroup">
            <p class="case--title">Total Cases</p>
            <p class="case--value" ref="totalValue">
              <slot name="totalValue">
                {{ setDomValue(numberFormat(data.cases), "123,456,789") }}
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
  props: ["data","options"],
  mixins: [stringUtilities],
  methods: {
    setDomValue(val, defval) {
      if (!val && this.options.numberFormat) return defval;
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
    height: 100%;
    width: 100%;
    min-width: 30rem;

    padding: 2rem;
    border-radius: 1rem;

    box-shadow: abs.$vars-box-shadow;
    background: inherit;
  }
  &--title {
    @include abs.mxs-font-type(subtitle1);
    margin-bottom: 2rem;
  }
}

.case {
  &--row {
    display: flex;
    padding: 5px 0rem;
  }
  &--infogroup {
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    & > * {
      flex: 1 0 50%;
      @include abs.mxs-font-type(body1);
    }
  }
  &--value {
    text-align: end;
  }
}



// case icon
.caseicon {
  min-height: 3rem;
  min-width: 3rem;

  margin-right: 1rem;
  border-radius: 1rem;

  @include abs.mxs-img-contain;

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
</style>
