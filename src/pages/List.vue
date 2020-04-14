<template>
  <div class="list">
    <q-markup-table :separator="separator" flat bordered dense>
      <tbody>
        <tr>
          <td></td>
          <td class="date_list" v-for="(day, dayKey) in lessonsByDates" :key="dayKey">
            <!-- <div style="width: 60px; white-space: normal;">
            </div> -->
            <span style="text-transform: capitalize;">
              {{ dateFormatDay(dayKey) }}
            </span>
             <br/> {{ dateFormat(dayKey) }}
          </td>
        </tr>
        <tr width="200" v-for="(subject, index) in subjects" :key="index">
          <td  class="title_list"
            :style="index % 2 === 0?'background: #F5F5F5;':'background: white;'">
            <div  style=" word-break: normal;white-space: normal;width: 100px">
            {{ subject.title }}
            </div>
          </td>
          <td width="200" :style="index % 2 === 0  ?'background: #F5F5F5;':'background: white;'"
           v-for="(day, k) in lessonsByDates" :key="k">
            <div   v-for="lesson in day" :key="lesson.id">
              <div  style="text-align:center;" v-if="lesson.subject_id == subject.id">
                <div   style="text-align:center; display: inline" v-for="grade in lesson.grades" :key="grade.id">
                  <span >
                  {{ grade.grade }}
                  </span>
                </div>
              </div>
              <div  style="text-align:center;" v-else>-</div>
            </div>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment, { locale } from "moment";

export default {
  data() {
    return {
      separator: "vertical",
    };
  },
  computed: {
    ...mapGetters(["subjects", "lessonsByDates", "currentChild"])
  },
  mounted() {
    this.giveSubjects();
     let uuid = this.currentChild.uuid
    this.giveGradesForMonth(uuid);
  },
  watch: {
   currentChild: function(val) {
     let uuid = this.currentChild.uuid
      this.giveGradesForMonth(uuid);
    }
  },
  methods: {
    oddFunc(num){
      alert(num)
      return num % 2 === 0 ? "true" : "false"
    },
    ...mapActions(["giveSubjects", "giveGradesForMonth"]),

    dateFormatDay(date) {
      return moment(date)
        .locale("ru")
        .format("dddd");
    },
    dateFormat(date) {
      return moment(date)
        .locale("ru")
        .format("D MMM");
    }
  }
};
</script>

<style>
td.date_list{
  /* width:150px; height:20px; */
  overflow-wrap: normal;  /* не поддерживает IE, Firefox; является копией word-wrap */ 
  word-wrap: normal;
  word-break: normal;  /* не поддерживает Opera12.14, значение keep-all не поддерживается IE, Chrome */ 
  hyphens: manual;
}
.title_list{
  width:100px; height:20px;
  overflow-wrap: normal;  /* не поддерживает IE, Firefox; является копией word-wrap */ 
  word-wrap: normal;
  word-break: normal;  /* не поддерживает Opera12.14, значение keep-all не поддерживается IE, Chrome */ 
  hyphens: manual;
}
.list {
  height: 100% auto;
}
</style>
