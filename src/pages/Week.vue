<template>
  <div class="q-pa-md">
    <div class="q-pb-ms row" style="align-items: center;">
      <div class="col-1">
        <q-btn
          class="float-left q-pr-sn"
          icon="keyboard_arrow_left"
          flat
          dense
          @click="minusWeek()"
        />
      </div>

      <div class="col-10 q-pb-sm" id="butt">
        <q-btn
          no-caps
          class="dateFond"
          @click="
            () => {
              vision = !vision;
            }
          "
        >
          {{ formatBtn }}
        </q-btn>
      </div>

      <div class="col-1">
        <q-btn
          class="float-right q-pl-sn"
          icon="keyboard_arrow_right"
          flat
          dense
          @click="plusWeek()"
        />
      </div>
      <div
        class="q-mt-sm row justify-center items-center"
        id="picker"
        :style="vision ? 'display:block!important' : 'display:none!important'"
      >
        <!-- @click="()=>{vision = !vision;}" 
       @change="closePicker"
       -->
        <q-date
          class="col"
          v-model="date1"
          minimal
          v-touch-swipe.mouse.right="handleSwipeR"
          v-touch-swipe.mouse.left="handleSwipeL"
          v-touch-swipe.mouse.up="handleSwipeT"
        />
      </div>
      <q-card class="q-ma-sm  my-card" bordered flat>
        <q-card-section
          class="text-white"
          v-for="(day, k) in lessonsByDates"
          :key="k"
          v-touch-swipe.mouse.right="handleSwipeWeekR"
          v-touch-swipe.mouse.left="handleSwipeWeekL"
        >
          <div class="q-pa-sm text-h6"
          style="background: radial-gradient(circle, #8ecdec 0%, #4c4cd4 100%); 
              text-align:center;"
           >
           <span v-if="k">
           {{dateFormat(k)}}
           </span>
            <span v-else>Данных о дате нет.</span>
            <div v-for="lesson in day" :key="lesson.id">
            <q-card-section style="background: white; opacity: 0.9; text-align:left;" class="text-black">
              
              <span v-if="lesson.subject_name">
              {{ lesson.subject_name }} :
              </span>
              <span v-else>Данных о предмете нет. Вернитесь на корректную дату.</span>
              <span v-if="lesson.subject_name">
              <span 
              v-for="grade in lesson.grades" :key="grade.id">
                {{ grade.grade }} 
              </span>
              </span>
              <span v-else>Оценок нет</span>
            </q-card-section>
            </div>
          </div>
        </q-card-section>
      </q-card>

    </div>
  </div>
</template>

<script>
import moment, { locale } from "moment";
import { mapGetters, mapActions, mapMutations } from "vuex";
import Axios from "axios";

export default {
  data() {
    return {
      vision: false,
    };
  },

  computed: {
    date1: {
      get() {
        return this.$store.state.date;
      },
      set(date) {
        this.$store.commit("updateDate", date);
      }
    },
    objectMonth() {
      let a = this.$store.state.date;
      let f = moment(a).daysInMonth();
      return f;
    },

    ...mapGetters([
      "formatBtn",
      "subjects",
      "lessonsByDates",
      "currentChild",
      'objectDays',
      'giveDate'
    ])
  },
  mounted() {
    let uuid = this.currentChild.uuid
      this.giveGrades(uuid);
  },
  watch: {
    currentChild: function(val) {
      let uuid = this.currentChild.uuid
      this.giveGrades(uuid);
    },
    formatBtn: function(val){
      let uuid = this.currentChild.uuid
      this.giveGrades(uuid);
    }
  },
  methods: {
    ...mapActions(["updateDate", "giveGrades"]),
    ...mapMutations([
      "plusWeek",
      "minusWeek",
      "handleSwipeR",
      "handleSwipeL",
      "handleSwipeWeekR",
      "handleSwipeWeekL"
    ]),

    dateFormat(date) {
      return moment(date)
        .locale("ru")
        .format("dddd D MMM");
    },

    handleSwipeT() {
      return (this.vision = !this.vision);
    }
  }
};
</script>

<style>
.dateFond {
  /* background: white; */
  width: 100%;
}
.my-card {
  width: 100%;
}
</style>
