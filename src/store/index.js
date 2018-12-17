import Vue from 'vue';
import Vuex from 'vuex';
import rect from './modules/rect'
import playList from './modules/playList'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    /**
     * Assign the modules to the store
     */
    modules: {
      'rect':  rect,
      'playList':  playList
    },

    /**
     * If strict mode should be enabled
     */
    strict: debug
});
