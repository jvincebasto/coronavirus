<template>

  <div class="countrylist countrylist--container" ref="container">
    <template v-for="(obj, index) in countryNames" :key="index">

      <div class="countrylist-item" :ref="el=>listEl(el,obj)"
        :class="`${propName('countrylist-item--',obj.iso2,obj.country)}`">

        <input type="checkbox" class="countrylist--checkbox" :value="obj.country"
          :id="`${propName('item--',obj.iso2,obj.country)}`" @click="listItemToggle($event)" ref="input"/>
        <label :for="`${propName('item--',obj.iso2,obj.country)}`" 
          class="countrylist--label" ref="label">
          {{`${obj.country} (${nullCheck(obj.iso2)})`}}
        </label>
      </div>

    </template>    
  </div>

</template>

<script>
import stringUtilities from "@/mixins/stringUtilities.vue";
import { reactive, onBeforeUpdate } from "vue";
import { createNamespacedHelpers } from "vuex";
const { mapState: covidState } = createNamespacedHelpers("covid");
const { mapGetters: countryGetters, mapMutations: countryMutations } = createNamespacedHelpers("countrySearch");



export default {
  mixins: [stringUtilities],
  setup() {
    let listItems = reactive([]);

    onBeforeUpdate(() => {
      listItems = [];
    });

    return {
      listItems
    };
  },
  computed: {
    ...covidState({
      countryNames: state => state.countryNames,
    }),

    ...countryGetters(["searchStates","validateCountryNameList"]),
  },
  methods: {
    ...countryMutations(["stateObjs","pushState"]),



    // List Items
    listEl(el, obj) {
      if (el) {
        this.listItems.push({ data: obj, el });
        this.pushState({ prop: "listItems", data: { data: obj, el } });
      }
    },




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
    }
  },
};
</script>

<style scoped lang="scss">
@use "~@/sass/abstracts/abstracts" as abs;

.countrylist {
  &--container {
    height: 100%;
    max-height: 30rem;
    width: 100%;
    overflow-y: scroll; 
  }
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
