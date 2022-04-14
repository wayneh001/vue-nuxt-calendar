import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      meetingEvent: {},
      searchObj: {},
      stockImages: [],
    },
    actions: {
      onClickEvent(vuexContext, meeting) {
        vuexContext.commit("onClickEvent", meeting)
      },
      onSearch(vuexContext, obj) {
        vuexContext.commit("onSearch", obj);
      },
      fetchStockImages(vuexContext, array) {
        vuexContext.commit("fetchStockImages", array);
      },
      storeStockImage(vuexContext, obj) {
        vuexContext.commit("storeStockImage", obj);
      }
    },
    mutations: {
      onClickEvent(state, meeting) {
        state.meetingEvent = meeting;
      },
      onSearch(state, obj) {
        state.searchObj = obj;
      },
      fetchStockImages(state, array) {
        state.stockImages = array;
      },
      storeStockImage(state, obj) {
        state.stockImages.push(obj);
      },
    },
    getters: {
      clickEvent(state) {
        return state.meetingEvent;
      },
      searchObj(state) {
        return state.searchObj;
      },
      stockImages(state) {
        return state.stockImages;
      },
    },
  });
};
export default createStore;
