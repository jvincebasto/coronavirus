export default {
  state() {
    let cardList = [];
    let cardRefs = [];

    return {
      cardList,
      cardRefs
    };
  },
  getters: {
    dataCardIndex: state => country => {
      return state.cardList.findIndex(
        obj => obj.value.country.toLowerCase() === country.toLowerCase()
      );
    },
    elCardIndex: state => country => {
      return state.cardRefs.findIndex((obj, index) => {
        if (obj.value.country.toLowerCase() === country.toLowerCase())
          return index;
      });
    },
    cardEl: (state, getters) => country => {
      const index = getters.elCardIndex(country);
      return state.cardRefs[index].value.el.$el;
    },

    nameCheck: state => obj => {
      const { stateProp, value } = obj;
      let bool = state[`${stateProp}`].some(stateObj => {
        const objVal = stateObj.value;
        let bool = false;

        if (!objVal.countryInfo.iso2 || !objVal.countryInfo.iso3) {
          if (objVal.country.toLowerCase() === value) bool = true;
        } else {
          if (
            objVal.country.toLowerCase() === value ||
            objVal.countryInfo.iso2.toLowerCase() === value ||
            objVal.countryInfo.iso3.toLowerCase() === value
          )
            bool = true;
        }
        if (bool) return bool;
      });

      return bool;
    }
  },
  mutations: {
    addCardData(state, payload) {
      state.cardList.unshift(payload);
    },
    removeCardData(state, index) {
      state.cardList.splice(index, 1);
    },
    addCardEl(state, payload) {
      state.cardRefs.push(payload);
    },
    removeCardEl(state, index) {
      state.cardRefs.splice(index, 1);
    }
  },
  actions: {
    async cardData({ commit }, data) {
      commit("addCardData", await data);
    },
    async storeCardEl({ state, getters, commit }, data) {
      if (state.cardRefs.length === 0) commit("addCardEl", await data);
      else {
        const bool = getters.nameCheck({
          stateProp: "cardRefs",
          value: await data.value.country.toLowerCase()
        });
        if (!bool) commit("addCardEl", await data);
      }
    }
  },
  modules: {}
};
