<template>
  <div style="text-align:center">
  <h3>Электронный журнал</h3>
    <div class="q-pb-mb">

    <span >Школа № 30</span>
    </div>
    <div>
      <q-btn clicable @click="scan()" no-caps >Сканировать</q-btn>

      <q-btn @click="giveChild3()">SCAN TEST</q-btn>
       
      <div>DATA:{{currentChild.uuid}}</div>
       __________________________________
       <div>INFO:{{info}}</div>
<!--        
      <div>LOCAL:{{local}}</div>
        <q-btn @click="localStor" > setItem</q-btn>
        <q-btn @click="localStor1" > getItem</q-btn>
         -->
        <!-- __________________________________  -->

      <!-- <div>Code:{{code}}</div> 
      <div> -->
      <q-btn >
        <qrcode-stream @decode="onDecode"></qrcode-stream>
      </q-btn>
    
    </div>
    </div>
</template>

<script>
//import {LocalStorage} from 'quasar'

import {mapGetters, mapActions , mapMutations} from 'vuex'
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'

import axios from 'axios'
export default {
beforeCreate(){
     this.$store.commit('initialiseStore');
    // this.initialiseStore()
},
  
data(){
  return{
    info:{},
    code:'',
    local: '',
  }
},
// mounted(){
//   localStorage.setItem("name", 1)
//  this.local = localStorage.getItem("name1")
// },

components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture
  },
computed:{
  ...mapGetters(['currentChild'])
},
watch:{
  code: function(val){
    this.code = val
    this.giveChild(val)
    this.$router.push('/week');
  }
},

methods:{

  ...mapActions(['giveChild', 'gaveChild1','giveChild2','addQR', 'initialiseStore']),
  async scan(){
    cordova.plugins.barcodeScanner.scan( async(result)=>{
      
      this.code = result.text

      });

  },

  // info1(){
  //   let value = window.localStorage.getItem('store')
  //   this.info = value  
  //   alert(this.info)
  //   alert(window.localStorage)
  // },
  giveChild3(){
    this.giveChild2()
  },

  localStor(){
    localStorage.setItem("name1",this.local)
  
  },
   localStor1(){

    this.local += localStorage.getItem("name1")
  },
  async onDecode (decodedString) {
    this.code = decodedString
     this.giveChild(decodedString)
  
  },
}
}
</script>