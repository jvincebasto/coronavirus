<template>
  <div class="countrylist-item"
    :class="`${propName('countrylist-item--',data.iso2,data.country)}`">

    <input type="checkbox" class="countrylist--checkbox" :value="data.country"
      :id="`${propName('item--',data.iso2,data.country)}`" @click="listItemToggle($event)" ref="input"/>
    <label :for="`${propName('item--',data.iso2,data.country)}`" 
      class="countrylist--label" ref="label">
      {{`${data.country} (${nullCheck(data.iso2)})`}}
    </label>
  </div>
</template>

<script>
import stringUtilities from "@/mixins/stringUtilities.vue";
import { createNamespacedHelpers } from "vuex";
const { mapState: covidState } = createNamespacedHelpers("covid");
const { mapGetters: countryGetters, mapMutations: countryMutations } = createNamespacedHelpers("countrySearch");



export default {
  props: ["data"],
  mixins: [stringUtilities],
  computed: {
    ...covidState({
      countryNames: state => state.countryNames,
    }),

    ...countryGetters(["searchStates","validateCountryNameList"]),
  },
  methods: {
    ...countryMutations(["pushState"]),


    // Props
    nullCheck(value,nullValue = "") {
      if(value !== "null") return value;
      else return nullValue
    },
    propName(prefix,value,nullValue = ""){
      return `${prefix}${this.nullCheck(value,nullValue)}`
    },



    // ListItem Event
    checkedInputItem(inputs, value) {
      let filtered = "";

      filtered = inputs.join(", ");
      if(!inputs.includes(value)) {
        filtered += inputs.length > 0
          ? `, ${this.stringCapitalize(value)}`
          : this.stringCapitalize(value);
      }

      return filtered;
    },
    uncheckedInputItem(inputs, value) {
      const valueLower = value.toLowerCase();
      const filtered = inputs.filter((value) => value.toLowerCase() !== valueLower);

      return filtered.join(", ");
    },
    listInputValidation(inputs) {
      let valid = [];

      for(const input of inputs) {
        const value = input.toLowerCase();
        const match = this.countryNames.find((obj) => this.validateCountryNameList(obj,value,obj));
        if(match) valid.push(match.country);
      }
      return valid;
    },
    listItemToggle(event) {
      const state = this.searchStates(["els"]);
      const toggleValue = event.target.value;
      const toggleState = event.target.checked;

      const field = state.els.searchField;
      const fieldValue = field.value.toLowerCase();

      let filtered = this.stringFilter(fieldValue);
      filtered = this.stringDuplicates(filtered);
      filtered = this.listInputValidation(filtered);
      filtered = this.stringCapitalizeLoop(filtered);

      if(toggleState) field.value = this.checkedInputItem(filtered,toggleValue)
      else field.value = this.uncheckedInputItem(filtered,toggleValue)
    },
  },
};
</script>

<style scoped lang="scss">
@use "~@/sass/abstracts/abstracts" as abs;

.countrylist {
  &-item {
    display: flex;
    align-items: center;
    border-bottom: 2px solid rgba(black, 0.1);

    position: relative;
  }
  &--checkbox {
    height: 2rem;
    width: 2rem;

    position: absolute;
    right: 2rem;
  }
  &--label {
    display: block;
    width: 100%;
    height: 100%;

    font-size: 1.6rem;
    font-family: tbody;

    padding: 1.5rem;
    padding-left: 2rem;
    cursor: pointer;
  }
}
</style>
