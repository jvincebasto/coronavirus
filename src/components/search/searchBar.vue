<template>
  <div class="search search--group">
    <!-- Searchbar Group -->
    <div class="search-field--group">
      <input
        type="text"
        placeholder="Search your country"
        class="search--field"
        @focus="searchFieldFocus()"
        @keyup.enter="searchFieldSubmit($event), searchListBlur()"
        @keyup="searchFieldKeyup($event)"
        ref="searchField"
      />
      <label :for="input.id" class="search-list--btn">
        <span class="search-list--icon">&nbsp;</span>
      </label>
    </div>

    <!-- Search Btn -->
    <div
      class="searchbtn"
      @click="submitEvent(), searchListBlur()"
      ref="searchBtn"
    >
      <p class="searchbtn--title">Search</p>
    </div>
  </div>

  <!-- Search List -->
  <slot name="optionlist" :input="input"> List Component Here </slot>

  <!-- Error List -->
  <slot name="errorlist"> Error List Component Here </slot>
</template>

<script>
import stringUtilities from "@/mixins/stringUtilities.vue";
import { gsap } from "gsap";
import { createNamespacedHelpers } from "vuex";
const {
  mapGetters: countryGetters,
  mapMutations: countryMutations,
  mapActions: countryActions,
} = createNamespacedHelpers("countrySearch");
const {
  mapState: covidState,
  mapMutations: covidMutations,
  mapActions: covidActions,
} = createNamespacedHelpers("covid");

