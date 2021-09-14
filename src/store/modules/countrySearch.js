export default {
  state() {
    // Data
    // let countries = [];
    let countries = [
      // {"updated":1621503488370,"country":"Bhutan","countryInfo":{"_id":64,"iso2":"BT","iso3":"BTN","lat":27.5,"long":90.5,"flag":"https://disease.sh/assets/img/flags/bt.png"},"cases":1322,"todayCases":0,"deaths":1,"todayDeaths":0,"recovered":1186,"todayRecovered":0,"active":135,"critical":0,"casesPerOneMillion":1697,"deathsPerOneMillion":1,"tests":754735,"testsPerOneMillion":968753,"population":779079,"continent":"Asia","oneCasePerPeople":589,"oneDeathPerPeople":779079,"oneTestPerPeople":1,"undefined":173,"activePerOneMillion":173.28,"recoveredPerOneMillion":1522.31,"criticalPerOneMillion":0},
      // {"updated":1621502887869,"country":"Philippines","countryInfo":{"_id":608,"iso2":"PH","iso3":"PHL","lat":13,"long":122,"flag":"https://disease.sh/assets/img/flags/ph.png"},"cases":1165155,"todayCases":6100,"deaths":19641,"todayDeaths":135,"recovered":1093602,"todayRecovered":4071,"active":51912,"critical":1819,"casesPerOneMillion":10510,"deathsPerOneMillion":177,"tests":12793212,"testsPerOneMillion":115397,"population":110862535,"continent":"Asia","oneCasePerPeople":95,"oneDeathPerPeople":5644,"oneTestPerPeople":9,"undefined":468,"activePerOneMillion":468.26,"recoveredPerOneMillion":9864.49,"criticalPerOneMillion":16.41},
      // {"updated":1621503487356,"country":"USA","countryInfo":{"_id":840,"iso2":"US","iso3":"USA","lat":38,"long":-97,"flag":"https://disease.sh/assets/img/flags/us.png"},"cases":33802324,"todayCases":0,"deaths":601949,"todayDeaths":0,"recovered":27299180,"todayRecovered":0,"active":5901195,"critical":7652,"casesPerOneMillion":101596,"deathsPerOneMillion":1809,"tests":468945602,"testsPerOneMillion":1409464,"population":332712023,"continent":"North America","oneCasePerPeople":10,"oneDeathPerPeople":553,"oneTestPerPeople":1,"undefined":17737,"activePerOneMillion":17736.64,"recoveredPerOneMillion":82050.48,"criticalPerOneMillion":23},
      // {"updated":1621503488072,"country":"Andorra","countryInfo":{"_id":20,"iso2":"AD","iso3":"AND","lat":42.5,"long":1.6,"flag":"https://disease.sh/assets/img/flags/ad.png"},"cases":13569,"todayCases":0,"deaths":127,"todayDeaths":0,"recovered":13234,"todayRecovered":0,"active":208,"critical":12,"casesPerOneMillion":175369,"deathsPerOneMillion":1641,"tests":193595,"testsPerOneMillion":2502068,"population":77374,"continent":"Europe","oneCasePerPeople":6,"oneDeathPerPeople":609,"oneTestPerPeople":0,"undefined":2688,"activePerOneMillion":2688.24,"recoveredPerOneMillion":171039.37,"criticalPerOneMillion":155.09},
      // {"updated":1621503487854,"country":"Albania","countryInfo":{"_id":8,"iso2":"AL","iso3":"ALB","lat":41,"long":20,"flag":"https://disease.sh/assets/img/flags/al.png"},"cases":132095,"todayCases":0,"deaths":2438,"todayDeaths":0,"recovered":127240,"todayRecovered":0,"active":2417,"critical":18,"casesPerOneMillion":45946,"deathsPerOneMillion":848,"tests":680210,"testsPerOneMillion":236593,"population":2875024,"continent":"Europe","oneCasePerPeople":22,"oneDeathPerPeople":1179,"oneTestPerPeople":4,"undefined":841,"activePerOneMillion":840.69,"recoveredPerOneMillion":44257.02,"criticalPerOneMillion":6.26},
      // {"updated":1621503487853,"country":"S. Korea","countryInfo":{"_id":410,"iso2":"KR","iso3":"KOR","lat":37,"long":127.5,"flag":"https://disease.sh/assets/img/flags/kr.png"},"cases":134117,"todayCases":646,"deaths":1916,"todayDeaths":4,"recovered":123659,"todayRecovered":422,"active":8542,"critical":151,"casesPerOneMillion":2614,"deathsPerOneMillion":37,"tests":9447358,"testsPerOneMillion":184130,"population":51308098,"continent":"Asia","oneCasePerPeople":383,"oneDeathPerPeople":26779,"oneTestPerPeople":5,"undefined":166,"activePerOneMillion":166.48,"recoveredPerOneMillion":2410.13,"criticalPerOneMillion":2.94}
    ];

    // Search Elements
    let els = {};
    let listItems = [];
    let countryCards = [];

    // Search States
    let inputs = {
      raw: "",
      filtered: [], // Strings
      valid: [], // Objs
      invalid: [], // Strings
      duplicates: [], // Strings
      passed: [], // String
      excess: [], // String
      final: [], // String
      limit: 18,
    };

    // Search Errors
    let errors = [];

    return {
      els,
      listItems,
      countryCards,

      countries,
      inputs,
      errors,
    };
  },
  getters: {
    // States
    allStates: (state) => {
      return state;
    },
    searchStates: (state) => (props) => {
      let obj = {};
      for (const prop of props) obj[prop] = state[prop];
      return obj;
    },
    validateCountryName: () => (obj, input, retVal) => {
      const value = input.toLowerCase();
      let country;
      let iso2;
      let iso3;

      if (obj.country) country = obj.country.toLowerCase();
      if (obj.countryInfo.iso2) iso2 = obj.countryInfo.iso2.toLowerCase();
      if (obj.countryInfo.iso3) iso3 = obj.countryInfo.iso3.toLowerCase();
      if (country === value || iso2 === value || iso3 === value) return retVal;
    },
    validateCountryNameList: () => (obj, input, retVal) => {
      const value = input.toLowerCase();
      let country;
      let iso2;
      let iso3;

      if (obj.country) country = obj.country.toLowerCase();
      if (obj.iso2) iso2 = obj.iso2.toLowerCase();
      if (obj.iso3) iso3 = obj.iso3.toLowerCase();
      if (country === value || iso2 === value || iso3 === value) return retVal;
    },
  },
  mutations: {
    // Add and Remove States
    pushState(state, payload) {
      const { prop: arr, data } = payload;
      state[arr].push(data);
    },
    pushStateObjs(state, payload) {
      for (const obj in payload) {
        const stateObj = payload[obj];

        for (const item in stateObj) {
          state[obj][item].push(stateObj[item]);
        }
      }
    },
    spliceState(state, payload) {
      const { prop: arr, data } = payload;
      state[arr].splice(data);
    },
    spliceStateItem(state, payload) {
      const { prop: arr, data } = payload;
      state[arr].splice(data, 1);
    },
    unshiftState(state, payload) {
      const { prop: arr, data } = payload;
      state[arr].unshift(data);
    },

    // Set States
    stateItems(state, payload) {
      for (const item in payload) {
        state[item] = payload[item];
      }
    },
    stateObj(state, payload) {
      const { prop: obj, data } = payload;

      for (const item in data) {
        state[obj][item] = payload[item];
      }
    },
    stateObjs(state, payload) {
      for (const obj in payload) {
        const stateObj = payload[obj];

        for (const item in stateObj) {
          state[obj][item] = stateObj[item];
        }
      }
    },
  },
  actions: {
    // Search Input Validations
    pushInputValidation({ state, getters, commit }, data) {
      const { inputs } = state;
      const { bool, value, stateValue } = data;

      // includes - primitive bool (breaks) value
      // some - object bool (breaks) fn
      // filter - object (each) fn

      // find - value (breaks) fn
      // findIndex - index (breaks) fn
      // indexOf - primitive (each) value

      if (bool) {
        if (inputs.valid.length === 0)
          commit("pushStateObjs", { inputs: { valid: stateValue } });
        else {
          const match = inputs.valid.some((obj) =>
            getters.validateCountryNameList(obj, value, true)
          );
          if (!match)
            commit("pushStateObjs", { inputs: { valid: stateValue } });
        }
      } else {
        if (inputs.valid.length === 0)
          commit("pushStateObjs", { inputs: { invalid: stateValue } });
        else {
          const match = inputs.invalid.includes(value);
          if (!match)
            commit("pushStateObjs", { inputs: { invalid: stateValue } });
        }
      }
    },
    searchInputValidation({ getters, dispatch }, data) {
      const { inputs, list } = data;
      let valid = {};
      let obj = {};
      // let invalid = "";

      for (const input of inputs) {
        const value = input.toLowerCase();

        valid = list.find((obj) =>
          getters.validateCountryNameList(obj, value, obj)
        );
        if (valid) obj = { bool: true, value, stateValue: valid };
        else obj = { bool: false, value, stateValue: value };

        dispatch("pushInputValidation", obj);
      }
    },

    // Search Request Duplicates
    searchRequestDuplicates({ getters, commit }, inputs) {
      const state = getters.searchStates(["inputs", "countries"]);

      for (const input of inputs) {
        const value = input.country.toLowerCase();

        const match = state.countries.some((obj) =>
          getters.validateCountryName(obj, value, true)
        );
        if (match) {
          if (state.inputs.duplicates.length === 0)
            commit("pushStateObjs", { inputs: { duplicates: value } });
          else {
            const match = state.inputs.duplicates.includes(value);
            if (!match)
              commit("pushStateObjs", { inputs: { duplicates: value } });
          }
        } else {
          if (state.inputs.passed.length === 0)
            commit("pushStateObjs", { inputs: { passed: value } });
          else {
            const match = state.inputs.passed.includes(value);
            if (!match) commit("pushStateObjs", { inputs: { passed: value } });
          }
        }
      }
    },

    // Search Request Limit
    searchDataLimit({ getters, commit }, inputs) {
      const state = getters.searchStates(["inputs", "countries"]);
      let length = state.countries.length;

      for (const input of inputs) {
        const value = input.toLowerCase();

        if (length === 0) {
          commit("pushStateObjs", { inputs: { final: value } });
          length++;
        } else if (length < state.inputs.limit) {
          commit("pushStateObjs", { inputs: { final: value } });
          length++;
        } else {
          if (state.inputs.excess.length === 0)
            commit("pushStateObjs", { inputs: { excess: value } });
          else {
            const match = state.inputs.excess.includes(value);
            if (!match) commit("pushStateObjs", { inputs: { excess: value } });
          }
        }
      }
    },

    // Search ErrorList
    searchErrorList({ commit }, data) {
      const { title, list, prepend, append } = data;
      const bool = list.length > 0 ? true : false;
      let error = "";

      if (bool) {
        // Ommit Last Element
        const last = list.length - 1;
        const inputs = list.filter((val, index) => index !== last);

        // Join Elements
        error = inputs.join(", ");
        error += list.length === 1 ? list[last] : ` and ${list[last]}`;
        error = `${prepend} "${error}" ${append}`;

        // Commit
        commit("pushState", {
          prop: "errors",
          data: { title, content: error },
        });
      } else error = "";

      return error;
    },
    searchErrors({ state, dispatch }, format) {
      const { inputs } = state;

      dispatch("searchErrorList", {
        title: "Not Found:",
        list: format ? format(inputs.invalid) : inputs.invalid,
        prepend: "Request for",
        append: "were not found, please check your spelling and try again",
      });
      dispatch("searchErrorList", {
        title: "Duplicates:",
        list: format ? format(inputs.duplicates) : inputs.duplicates,
        prepend: " ",
        append: "already exists",
      });
      dispatch("searchErrorList", {
        title: "Excess:",
        list: format ? format(inputs.excess) : inputs.excess,
        prepend: `Limit of ${inputs.limit} request exceeded, request for`,
        append: "are cancelled",
      });
    },

    // Reset State
    resetSearchStates({ commit }) {
      commit("stateObjs", {
        inputs: {
          raw: "",
          filtered: [],
          valid: [],
          invalid: [],
          duplicates: [],
          passed: [],
          excess: [],
          final: [],
        },
      });
    },
  },
  modules: {},
};
