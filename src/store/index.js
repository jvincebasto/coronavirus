import { createStore } from "vuex";
import covidApi from "./modules/covidApi.js";
import slider from "./modules/slider.js";
import countrySearch from "./modules/countrySearch.js";

export default createStore({
  state() {
    return {};
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    covid: {
      namespaced: true,
      ...covidApi,
    },
    slider: {
      namespaced: true,
      ...slider,
    },
    countrySearch: {
      namespaced: true,
      ...countrySearch,
    },
  },
});
