/**
 * Created by lichun on 2017/1/19.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  bhdata: null,
  hasMore: true,
};
const mutations = {
  setBhdata(state, bhdata) {
    state.bhdata = bhdata;
  },
  setHasMore(state, hasMore) {
    state.hasMore = hasMore;
  },

};
const actions = {
  async getBhdata({ commit, state }, { page = 1, nums = 10, status = '', open = '', project_name = '', open_time_star = '', open_time_end = '', guarantee_name = '', cityid = '' }) {

  },

};

export default () => new Vuex.Store({
  state,
  actions,
  mutations,
});
