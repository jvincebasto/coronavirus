<template>
  <div class="option-item">
    <input
      type="checkbox"
      class="option-input"
      :id="`${attribute(data.iso2)}`"
      :value="data.country"
      ref="input"
    />
    <label class="option-label" :for="`${attribute(data.iso2)}`" ref="label">{{
      `${data.country} ${string(data.iso2)}`
    }}</label>
  </div>
</template>

<script>
import stringUtilities from "@/mixins/stringUtilities.vue";

export default {
  props: ["data"],
  mixins: [stringUtilities],
  methods: {
    attribute(value) {
      let newValue = "";
      if (value !== "null") newValue = `opt-${value}`;
      else newValue = `opt-${this.data.country}`;
      return newValue;
    },
    string(value) {
      let newValue = "";
      if (value !== "null") newValue = `(${value})`;
      else newValue = "";

      return newValue;
    },
    toggleChecked(input, value) {
      if (input.length === 0) input += `${value}`;
      else if (input.length > 0) {
        let bool = false;

        for (const cur of input) {
          if (cur.toLowerCase() === value.toLowerCase()) {
            bool = true;
            break;
          }
        }
        input += bool ? `` : `, ${value}`;
      }

      return input;
    },
    toggleUnchecked(filtered) {
      let join = ``;
      for (const [index, input] of filtered.entries()) {
        join += parseInt(index) === 0 ? `${input}` : `, ${input}`;
      }
      return join;
    },
    optionToggle(event) {
      const optContainer = this.$parent.$refs.optionContainer;
      optContainer.style.maxHeight = "30rem";

      const value = event.target.value;
      const bool = event.target.checked;

      const field = this.$parent.$refs.field;
      const input = field.value;

      let filtered = this.stringFilter(input);
      filtered = this.stringDuplicates(filtered);

      if (bool) {
        filtered = this.stringValid(filtered, true, true);
        filtered = this.stringFormatArray(filtered);
        field.value = this.toggleChecked(filtered, value);
      } else {
        filtered = filtered.filter(
          newValue => newValue !== value.toLowerCase()
        );
        filtered = this.stringValid(filtered, true, true);
        filtered = this.stringFormatArray(filtered);
        field.value = this.toggleUnchecked(filtered);
      }
    }

    // optionEvent(event) {
    //   let field = this.$refs.search.$refs.field;
    //   let input = this.inputFilter(field.value);
    //   let limit = 10;

    //   if(input.length < limit || this.domCards.length < limit) this.optionFunction(event);
    //   else console.log(`maximum of ${limit} options`);
    // },
  },
  mounted() {
    this.$refs.input.onclick = this.optionToggle;
  }
};
</script>

<style scoped lang="scss">
@use "~@/sass/abstracts/abstracts" as abs;

.option {
  &-item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(abs.$vars-c-black, 0.2);
  }
  &-input {
    height: 2rem;
    width: 2rem;

    position: absolute;
    right: 5%;
  }
  &-label {
    display: block;
    width: 100%;
    height: 100%;

    font-size: 1.6rem;
    font-family: tbody;

    padding: 1.5rem;
    padding-left: 3rem;
    cursor: pointer;
  }
}
</style>
