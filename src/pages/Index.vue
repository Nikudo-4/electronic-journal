<template>
  <div style="text-align:center">
    <div class="q-pt-lg"> 
      <h3 >Электронный дневник</h3>
    </div>
    <div class="q-pb-mb">
      <div class="q-pb-lg">
          <span>Школа № 30</span> 
      </div>
    <!-- <span >версия 2</span> -->
    </div>
    <div>
      <q-btn clicable @click="scan()" no-caps >Сканировать</q-btn>

       
      <!-- <div>L:{{local1}}</div>
       __________________________________ -->
       <!-- <div>INFO:{{currentChild}}</div>
      <q-btn @click="giveChild2()">SCAN TEST</q-btn>
      <q-btn @click="initialiseStore()">initialiseStore</q-btn> -->
<!--        
      <div>LOCAL:{{local}}</div>
        <q-btn @click="localStor" > setItem</q-btn>
        <q-btn @click="localStor1" > getItem</q-btn>
         -->
        <!-- __________________________________  -->

      <!-- <div>Code:{{code}}</div> 
      <div> -->
      <!-- <q-btn >
        <qrcode-stream @decode="onDecode"></qrcode-stream>
      </q-btn> -->
    
    </div>
    </div>
</template>

<script>
//import {LocalStorage} from 'quasar'

import {mapGetters, mapActions , mapMutations} from 'vuex'
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'

import axios from 'axios'
export default {
// beforeCreate(){
//   this.$store.commit('initialiseStore');  
// },
        
data(){
  return{
    info:{},
    code:'',
    local: '',
  }
},
// mounted(){
//   this.$store.commit('initialiseStore');
// },

components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture
  },
computed:{
  ...mapGetters(['currentChild']),
  local1(){
    let a
    return a = JSON.parse(localStorage.getItem('store'))
  }
},
watch:{
  code: function(val){
    this.code = val
    this.giveChild(val)
    this.$router.push('/week');
  }
},

methods:{

  ...mapActions(['giveChild', 'gaveChild1','giveChild2','addQR', ]),
  async scan(){
    cordova.plugins.barcodeScanner.scan( async(result)=>{
      
      this.code = result.text

      });
    

  },
  initialiseStore(){
        console.log(this.$store.state.school)
        this.$store.state.commit('initialiseStore');
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