export default {
  mixins: [stringUtilities],
  setup() {
    let input = {
      id: "list-toggle",
    };

    return {
      input,
    };
  },
  computed: {
    ...covidState({
      countryNames: (state) => state.countryNames,
      countries: (state) => state.countries,
    }),
    ...countryGetters([
      "searchStates",
      "validateCountryName",
      "validateCountryNameList",
    ]),
  },
  methods: {
    ...covidActions(["fetchCountry"]),
    ...covidMutations(["storeCountry"]),
    ...countryMutations([
      "stateObjs",
      "stateItems",
      "pushStateObjs",
      "pushState",
      "unshiftState",
      "spliceState",
    ]),
    ...countryActions([
      "searchInputValidation",
      "searchRequestDuplicates",
      "searchDataLimit",
      "resetSearchStates",
      "searchErrors",
    ]),

    // Search Filter
    searchFilter(input) {
      let filtered = this.stringFilter(input);
      filtered = this.stringDuplicates(filtered);
      this.stateObjs({ inputs: { filtered } });

      return filtered;
    },
    // Search Functions
    async searchRequest(inputs) {
      try {
        const state = this.searchStates(["inputs", "countries"]);
        let datalist = [];

        const commitData = function (input, data) {
          if (state.countries.length === 0)
            this.unshiftState({ prop: "countries", data });
          else {
            const match = state.countries.some((obj) =>
              this.validateCountryName(obj, input, true)
            );
            if (!match) this.unshiftState({ prop: "countries", data });
          }
        }.bind(this);

        for (const input of inputs) {
          let data;

          // Search if Request Already Exist
          const match = this.countries.find((obj) =>
            this.validateCountryName(obj, input, obj)
          );
          if (match) {
            data = match;
            commitData(input, data);
          } else {
            // Send New Request
            data = await this.fetchCountry(input);
            if (!data.error) commitData(input, data);
            else {
              // this.pushState({ prop: "errors", data: { title: "Request Error:", content: await this.fetchCountry(input) } });
              throw new Error(data.error);
            }
          }

          // Push data to datalist
          datalist.push(await data);
        }

        return await datalist;
      } catch (err) {
        console.log("Request Error", err);
      }
    },
    async searchSubmit(input) {
      const state = this.searchStates(["inputs", "countries"]);
      this.spliceState({ prop: "errors", data: 0 });
      this.stateObjs({ inputs: { input } });

      const filtered = this.searchFilter(input);
      this.searchInputValidation({ inputs: filtered, list: this.countryNames });
      this.searchRequestDuplicates(state.inputs.valid);
      this.searchDataLimit(state.inputs.passed);
      const data = await this.searchRequest(state.inputs.final);
      for (const input of state.countries) this.disableListItem(input.country);

      if (await data) {
        this.searchErrors(this.stringCapitalizeLoop);
        this.resetSearchStates();
      }

      return await data;
    },

    // Search Init
    setSearchEls() {
      this.stateObjs({
        els: {
          searchBtn: this.$refs.searchBtn,
          searchField: this.$refs.searchField,
        },
      });
    },
    async searchInit() {
      const data = await this.searchSubmit("bt,ph,us,ad,al,kr");

      if (await data) {
        for (const cur of await data) {
          const value = cur.country.toLowerCase();
          if (this.countries.length === 0) this.storeCountry(await cur);
          else {
            const match = this.countries.some((obj) =>
              this.validateCountryName(obj, value, true)
            );
            if (!match) this.storeCountry(await cur);
          }
        }

        const state = this.searchStates(["countries", "inputs", "els"]);
        this.resetFilter();
        for (const input of state.countries)
          this.disableListItem(input.country);
      }
    },

    // Enable List Item
    disableListItem(input) {
      const state = this.searchStates(["listItems"]);
      const value = input.toLowerCase();
      const match = state.listItems.find((obj) =>
        this.validateCountryNameList(obj.data, value, obj)
      );
      if (match) {
        match.refs.input.checked = true;
        match.refs.input.disabled = true;
      }
    },
    // List Filter
    resetFilter() {
      const state = this.searchStates(["listItems"]);
      for (const item of state.listItems) {
        if (item.refs.input.checked) item.refs.input.checked = false;
      }
    },
    listFilter(input) {
      const state = this.searchStates(["listItems"]);

      const word = this.stringFilter(input);
      const list = state.listItems;

      for (const item of list) {
        const el = item.el;
        const elContent = el.textContent.toLowerCase();

        for (const letter of word) {
          if (word === "") el.style.display = "";
          else el.style.display = elContent.indexOf(letter) > -1 ? "" : "none";
        }
      }
    },

    // Search Events
    submitEvent() {
      const state = this.searchStates(["countries", "inputs", "els"]);
      this.spliceState({ prop: "errors", data: 0 });
      const input = this.$refs.searchField.value;

      if (input === "" || input === " ") {
        const error = "Search input must not be empty";
        this.pushState({
          prop: "errors",
          data: { title: "Empty Field:", content: error },
        });
      } else if (
        (state.countries.length <= state.inputs.limit && input !== "") ||
        input !== " "
      ) {
        this.searchSubmit(input);
      } else {
        const error = `Total of ${state.inputs.limit} request only, remove cards and try again`;
        this.pushState({
          prop: "errors",
          data: { title: "Limit Exceeded:", content: error },
        });
      }

      // resets component states
      this.resetFilter();
      for (const input of state.countries) this.disableListItem(input.country);

      state.els.searchListBtn.checked = false;
      this.$refs.searchField.value = "";
      this.$refs.searchField.autofocus = true;
    },

    // Search List Events
    searchListBlur() {
      const state = this.searchStates(["els"]);
      state.els.searchListBtn.checked = false;

      const animate = gsap.timeline();
      const duration = 0.2;
      animate.to(state.els.searchList, { y: 20, duration }, "<");
      animate.to(state.els.searchList, { opacity: 0, duration: 0.4 }, "<");
      animate.to(state.els.searchList, { display: "none", duration: 0 }, ">");
    },

    // Search Field Events
    searchFieldFocus() {
      const state = this.searchStates(["els"]);
      state.els.searchListBtn.checked = true;

      const animate = gsap.timeline();
      const duration = 0.2;
      animate.to(state.els.searchList, { display: "block", duration: 0 });
      animate.to(state.els.searchList, { opacity: 1, duration: 0.3 }, ">");
      animate.to(state.els.searchList, { y: 80, duration }, "<");
    },
    searchFieldKeyup(event) {
      // if (event.isComposing || event.keyCode === 229) return;
      // else this.listFilter(event.target.value.toLowerCase());
      this.listFilter(event.target.value.toLowerCase());
    },
    searchFieldSubmit(event) {
      // if (event.code === "Enter" || event.key === "Enter" || event.keyCode === 13 || event.which === 13) {
      event.target.blur();
      this.submitEvent();
      // }
    },
  },
  beforeMount() {
    this.stateObjs({
      els: {
        searchBtn: null,
        searchField: null,
      },
    });
  },
  mounted() {
    this.setSearchEls();
    this.searchInit();
  },
};
</script>

<style scoped lang="scss">
@use "~@/sass/styles" as styles;

