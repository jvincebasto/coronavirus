import { createStore } from "vuex";
import covidApi from "./modules/covidApi.js";
import cards from "./modules/cards.js";
import slider from "./modules/slider.js";

export default createStore({
  state() {
    return {};
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    cards: {
      namespaced: true,
      ...cards
    },
    covid: {
      namespaced: true,
      ...covidApi
    },
    slider: {
      namespaced: true,
      ...slider
    }
  }
});
