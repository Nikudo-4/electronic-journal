import moment, { locale } from 'moment'
export default {

    actions: {
        async updateDate({commit}){
            commit('updateDate', date)
        },
        async giveChild(ctx, result){
          try {
              const res = await fetch("http://193.228.162.185:9072/api/app/schoolchild/"+result);
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
    // f80686d0-59a0-11ea-970b-872030887c49
    mutations: {
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
        subjects:{}
        // subjects: [{
        //     name: 'Алгебра',
        //     assessment:[ 5 , 4 , 3 , 2, 2, 2,]
        //   }, {
        //     name: 'Русский язык',
        //     assessment:[ 5 , 4 , 3 , 3]
        //   }, {
        //     name: 'Иностранный',
        //     assessment:[5 , 4 , 3 , 2 ]
        //   }, {
        //     name: 'География',
        //     assessment:[4 , 4 , 3 , 2 ]
        //   }, {
        //     name: 'История',
        //     assessment:[5 , 4 , 3 , 2 ]
        //   }, {
        //     name: 'Физика',
        //     assessment:[5 , 4 , 3 , 2 ]
        //   }, {
        //     name: 'Физкультура',
        //     assessment:[5 , 4 , 3 , 2 ]
        // }],
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