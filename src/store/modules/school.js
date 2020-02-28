import moment, { locale } from 'moment'
export default {

    actions: {
        async updateDate({commit}){
            commit('updateDate', date)
        },
        async loginUser(){
          fetch('')
        }
    },
    
    mutations: {
        updateDate(state, date){
            return state.date = date
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
        date: new Date(Date.now()),
        subjects: [{
            name: 'Алгебра',
            assessment:[ 5 , 4 , 3 , 2, 2, 2,]
          }, {
            name: 'Русский язык',
            assessment:[ 5 , 4 , 3 , 3]
          }, {
            name: 'Иностранный',
            assessment:[5 , 4 , 3 , 2 ]
          }, {
            name: 'География',
            assessment:[4 , 4 , 3 , 2 ]
          }, {
            name: 'История',
            assessment:[5 , 4 , 3 , 2 ]
          }, {
            name: 'Физика',
            assessment:[5 , 4 , 3 , 2 ]
          }, {
            name: 'Физкультура',
            assessment:[5 , 4 , 3 , 2 ]
        }],
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
      objectMonth1(state) {
        return this.state.date 
      }
    }
}