<template>
  <div class="search">
    <input
      class="search-field"
      type="text"
      placeholder="Search your country"
      ref="field"
    />
    <div class="search-btn" ref="btn">
      <p class="search-btn--title">Search</p>
    </div>
  </div>

  <div class="option option-container" ref="optionContainer">
    <search-list
      v-for="(obj, index) in countryNames"
      :key="index"
      :ref="
        el => {
          optionEls(el, obj);
        }
      "
      :data="obj"
    ></search-list>
  </div>
</template>

<script>
import searchList from "@/components/search/searchList.vue";
import stringUtilities from "@/mixins/stringUtilities.vue";

import { ref, reactive, onBeforeUpdate } from "vue";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters, mapActions } = createNamespacedHelpers("cards");
const {
  mapState: covidState,
  mapActions: covidActions
} = createNamespacedHelpers("covid");

export default {
  mixins: [stringUtilities],
  components: {
    searchList
  },
  setup() {
    let optionRefs = reactive({});
    onBeforeUpdate(() => {
      optionRefs = {};
    });

    return {
      optionRefs
    };
  },
  methods: {
    optionEls(el, obj) {
      if (el) {
        if (obj.iso2 !== "null") this.optionRefs[obj.iso2] = el;
        else this.optionRefs[obj.country] = el;
      }
    },
    ...mapActions(["cardData"]),
    ...covidActions(["fetchCountry", "getCountryData"]),

    async inputResponse(input) {
      try {
        let data;
        const match = await this.getCountryData(input);
        if (!match.result) {
          data = { ...match };
          data.countryInfo = { ...data.countryInfo };
          this.cardData(await ref(data));
        } else {
          data = await this.fetchCountry(input);
          if (!data.error) this.cardData(await ref(data));
          else throw new Error(data.error);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async inputRequest(input, limit) {
      for (const cur in input) {
        const cardLength = this.cards.cardList.length;
        const value = input[cur].toLowerCase();

        if (cardLength === 0) this.inputResponse(value);
        else if (cardLength < limit) {
          const bool = this.nameCheck({ stateProp: "cardList", value });
          if (!bool) this.inputResponse(value);
        }
      }
    },
    async inputRequestLimit(input, limit = 10) {
      if (this.cards.cardList.length < limit) this.inputRequest(input, limit);
      else console.log(`maximum of ${limit}`);
    },
    async inputResults(input) {
      let filtered = this.stringFilter(input);
      filtered = this.stringDuplicates(filtered);
      this.inputRequestLimit(filtered);
    },

    //

    async searchResults(input = "us,ph,af", focus = false) {
      const field = this.$refs.field;
      this.inputResults(input);
      field.value = "";
      field.autofocus = focus;
    },
    optionReset() {
      const container = this.optionRefs;
      for (const cur in container) container[cur].$refs.input.checked = false;
    },
    searchSubmit() {
      this.$refs.optionContainer.style.maxHeight = 0;
      const field = this.$refs.field;
      const input = field.value;
      this.searchResults(input, true);
      this.optionReset();
    },

    //

    searchFilter(input) {
      const values = this.stringFilter(input);
      const container = this.optionRefs;

      for (const cur in container) {
        const option = container[cur].$el;
        const label = container[cur].$refs.label;
        const text = label.textContent || label.innerText;

        for (const value of values) {
          option.style.display =
            text.toLowerCase().indexOf(value) > -1 ? "" : "none";
        }
      }
    },
    searchEvents() {
      const searchBtn = this.$refs.btn;
      const searchField = this.$refs.field;
      const options = this.$refs.optionContainer;

      const searchSubmit = this.searchSubmit;
      const searchFilter = this.searchFilter;

      searchBtn.onclick = this.searchSubmit;
      searchField.onkeyup = function(event) {
        if (event.isComposing) return;
        else searchFilter(event.target.value.toLowerCase());

        if (event.code === "Enter" || event.keycode === "Enter") {
          searchSubmit();
          searchField.value = "";
          searchField.autofocus = true;
        }
      };

      searchField.onblur = function() {
        options.style.maxHeight = 0;
      };
      searchField.onfocus = function() {
        options.style.maxHeight = "30rem";
      };
    }
  },
  computed: {
    ...mapState({
      cards: state => state
    }),
    ...mapGetters(["nameCheck"]),
    ...covidState({
      countryNames: state => state.countryNames
    })
  },
  mounted() {
    this.searchEvents();
    this.searchResults("bt,ph,us,ad,al,kr", false);
  }
};
</script>

<style scoped lang="scss">
@use "~@/sass/abstracts/abstracts" as abs;

.option {
  &-container {
    max-height: 0rem;
    height: auto;
    width: 100%;

    $section-bg: lighten(abs.$vars-c-lprimary, 10%);
    background: $section-bg;

    margin-top: 3rem;
    border-radius: 1rem;
    box-shadow: 0px 0px 5px rgba(black, 0.8), 0px 5px 8px rgba(black, 0.5);

    position: absolute;
    z-index: 200;
    overflow-y: scroll;

    transition: all 0.2s ease-in-out;
  }
}

.search {
  height: 4rem;
  width: 100%;


  background: rgba(white,.8);
  border-radius: 1rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  overflow: hidden;

  box-shadow: 0px 0px 5px rgba(black, 0.8), 0px 5px 8px rgba(black, 0.5);

  &-field {
    height: 90%;
    width: 100%;
    flex-grow: 1;

    background: transparent;
    border: 0;

    margin-left: 3rem;
    margin-right: 1rem;
    font-size: 1.6rem;

    position: relative;
    z-index: 10;

    @include abs.mxs-respond(pphone) {
      flex-shrink: 1;
    }

    &::placeholder {
      color: abs.$vars-c-dprimary;
      font-size: 1.4rem;

      transition: all .3s ease-in-out;
    }
    &:focus::placeholder {
      color: black;
      font-size: 1.6rem;
    }
  }
  &-btn {
    height: 100%;

    $section-bg: lighten(abs.$vars-c-lprimary, 10%);
    background: $section-bg;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    padding: 0rem 2rem;

    border-left: 2px solid rgba(black,.6);

    &--title {
      color: abs.$vars-c-dprimary;
      font-family: tbold;
    }
  }
}
</style>
