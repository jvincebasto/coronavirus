<template>
  <div class="search search--group">

    <!-- Searchbar Group -->
    <div class="search-field--group">
      <input type="text" placeholder="Search your country" class="search--field" 
        @focus="searchFieldFocus()" @keyup.enter="searchFieldSubmit($event)" @keyup="searchFieldKeyup($event)" ref="searchField"/>
      <label :for="input.id" class="search-list--btn">
        <span class="search-list--icon">&nbsp;</span>
      </label>
    </div>


    <!-- Search Btn -->
    <div class="searchbtn" @click="submitEvent()" ref="searchBtn">
      <p class="searchbtn--title">Search</p>
    </div>


    <!-- Search List -->
    <slot name="optionlist" :input="input">
      List Component Here
    </slot>

  </div>


  <!-- Error List -->
  <slot name="errorlist">
    Error List Component Here
  </slot>


</template>

<script>
import stringUtilities from "@/mixins/stringUtilities.vue";
import { createNamespacedHelpers } from "vuex";
const { mapGetters: countryGetters, mapMutations: countryMutations, mapActions: countryActions } = createNamespacedHelpers("countrySearch");
const { mapState: covidState, mapMutations: covidMutations, mapActions: covidActions } = createNamespacedHelpers("covid");


export default {
  mixins: [stringUtilities],
  setup() {
    let input = {
      id: "list-toggle"
    }

    return {
      input
    }
  },
  computed: {
    ...covidState({
      countryNames: state => state.countryNames,
      countries: state => state.countries,
    }),
    ...countryGetters(["searchStates","validateCountryName","validateCountryNameList"]),
  },
  methods: {
    ...covidActions(["fetchCountry"]),
    ...covidMutations(["storeCountry"]),
    ...countryMutations(["stateObjs","stateItems","pushStateObjs","pushState","unshiftState","spliceState"]),
    ...countryActions(["searchInputValidation","searchRequestDuplicates","searchDataLimit","resetSearchStates"]),



    // Search Filter
    searchFilter(input) {
      let filtered = this.stringFilter(input);
      filtered = this.stringDuplicates(filtered);
      this.stateObjs({ inputs: { filtered } });

      return filtered
    },
    // Search Functions 
    async searchRequest(inputs) {
      try {
        const state = this.searchStates(["inputs","countries"]);
        let datalist = [];


        const commitData = function(input,data) {
          if(state.countries.length === 0) this.unshiftState({ prop: "countries", data });
          else {
            const match = state.countries.some((obj) => this.validateCountryName(obj,input,true));
            if(!match) this.unshiftState({ prop: "countries", data });
          }
        }.bind(this);


        for(const input of inputs) {
          let data;

          // Search if Request Already Exist
          const match = this.countries.find((obj) => this.validateCountryName(obj,input,obj));
          if(match) { 
            data = match;
            commitData(input,data);
          }
          else {
            // Send New Request
            data = await this.fetchCountry(input);
            if (!data.error) commitData(input,data);
            else {
              // this.pushState({ prop: "errors", data: { title: "Request Error:", content: await this.fetchCountry(input) } });
              throw new Error(data.error);
            }
          }

          // Push data to datalist
          datalist.push(await data);
        }

        return await datalist;
      } 
      catch (err) { 
        console.log("Request Error",err);
      }
    },
    async searchSubmit(input) {
      const state = this.searchStates(["inputs","countries"]);
      this.spliceState({ prop: "errors", data: 0 });
      this.stateObjs({ inputs: { input } });


      const filtered = this.searchFilter(input);
      this.searchInputValidation({ inputs: filtered, list: this.countryNames });
      this.searchRequestDuplicates(state.inputs.valid);
      this.searchDataLimit(state.inputs.passed);
      const data = await this.searchRequest(state.inputs.final);


      if(await data) {
        this.searchErrorList();
        this.resetSearchStates();
        for(const input of state.countries) this.disableListItem(input.country)
      }

      return await data;
    },


    // Search ErrorList
    searchErrorList() {
      const state = this.searchStates(["inputs"]);
      const erorFormat = function(list) {
        const last = list.length - 1;
        const inputs = list.filter((val,index) => index !== last);

        let string = inputs.join(", ");
        string += list.length === 1 ? list[last] : ` and ${list[last]}`;

        return string;
      }

      if(state.inputs.invalid.length > 0) {
        let error = erorFormat(state.inputs.invalid);
        error = `request for ${error} were not found, please try again`;
        this.pushState({ prop: "errors", data: { title: "Not Found:", content: error } });
      }
      if(state.inputs.duplicates.length > 0) {
        let error = erorFormat(state.inputs.duplicates);
        error = ` ${error} already exists`;
        this.pushState({ prop: "errors", data: { title: "Duplicates:", content: error } });
      }
      if(state.inputs.excess.length > 0) {
        let error = erorFormat(state.inputs.excess);
        error = `Limit of 10 exceeded, request for ${error} has been cancelled`;
        this.pushState({ prop: "errors", data: { title: "Excess:", content: error } });
      }
    },


    // Search Init
    setSearchEls() {
      this.stateObjs({ els: {
        searchBtn: this.$refs.searchBtn,
        searchField: this.$refs.searchField,
        }
      });
    },
    async searchInit() {
      const data = await this.searchSubmit("bt,ph,us,ad,al,kr");

      if(await data) {
        for(const cur of await data) {
          const value = cur.country.toLowerCase(); 
          if(this.countries.length === 0) this.storeCountry(await cur);
          else { 
            const match = this.countries.some((obj) => this.validateCountryName(obj,value,true));
            if(!match) this.storeCountry(await cur);
          }
        }
      }
    },



    // Enable List Item
    disableListItem(input) {
      const state = this.searchStates(["listItems"]);
      const value = input.toLowerCase();
      const match = state.listItems.find((obj) => this.validateCountryNameList(obj.data,value,obj));
      if(match) {
        match.refs.input.checked = true;
        match.refs.input.disabled = true;
      }
    },
    // List Filter
    resetFilter() {
      const state = this.searchStates(["listItems"])
      for(const item of state.listItems) {
        if(item.refs.input.checked) item.refs.input.checked = false;
      }
    },
    listFilter(input) {
      const state = this.searchStates(["listItems"])

      const word = this.stringFilter(input);
      const list = state.listItems;

      for (const item of list) {
        const el = item.el;
        const elContent = el.textContent.toLowerCase();

        for (const letter of word) {
          if(word === "") el.style.display = "";
          else el.style.display = elContent.indexOf(letter) > -1 ? "" : "none";
        }
      }
    },



    // Search Events
    submitEvent() {
      const state = this.searchStates(["countries","inputs","els"]);
      this.spliceState({ prop: "errors", data: 0 });

      if(state.countries.length <= state.inputs.limit) {
        const input = this.$refs.searchField.value;
        this.searchSubmit(input);
      }
      else {
        const error = "total of 10 request only, remove cards in order to add again";
        this.pushState({ prop: "errors", data: { title: "Limit Exceeded:", content: error } });
      }
      this.resetFilter();
      state.els.searchListBtn.checked = false;
      this.$refs.searchField.value = "";
      this.$refs.searchField.autofocus = true;
    },
    // searchFieldFocus
    searchFieldFocus() {
      const state = this.searchStates(["els","errors"]);
      state.els.searchListBtn.checked = true;
    },
    // searchFieldKeyup
    searchFieldKeyup(event) {
      if (event.isComposing || event.keyCode === 229) return;
      else this.listFilter(event.target.value.toLowerCase());
    },
    // searchFieldSubmit
    searchFieldSubmit(event) {
      // if (event.code === "Enter" || event.key === "Enter" || event.keyCode === 13 || event.which === 13) {
        event.target.blur();
        this.submitEvent();
      // }
    },

  },
  beforeMount() {
    this.stateObjs({ els: {
      searchBtn: null,
      searchField: null,
      } 
    });
  },
  mounted() {
    this.setSearchEls();
    this.searchInit();
  }
};
</script>