@include styles.mxs-themes(light) {
  .search {
    &-field {
      &--group {
        background: styles.fns-lighten(var(--c-lprimary), 6);
        // background: var(--sc-defwhite);
        box-shadow: styles.$vars-box-shadow;
      }
    }
  }
  .searchbtn {
    background: styles.fns-lighten(var(--c-lprimary), 6);
    // background: styles.fns-darken(var(--c-white), 4);
    box-shadow: styles.$vars-box-shadow;
    &--title {
      color: var(--c-dprimary);
    }
    &:hover {
      background: var(--c-black);
    }
    &:hover .searchbtn--title {
      color: var(--c-lprimary);
    }
  }
  .search {
    &-list {
      &--btn {
        background: styles.fns-darken(var(--c-white), 4);
        &:hover {
          background: var(--c-black);
        }
      }
      &--icon {
        @supports (mask-image: url("~@/assets/icons/arrow-2.svg")) {
          mask-image: url("~@/assets/icons/arrow-2.svg");
          @include styles.mxs-svg-contain;
          mask-position: center;
        }
        background: url("~@/assets/icons/arrow-2@2x.png");
      }
      &--icon {
        @include styles.mxs-img-contain;
        background-position: center;
        background: var(--c-dprimary);
      }
      &--btn:hover .search-list--icon {
        background: var(--c-lprimary);
      }
    }
  }
}

@include styles.mxs-themes(dark) {
  .searchbtn {
    background: var(--c-white);
    &:hover {
      background: var(--c-dprimary);
    }
    &:hover .searchbtn--title {
      color: var(--c-white);
    }
  }
  .search {
    &-list {
      &--btn {
        background: var(--c-white);
        &:hover {
          background: var(--c-dprimary);
        }
      }
      &--icon {
        background: var(--c-dprimary);
      }
      &--btn:hover .search-list--icon {
        background: var(--c-lprimary);
      }
    }
  }
}

@include styles.mxs-colorThemes("brown", light) {
  .search {
    &-field {
      &--group {
        background: styles.fns-lighten(var(--c-lprimary), 10);
      }
    }
  }
  .searchbtn {
    background: styles.fns-lighten(var(--c-lprimary), 10);

    &:hover {
      background: var(--c-black);
    }
    &:hover .searchbtn--title {
      color: var(--c-lprimary);
    }
  }
}

@include styles.mxs-colorThemes("brown", dark) {
  .search {
    &-field {
      &--group {
        background: var(--c-white);
      }
    }
  }
  .searchbtn {
    background: var(--c-white);

    &:hover {
      background: var(--c-dprimary);
    }
    &:hover .searchbtn--title {
      color: var(--c-lprimary);
    }
  }
}
</style>

<style scoped lang="scss">
@use "~@/sass/styles" as styles;

// Search Group and Field
.search {
  &--group {
    height: 4rem;
    width: 100%;

    border-radius: 1rem;
    margin-bottom: 3rem;

    display: flex;
    align-items: center;
    justify-content: space-between;

    position: relative;
    z-index: 20;
  }
  &--field {
    height: 100%;
    width: 100%;
    flex-grow: 1;

    text-indent: 2rem;
    font-size: 1.6rem;
    border: 0;

    @include styles.mxs-respond(pphone) {
      flex-shrink: 1;
    }

    &::placeholder {
      @include styles.mxs-font-size(body2);
      transition: all 0.3s ease-in-out;
    }
    &:focus::placeholder {
      color: black;
      @include styles.mxs-font-size(body1);
    }
  }
}

// Search Field Group
.search {
  &-field {
    &--group {
      height: 100%;
      width: 100%;
      display: flex;

      border-top-left-radius: inherit;
      border-bottom-left-radius: inherit;
      overflow: hidden;
    }
  }
}

// Search Btn
.searchbtn {
  height: 100%;
  padding: 0rem 2rem;
  margin-left: 1rem;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: inherit;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  transition: all 0.3s ease-in-out;

  &--title {
    font-family: tsemibold;
    @include styles.mxs-font-size(btn);

    transition: all 0.3s ease-in-out;
  }
}

// Searchlist Btn
.search {
  &-list {
    &--btn {
      width: 6rem;
      height: 100%;
      cursor: pointer;

      display: flex;
      justify-content: center;
      align-items: center;

      transition: all 0.3s ease-in-out;
    }
    &--icon {
      width: 15px;
      height: 15px;

      transform: rotateZ(90deg);
      transition: all 0.3s ease-in-out;
    }
  }
}
</style>
