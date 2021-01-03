import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    barColor: "rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)",
    barImage:
      "https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg",
    drawer: null,
    token: null,
    accounts: [],
    console: [],
    proxies: [],
    reports: [],
    schedules: [],
    friends: [],
    followers: [],
    statuses: [],
    actions: [],
    tasks: []
  },
  mutations: {
    SET_BAR_IMAGE(state, payload) {
      state.barImage = payload;
    },
    SET_DRAWER(state, payload) {
      state.drawer = payload;
    },
    SET_ACCOUNTS(state, payload) {
      state.accounts = payload;
      localStorage.setItem("storedData", JSON.stringify(this.state));
    },
    SET_CONSOLE(state, payload) {
      state.console = payload;
    },
    SET_PROXIES(state, payload) {
      state.proxies = payload;
      localStorage.setItem("storedData", JSON.stringify(this.state));
    },
    SET_REPORTS(state, payload) {
      state.reports = payload;
      localStorage.setItem("storedData", JSON.stringify(this.state));
    },
    SET_SCHEDULES(state, payload) {
      state.schedules = payload;
      localStorage.setItem("storedData", JSON.stringify(this.state));
    },
    SET_FRIENDS(state, payload) {
      state.friends = payload;
    },
    SET_FOLLOWERS(state, payload) {
      state.followers = payload;
    },
    SET_STATUSES(state, payload) {
      state.statuses = payload;
    },
    SET_ACTIONS(state, payload) {
      state.actions = payload;
    },
    SET_TASKS(state, payload) {
      state.tasks = payload;
    },
    GET_LOCAL() {
      this.replaceState(
        Object.assign(this.state, JSON.parse(localStorage.getItem("storedData")))
      );
    }
  },
  actions: {}
});
