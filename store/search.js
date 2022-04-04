import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      searchObj: {
        keywords: "",
        searchStart: "",
        searchEnd: "",
      },
    },
    actions: {
      onSearch(vuexContext, searchObj) {
        vuexContext.commit("onSearch", searchObj);
      },
    },
    mutations: {
      onSearch(state, searchObj) {
        state.searchObj = searchObj;
      },
    },
    getters: {
      searchObj(state) {
        return state.searchObj;
      },
    },
  });
};
export default createStore;
