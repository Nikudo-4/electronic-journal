<template>
  <div class="list">
    <q-markup-table :separator="separator" flat bordered dense>
      <tbody>
        <tr>
          <td></td>
          <td v-for="(day, dayKey) in lessonsByDates" :key="dayKey">
            {{ dateFormat(dayKey) }}
          </td>
        </tr>
        <tr v-for="(subject, index) in subjects" :key="index">
          <td>
            {{ subject.title }}
          </td>
          <td v-for="(day, k) in lessonsByDates" :key="k">
            <div v-for="lesson in day" :key="lesson.id">
              <div v-if="lesson.subject_id == subject.id">
                <div style="display: inline" v-for="grade in lesson.grades" :key="grade.id">
                  {{ grade.grade }} 
                </div>
              </div>
              <div v-else>-</div>
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
    ...mapActions(["giveSubjects", "giveGradesForMonth"]),

    dateFormat(date) {
      return moment(date)
        .locale("ru")
        .format("dddd D MMM");
    }
  }
};
</script>

<style>
.list {
  height: 100% auto;
}
</style>
