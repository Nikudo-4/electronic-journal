  <template>
<div class="q-pa-md">
    <div class="q-pb-ms row" style="align-items: center;">
      <div class="col-1">
        <q-btn class="float-left q-pr-sn"  icon="keyboard_arrow_left"  flat
        dense @click="minusWeek()" />
      </div>

      <div class="col-10 q-pb-sm" id="butt">
        <q-btn no-caps class="dateFond" @click="()=>{vision = !vision;}" >
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
      class="q-ma-sm  my-card"
      bordered
      flat
    >
        <q-card-section class="text-black"
          v-for="key in grades" :key="key"
            v-touch-swipe.mouse.right="handleSwipeWeekR"
            v-touch-swipe.mouse.left="handleSwipeWeekL"
            >
                        <!-- style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%); 
              text-align:center;" -->
            <div class="q-pa-sm text-h6"
              v-for="key2 in key" :key="key2"
              
              >
              {{key2.date}}
              
              <q-separator inset />
              <q-card-section class="text-black" style="opacity: 0.9;">
                {{key2.subject_name}} :
                <span 
                v-for="key3 in key2.grades" :key="key3">   {{key3.grade}}</span>
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
    currentGrades:''
  
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
    ...mapGetters(["formatBtn","objectDays","subjects","grades","currentChild"]),
  },
  mounted(){
    this.giveSubjects()
    this.giveGrades(this.currentChild.uuid)
  },
  watch:{
    currentChild:function(val){
      this.giveGrades(this.currentChild.uuid)
    }
  },
  methods:{
    ...mapActions(['updateDate', 'giveSubjects','giveGrades']),
    ...mapMutations(["plusWeek","minusWeek","handleSwipeR","handleSwipeL","handleSwipeWeekR","handleSwipeWeekL"]), 

      handleSwipeT(){
        return this.vision=!this.vision
      },
    },
  
}
</script>