<style scoped lang="scss">
@use "~@/sass/abstracts/abstracts" as abs;

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
}



// Search Field Group
.search {
  &-field {
    &--group {
      height: 100%;
      width: 100%;

      display: flex;

      background: rgba(255, 255, 255, 0.8);
      border-top-left-radius: inherit;
      border-bottom-left-radius: inherit;

      overflow: hidden;

      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.8), 0px 5px 8px rgba(0, 0, 0, 0.5);
    }
  }
}


// Search Btn
.searchbtn {
  height: 100%;
  padding: 0rem 2rem;
  margin-left: 1rem;

  $section-bg: lighten(abs.$vars-c-lprimary, 10%);
  background: $section-bg;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: inherit;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.8), 0px 5px 8px rgba(0, 0, 0, 0.5);

  transition: all .3s ease-in-out;

  &--title {
    color: abs.$vars-c-dprimary;
    font-family: tbold;

    transition: all .3s ease-in-out;
  }

  &:hover {
    background: abs.$vars-c-dprimary;
  }
  &:hover &--title {
    color: abs.$vars-c-lprimary;
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

      transition: all .3s ease-in-out;

      &:hover {
        background: abs.$vars-c-dprimary;
      }
    }
    &--icon {
      width: 15px;
      height: 15px;

      transition: all .3s ease-in-out;

      @supports(mask-image: url("~@/assets/icons/arrow-2.svg")) {
        mask-image: url("~@/assets/icons/arrow-2.svg");
        @include abs.mxs-svg-contain;
        mask-position: center;   
      }

      background-image: url("~@/assets/icons/arrow-2@2x.png");
      @include abs.mxs-img-contain;
      background-position: center;

      transform: rotateZ(90deg);
    }

    &--btn:hover &--icon {
      background: abs.$vars-c-lprimary;
    }
  }

}

</style>
