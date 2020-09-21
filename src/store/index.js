import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex);

const store = new Vuex.Store({
  getters,
  modules: {
    app,
    settings,
    user
  }

})

export default store
