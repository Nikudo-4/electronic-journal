<template>
<div class="list" >
 <q-markup-table :separator="separator" flat bordered dense
 
    >
    <!-- v-for="key2 in key" :key="key2" -->
      <thead>
        <tr style="display: inline;" v-for="(key, index) in grades" :key="index">
          <th class="text-left"></th>
          <th
          v-for="(key2, index) in key" :key="index"
          >{{key2.date}}</th>
        </tr>
      </thead>
        
      <tbody v-for="(key1, index) in grades" :key="index">
        
        <tr >
          <td class="text-left" v-for="subject in subjects" :key="subject" >{{key22.subject_name}}</td>
          <td class="text-right" v-for="(key3, index) in key22.grades" :key="index" >{{key3.grade}}</td>
        </tr>
      </tbody>
</q-markup-table> 
<!-- v-for="key3 in key2.grades" :key="key3"
v-for="subject in subjects" :key="subject" -->
</div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import moment, { locale } from 'moment'

export default {
    

    data(){
        return{
            separator: 'vertical',
            currentGrades:'',
            gradeDate:''
        }
    },
  computed:{
    // tableData(){
    //   let objGrades =this.grades
    //   for(let key in objGrades){
    //     this.gradeDate = key
    //     for(let key2 in objGrades[key]){
          
    //         console.log([])
    //       // for(let key3 in objGrades[key][key2]['grades']){
            
    //       // }
    //     }
    //   }
    // },
    
   ...mapGetters(["objectDays","subjects","grades","currentChild"]),
    },
    mounted(){
      this.tableData
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