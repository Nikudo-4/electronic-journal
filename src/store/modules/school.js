import moment, { locale } from "moment";
//import { LocalStorage } from 'quasar'

import { version } from "./../../../package.json";

export default {
  actions: {
    // initialiseStore({ commit }) {
    //   commit("initialiseStore");
    // },
    deleteItem({ commit }, id) {
      commit("deleteItem", id);
    },
    currentChildSort({ commit }, index) {
      commit("currentChildSort", index);
    },
    async updateDate({ commit }) {
      commit("updateDate", index);
    },
    async giveChild2(ctx) {
      try {
        const res = await fetch(
          "http://193.228.162.185:9072/api/app/schoolchild/08512690-73e6-11ea-a632-8d0cd8546917"
        );

        const dataChild = await res.json();
        ctx.commit("updateData", dataChild);
        // ctx.commit("currentChild", dataChild);
       
      } catch (err) {
        alert(err);
      }
    },
    async giveChild1(ctx, resultT) {
      try {
        const res = await fetch(
          `http://193.228.162.185:9072/api/app/schoolchild/${resultT}`
        );
        const dataChild = await res.json();
        ctx.commit("updateData", dataChild);
        // ctx.commit("currentChild", dataChild);
      } catch (err) {
        alert(err);
      }
    },
    async giveChild(ctx, decodedString) {
      try {
        const res = await fetch(
          `http://193.228.162.185:9072/api/app/schoolchild/${decodedString}`
        );
        const dataChild = await res.json();
        ctx.commit("updateData", dataChild);
        // ctx.commit("currentChild", dataChild);
      } catch (err) {
        alert(err);
      }
    },
    async giveSubjects(ctx) {
      try {
        const res1 = await fetch(
          "http://193.228.162.185:9072/api/app/subjects/all-subjects"
        );
        const subjects = await res1.json();
        ctx.commit("updateSubj", subjects);
      } catch (err) {
        alert(err);
      }
    },
    async giveGrades(ctx, uuid) {
        let date = ctx.state.date
        moment(date).locale("ru");
        let from = moment(date).startOf("isoWeeks").format('YYYY-MM-DD');
        let to = moment(date).isoWeekday(6).format('YYYY-MM-DD');
      try {
        const res = await fetch(
          `http://193.228.162.185:9072/api/app/schoolchild/grades/${uuid}`,
          {
            method: "post",
            body: JSON.stringify({ from:`${from}`,to:`${to}`}),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
          }
        );
        const lessonsByDates = await res.json();
        ctx.commit("updateLessonsByDates", lessonsByDates);

      } catch (err) {
        alert(err);
      }
    },
    async giveGradesForMonth(ctx, uuid) {
      let date = ctx.state.date
      moment(date).locale("ru");
      let from = moment(date).add(-1,'months').format('YYYY-MM-DD')
      let to = moment(date).add(1,'months').format('YYYY-MM-DD')
    try {
      const res = await fetch(
        `http://193.228.162.185:9072/api/app/schoolchild/grades/${uuid}`,
        {
          method: "post",
          body: JSON.stringify({ from:`${from}`,to:`${to}`}),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        }
      );
      const lessonsByDates = await res.json();
      ctx.commit("updateLessonsByDates", lessonsByDates);

    } catch (err) {
      alert(err);
    }
  },
    updateData({ commit }) {
      commit("updateData");
    },
  },

  mutations: {
    
    initialiseStore(state) {
      // Check if the store exists
      // console.log('state:'+state)
      if (localStorage.getItem("store")) {
        let store = JSON.parse(localStorage.getItem("store"));
        console.log(state)
        // let store1 = JSON.parse(localStorage.getItem("store1"));
        // Check the version stored against current. If different, don't
        // load the cached version
        // if (store.version == version) {
          // console.log('do')
          // console.log(state)
          //  this.replaceState(Object.assign(state, store));
          this.replaceState({...state, ...store})
          // console.log('после')
          // console.log(state)
            // 
        //   } else {
        //   state.version = version;
        // }
      }
    },
    
    addQR(state, decodedString) {
      return (state.qrCodes = decodedString);
    },
    updateDate(state, date) {
      return (state.date = date);
    },
    updateData(state, dataChild) {
      if (state.allChildren.length == 0) {
        state.currentChild = dataChild;
        return state.allChildren.push(dataChild);
      }
      const index = state.allChildren.findIndex(
        element => element.id === dataChild.id
      );
      if (index < 0) {
        state.currentChild = dataChild;
         state.allChildren = [...state.allChildren, dataChild]
      }
    },
    deleteItem(state, index) {
      state.allChildren.splice(index, 1);
    },
    updateSubj(state, subjects) {
      
      return (state.subjects = subjects);
    },
    updateLessonsByDates(state, lessonsByDates) {
      return (state.lessonsByDates = lessonsByDates);
    },
    currentChild(state, dataChild) {
      return (state.currentChild = dataChild);
    },
    currentChildSort(state, index) {
      return (state.currentChild = index);
    },
    plusWeek(state) {
      let t = state.date;
      t = moment(t).add(1, "isoWeeks");
      
      return (state.date = t);
    },
    minusWeek(state) {
      let t = state.date;
      t = moment(t).add(-1, "isoWeeks");
      return (state.date = t);
    },
    handleSwipeR(state) {
      let t = state.date;
      t = moment(t).add(1, "months");
      return (state.date = t);
    },
    handleSwipeL(state) {
      let t = state.date;
      t = moment(t).add(-1, "months");
      return (state.date = t);
    },
    handleSwipeWeekR(state) {
      let t = state.date;
      t = moment(t).add(1, "isoWeeks");
      return (state.date = t);
    },
    handleSwipeWeekL(state) {
      let t = state.date;
      t = moment(t).add(-1, "isoWeeks");
      return (state.date = t);
    }
  },
  state: {
    version: "",
    date: new Date(Date.now()),
    currentChild: {},
    allChildren: [],
    subjects: {},
    lessonsByDates: [],
  },

  getters: {
    formatBtn(state) {
      let n = new Date(state.date);
      moment(n).locale("ru");
      let startw = moment(n).startOf("isoWeeks"); //начало недели
      let endw = moment(n).endOf("isoWeeks"); //конец недели
      let stroka = `${moment(startw).format("DD")}-${moment(endw).format(
        "DD"
      )} ${moment(state.date)
        .locale("ru")
        .format("MMMM YYYY")}`;
      return stroka;
    },
    giveDate(state){
      return state.date
    },
    
    fromDate(state){
      let date = new Date(state.date);
      let from = moment(date).add(6,'months').format('YYYY-12-12')
      return from
    },
    toDate(state){
      let date = new Date(state.date);
      let to = moment(date).add(6,'months').format('YYYY-12-12')
      return to
    },
    currentChild(state) {
      return state.currentChild;
    },
    subjects(state) {
      return state.subjects;
    },
    lessonsByDates(state) {
      return state.lessonsByDates;
    },
    objectDays(state) {
      return {
        date: [
          {
            id: 1,
            name: "Понедельник  ",
            date: moment(state.date)
              .isoWeekday(1)
              .locale("ru")
              .format("D MMM")
          },
          {
            id: 2,
            name: "Вторник  ",
            date: moment(state.date)
              .isoWeekday(2)
              .locale("ru")
              .format("D MMM")
          },
          {
            id: 3,
            name: "Среда  ",
            date: moment(state.date)
              .isoWeekday(3)
              .locale("ru")
              .format("D MMM")
          },
          {
            id: 4,
            name: "Четверг  ",
            date: moment(state.date)
              .isoWeekday(4)
              .locale("ru")
              .format("D MMM")
          },
          {
            id: 5,
            name: "Пятница  ",
            date: moment(state.date)
              .isoWeekday(5)
              .locale("ru")
              .format("D MMM")
          },
          {
            id: 6,
            name: "Суббота  ",
            date: moment(state.date)
              .isoWeekday(6)
              .locale("ru")
              .format("D MMM")
          }
        ]
      };
    },
    nameChildren(state) {
      return state.currentChild.name;
    },

    allArrChildren(state) {
      return state.allChildren;
    }
  }
};
