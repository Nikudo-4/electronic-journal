import moment, { locale } from "moment";
//import { LocalStorage } from 'quasar'

import { version } from "./../../../package.json";

export default {
  actions: {
    initialiseStore({ commit }) {
      commit("initialiseStore", store);
    },
    deleteItem({ commit }, id) {
      commit("deleteItem", id);
    },
    currentChild({ commit }, index) {
      commit("currentChildSort", index);
    },
    async updateDate({ commit }) {
      commit("updateDate", index);
    },
    async giveChild2(ctx) {
      try {
        const res = await fetch(
          "http://193.228.162.185:9072/api/app/schoolchild/5c4c2950-6f44-11ea-a324-a7800705b255"
        );

        const dataChild = await res.json();
        ctx.commit("updateData", dataChild);
        ctx.commit("currentChild", dataChild);
        //  ctx.commit('addQR',decodedString);
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
        ctx.commit("currentChild", dataChild);
        ctx.commit("addQR", decodedString);
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
        ctx.commit("currentChild", dataChild);
        ctx.commit("addQR", decodedString);
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
      try {
        const res = await fetch(
          `http://193.228.162.185:9072/api/app/schoolchild/grades/5c4c2950-6f44-11ea-a324-a7800705b255`,
          {
            method: "post",
            body: JSON.stringify({ from: "2019-12-11", to: "2020-12-12" }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
          }
        );
        const grades = await res.json();
        ctx.commit("updateGrades", grades);
      } catch (err) {
        alert(err);
      }
    },
    updateData({ commit }) {
      commit("updateData");
    },
    addQR({ commit }) {
      commit("addQR");
    }
  },

  mutations: {
    //local storege
    initialiseStore(state) {
      // Check if the store exists
      if (localStorage.getItem("store")) {
        let store = JSON.parse(localStorage.getItem("store"));
        // Check the version stored against current. If different, don't
        // load the cached version
        if (store.version == version) {
          this.replaceState(Object.assign(state, store));
        } else {
          state.version = version;
        }
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
        return (state.allChildren = [...state.allChildren, dataChild]);
      }
    },
    deleteItem(state, index) {
      state.allChildren.splice(index, 1);
    },
    updateSubj(state, subjects) {
      return (state.subjects = subjects);
    },
    updateGrades(state, grades) {
      return (state.grades = grades);
    },
    // addQR(state, qrCodes){
    //   return state.qrCodes = qrCodes
    // },
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
    currentChild: {},
    allChildren: [],
    date: new Date(Date.now()),
    subjects: {},
    grades: [],

    version: "",
    qrCodes: ""
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
    currentChild(state) {
      return state.currentChild;
    },
    subjects(state) {
      return state.subjects;
    },
    grades(state) {
      return state.grades;
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
