<template>
<div class="list">
<q-markup-table :separator="separator" flat bordered dense
    
    >
      <thead >
        <tr>
          <th class="text-left"></th>
          <th class="text-right" v-for="(objectDay, index) in objectDays.date" :key="index"
          >{{objectDay.date}}</th>
        </tr>
      </thead>
      <tbody >
        <tr v-for="(subject,id) in subjects" :key="id">
          <td class="text-left" 
          >{{subject.title}}</td>
          <td class="text-right">{{grades}}</td>
          <td class="text-right">{{grades}}</td>
          <td class="text-right">{{grades}}</td>
          <td class="text-right">{{grades}}</td>
          <td class="text-right">{{grades}}</td>
          <td class="text-right">{{grades}}</td>
          <!-- <td class="text-right">{{subject.id}}</td>
          <td class="text-right">{{subject.id}}</td>
          <td class="text-right">{{subject.id}}</td>
          <td class="text-right">{{subject.id}}</td>
          <td class="text-right">{{subject.id}}</td> -->
     
        </tr>
      </tbody>
    </q-markup-table>
</div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import moment, { locale } from 'moment'

export default {
    

    data(){
        return{
            separator: 'vertical',
            currentGrades:''
        }
    },
  computed:{
   ...mapGetters(["objectDays","subjects","grades","currentChild"]),
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
    ...mapActions(["giveSubjects","giveGrades"])
  }
}
</script>

<style>
.list{
    height: 100% auto;
}
</style>