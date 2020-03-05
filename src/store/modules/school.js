import moment, { locale } from 'moment'
import { LocalStorage} from 'quasar'
import {version} from './../../../package.json';

export default {



    actions: {
        async updateDate({commit}){
            commit('updateDate', date)
        },
        async giveChild(ctx, result){
          try {
              const res = await fetch("http://193.228.162.185:9072/api/app/schoolchild/"+result.text);
              const dataChild = await res.json();
              ctx.commit('updateData', dataChild);
          } catch (err) {
              alert(err)
            }
        },
        async giveSubjects(ctx){
          try {
            const res1 = await fetch("http://193.228.162.185:9072/api/app/subjects/all-subjects");
            const subjects = await res1.json();
            ctx.commit('updateSubj', subjects);
          } catch (err) {
            alert(err)
            }
        }
    },

    mutations: {
      initialiseStore(state) {
        // Check if the store exists
        if(localStorage.getItem('store')) {
          let store = JSON.parse(localStorage.getItem('store'));
          
          // Check the version stored against current. If different, don't
          // load the cached version
          if(store.version == version) {
            this.replaceState(
              Object.assign(state, store)
            );
          } else {
            state.version = version;
          }
        }
      },
        updateDate(state, date){
            return state.date = date
        },
        updateData(state, dataChild){
          return state.dataChild = dataChild
        },
        updateSubj(state, subjects){
          return state.subjects = subjects
        },
        plusWeek(state){
          let t = state.date
          t = moment(t).add(1,'isoWeeks')
          return state.date = t
        },
        minusWeek(state){
          let t = state.date
          t = moment(t).add(-1,'isoWeeks')
         return state.date = t
        },
        handleSwipeR(state){
          let t = state.date
          t = moment(t).add(1,'months')
          return state.date = t
        },
        handleSwipeL(state){
          let t = state.date
          t = moment(t).add(-1,'months')
          return state.date = t
        },
        handleSwipeWeekR(state){
          let t = state.date
          t = moment(t).add(1,'isoWeeks')
          return state.date = t
        },
        handleSwipeWeekL(state){
          let t = state.date
          t = moment(t).add(-1,'isoWeeks')
          return state.date = t

        },
   },
    state: {
        dataChild:{},
        date: new Date(Date.now()),
        subjects:{},
        version: '',
    },
    
    getters: {
        formatBtn(state){
          let n = new Date(state.date)
          moment(n).locale('ru')
          let startw = moment(n).startOf('isoWeeks'); //начало недели 
          let endw = moment(n).endOf('isoWeeks');//конец недели
          let stroka = `${moment(startw).format('DD')}-${moment(endw).format('DD')} ${moment(state.date).locale('ru').format('MMMM YYYY')}`
          return stroka
       },
       dataChild(state){
        return state.dataChild
       },
       subjects(state){
        return state.subjects
       },
       objectDays(state) {
        return {
          date: [ 
          { id:1, name:"Понедельник  " , date: moment(state.date).isoWeekday(1).locale('ru').format('D MMM')},
          { id:2, name:"Вторник  " , date: moment(state.date).isoWeekday(2).locale('ru').format('D MMM')},
          { id:3, name:"Среда  " , date: moment(state.date).isoWeekday(3).locale('ru').format('D MMM')},
          { id:4, name:"Четверг  " , date: moment(state.date).isoWeekday(4).locale('ru').format('D MMM')},
          { id:5, name:"Пятница  " , date: moment(state.date).isoWeekday(5).locale('ru').format('D MMM')},
          { id:6, name:"Суббота  " , date: moment(state.date).isoWeekday(6).locale('ru').format('D MMM')}
          ]}
      },
      nameChildren(state){
        return state.dataChild.name
       },
    }

  
}