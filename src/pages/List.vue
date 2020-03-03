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
          >{{subject.name}}</td>
          <!-- <td class="text-right">{{subject.assessment}}</td>
          <td class="text-right">{{subject.assessment}}</td>
          <td class="text-right">{{subject.assessment}}</td>
          <td class="text-right">{{subject.assessment}}</td>
          <td class="text-right">{{subject.assessment}}</td>
          <td class="text-right">{{subject.assessment}}</td> -->
        </tr>
      </tbody>
    </q-markup-table>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import moment, { locale } from 'moment'

export default {
    

    data(){
        return{
            separator: 'vertical',
  
        }
    },
  computed:{
   ...mapGetters(["objectDays","subjects","objectMonth"]),
    },
  methods:{
    
  }
}
</script>

<style>
.list{
    height: 100% auto;
}
</style>