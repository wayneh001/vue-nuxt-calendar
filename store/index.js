import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      meetingEvent: {},
      searchObj: {},
    },
    actions: {
      onClickEvent(vuexContext, meeting) {
        vuexContext.commit("onClickEvent", meeting)
      },
      onSearch(vuexContext, obj) {
        vuexContext.commit("onSearch", obj);
      },
    },
    mutations: {
      onClickEvent(state, meeting) {
        state.meetingEvent = meeting;
      },
      onSearch(state, obj) {
        state.searchObj = obj;
      },
    },
    getters: {
      clickEvent(state) {
        return state.meetingEvent;
      },
      searchObj(state) {
        return state.searchObj;
      },
    },
  });
};
export default createStore;
