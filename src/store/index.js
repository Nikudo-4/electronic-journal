import Vue from 'vue'
import Vuex from 'vuex'


import { LocalStorage } from 'quasar'

import school from './modules/school.js'
import { version } from 'moment'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    
    modules: {
      school
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })
  
  
  Store.subscribe((mutation, state) => {
    // Store the state object as a JSON string

   
    if(state.school.allChildren.length  >= 1){
      // let store = {
      //   allChildren : state.school.allChildren,
      //   currentChild : state.school.currentChild,
      //   version : state.school.version
      // };
      localStorage.setItem('store', JSON.stringify(state))
    }
  //  let forsStored =  JSON.parse()
    
    // localStorage.setItem('store2',losalStorage.getItem('store1'))
      
      
  });


  return Store
}
