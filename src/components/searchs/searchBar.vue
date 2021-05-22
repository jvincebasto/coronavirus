<template>
  <div class="search search--group">

    <input type="checkbox" id="list-toggle" class="search-list--checkbox" ref="searchListBtn"/>


    <div class="search-field--group">
      <input type="text" placeholder="Search your country" class="search--field" ref="searchField"/>
      <label for="list-toggle" class="search-list--btn">
        <span class="search-list--icon">&nbsp;</span>
      </label>
    </div>


    <div class="searchbtn" ref="searchBtn">
      <p class="searchbtn--title">Search</p>
    </div>


    <div class="search-list--container" ref="searchList">
      <div class="search-list--block">&nbsp;</div>
      <slot name="component">
        Component Here
      </slot>
    </div>
  </div>

  <div class="search-errors">
    <template v-for="(obj, index) in errors" :key="index">
      <div class="search--errorgroup" :ref="`error--${obj.title}`">      
        <p class="search--error-title">{{ obj.title }}</p>
        <p class="search--error-content">{{ obj.content }}</p>
      </div>
    </template>
  </div>

</template>

<script>
import stringUtilities from "@/mixins/stringUtilities.vue";
import { createNamespacedHelpers } from "vuex";
const { mapState: countryState, mapGetters: countryGetters, mapMutations: countryMutations, mapActions: countryActions } = createNamespacedHelpers("countrySearch");
const { mapState: covidState, mapMutations: covidMutations, mapActions: covidActions } = createNamespacedHelpers("covid");


export default {
  mixins: [stringUtilities],
  computed: {
    ...covidState({
      countryNames: state => state.countryNames,
      countries: state => state.countries,
    }),
    ...countryState({
      errors: state => state.errors,
    }),
    ...countryGetters(["searchStates","validateCountryName"]),
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


        for(const input of inputs) {
          let data;


          // Logic
          // Search if Request Already Exist
          const match = this.countries.find((obj) => this.validateCountryName(obj,input,obj));
          if(match) { 
            data = match;

            if(state.countries.length === 0) this.unshiftState({ prop: "countries", data });
            else {
              const match = state.countries.some((obj) => this.validateCountryName(obj,input,true));
              if(!match) this.unshiftState({ prop: "countries", data });
            }
          }
          else {
            // Send Request
            data = await this.fetchCountry(input);

            if (!data.error) {
              if(state.countries.length === 0) this.unshiftState({ prop: "countries", data });
              else {
                const match = state.countries.some((obj) => this.validateCountryName(obj,input,true));
                if(!match) this.unshiftState({ prop: "countries", data });
              }
            }
            else throw new Error(data.error);
          }


          // Push data to datalist
          datalist.push(await data);
        }

        return await datalist;
      } 
      catch (err) { 
        console.log(err);
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
      const els = {
        searchBtn: this.$refs.searchBtn,
        searchField: this.$refs.searchField,
        searchList: this.$refs.searchList,
        searchListBtn: this.$refs.searchListBtn,
      };
      this.stateItems({ els });
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
      const state = this.searchStates(["countries","inputs"]);
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
      this.$refs.searchListBtn.checked = false;
      this.$refs.searchField.value = "";
      this.$refs.searchField.autofocus = true;
    },
    searchEvents() {
      // Refs
      const searchBtn = this.$refs.searchBtn;
      const searchField = this.$refs.searchField;
      const searchListBtn = this.$refs.searchListBtn;


      // Search Functions
      const listFilter = this.listFilter;


      // Search Filter
      searchField.onfocus = () => searchListBtn.checked = true;


      // Search Submit 
      searchBtn.onclick = this.submitEvent;
      searchField.onkeyup = (event) => {
        if (event.isComposing) return;
        else listFilter(event.target.value.toLowerCase());

        if (event.code === "Enter" || event.key === "Enter" || event.keyCode === 13 || event.which === 13) {
          searchField.blur();
          searchBtn.onclick();
        }
      };
    },
  },
  beforeMount() {
    const els = {
      searchBtn: null,
      searchField: null,
      searchList: null,
      searchListBtn: null,
    };
    this.stateItems({ els });
  },
  mounted() {
    this.setSearchEls();
    this.searchEvents();
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
    &--checkbox {
      display: none;
    }
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


// Searchlist Container
.search-list {
  &--container {
    max-height: 30rem;
    width: 100%;

    $section-bg: lighten(abs.$vars-c-lprimary, 10%);
    background: $section-bg;

    border-radius: 1rem;
    box-shadow: 0px 0px 5px rgba(black, 0.8), 0px 5px 8px rgba(black, 0.5);

    position: absolute;
    z-index: -1;
    top: 0rem;
    opacity: 0;

    overflow: hidden;

    transition: all 0.3s ease-in-out;
  }
  &--block {
    width: 100%;
    height: 100%;

    position: absolute;
    z-index: 10;
    opacity: 1;
  }
}




// Search Errors
.search {
  &-errors {
    width: 100%;
  }
  &--errorgroup {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    border-radius: .5rem;

    // complementary
    background: hsl(1, 85%, 50%);
    padding: 1rem;
    padding-left: 2rem;
    margin-bottom: 1rem;

    box-shadow: 0 0px 5px rgba(0,0,0,.2), 0 2px 5px rgba(0,0,0,.5);

    color: white;
    font-size: 1.3rem;
  }
  &--error {
    &-title {
      font-family: tbold;
      margin-right: 1rem;
    }
    &-content {
    }
  }
}



// Searchlist Functions
.search-list {
  &--checkbox:checked ~ &--btn &--icon {
    transform: rotateZ(-90deg);
  }
  &--checkbox:checked ~ &--container {
    opacity: 1;
    top: 8rem;
  }
  &--checkbox:checked ~ &--container > &--block {
    display: none;
  }
}
</style>
