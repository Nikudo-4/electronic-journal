  <template>
<div class="q-pa-md">
    <div class="q-pb-ms row" style="align-items: center;">
      <div class="col-1">
        <q-btn class="float-left q-pr-sn"  icon="keyboard_arrow_left"  flat
        dense @click="minusWeek()" />
      </div>

      <div class="col-10" id="butt">
        <q-btn class="dateFond" @click="()=>{vision = !vision;}" >
          {{formatBtn}}
        </q-btn>
      </div>

      <div class="col-1">
        <q-btn class="float-right q-pl-sn"  icon="keyboard_arrow_right"  flat
        dense @click="plusWeek()" />
      </div>
    <div class="q-mt-sm row justify-center items-center"  id="picker" 
      :style="vision? 'display:block!important' : 'display:none!important'"
    >
      <!-- @click="()=>{vision = !vision;}" 
       @change="closePicker"
       -->
      <q-date class="col"
        v-model="date1"
        minimal
        v-touch-swipe.mouse.right="handleSwipeR"
        v-touch-swipe.mouse.left="handleSwipeL"
        v-touch-swipe.mouse.up="handleSwipeT"
        />
        
    </div>
    <q-card
      class="q-mt-sm  my-card"
      bordered
    >
      <q-card-section class="text-white"
       v-for="(objectDay, index) in objectDays.date" :key="index"
        v-touch-swipe.mouse.right="handleSwipeWeekR"
        v-touch-swipe.mouse.left="handleSwipeWeekL"
        >
        <div class="q-pt-md text-h6"
         style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%); 
          text-align:center;"
           >
          {{objectDay.name}}{{objectDay.date}}
          <q-separator inset />
          <q-card-section style="opacity: 0.9" v-for="subject in subjects" :key="subject.title">
            {{subject.id}}: {{subject.title}}
          </q-card-section>
        </div>
      </q-card-section>
    </q-card>
  </div>
</div>
</template>

<style>
 
.dateFond{
 /* background: white; */
 width: 100%;
}
.my-card{
  width: 100%;
}


</style>


<script>
import moment, { locale } from 'moment'
import {mapGetters, mapActions , mapMutations} from 'vuex'
import Axios from 'axios'


export default {
  
  data () {
    return {
    vision: false,
    d: new Date(Date.now()),
  
    }
  },

  computed:{
    date1: {
      get () {
        return this.$store.state.date
      },
      set (date) {
        this.$store.commit('updateDate', date)
      }
    },
      objectMonth(){
        let a = this.$store.state.date
        let f = moment(a).daysInMonth();
        return f
      },
    ...mapGetters(["formatBtn","objectDays","subjects"]),
    // не пойму как привязать текущий день к нужному ему массиву рассписания
  },
  mounted(){
    this.giveSubjects()
  },
  methods:{
    ...mapActions(['updateDate', 'giveSubjects']),
    ...mapMutations(["plusWeek","minusWeek","handleSwipeR","handleSwipeL","handleSwipeWeekR","handleSwipeWeekL"]), 

      handleSwipeT(){
        return this.vision=!this.vision
      },
    },
  
}
</script>