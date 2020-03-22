<template>
  <div style="text-align:center">
  <h3>Электронный журнал</h3>
    <span >Школа № 30</span>
    <div>
      <q-btn clicable @click="scan()">go scan</q-btn>
      <q-btn @click="info1()">INFO</q-btn>
       
      <q-btn @click="test()">TEST scan</q-btn>
      
      <div>DATA:{{currentChild.comment}}</div>
      __________________________________
      <div>INFO:{{info}}</div>
        __________________________________
      <div>Code:{{code}}</div>
      <div>
        <!-- <q-btn @decode="onDecode" > dsdfsdsfd</q-btn> -->
      <q-btn >
        <qrcode-stream @decode="onDecode"></qrcode-stream>
      </q-btn>
    
    </div>
    </div>
  </div>
</template>

<script>
import {LocalStorage} from 'quasar'
import {mapGetters, mapActions , mapMutations} from 'vuex'
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'

import axios from 'axios'
export default {
data(){
  return{
    info:{},
    code:''
  }
},
components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture
  },
computed:{
  ...mapGetters(['currentChild'])
},

methods:{

  ...mapActions(['giveChild', 'gaveChild1']),
  async scan(){
    cordova.plugins.barcodeScanner.scan( async(result)=>{
      this.gaveChild1(result.text)
      alert('Туть')
      });
  },

  info1(){
    let value = LocalStorage.getItem('store')
    this.info = value  
    alert(this.info)
    alert(LocakStorage)
  },
  async onDecode (decodedString) {
    alert(decodedString)
    this.giveChild(decodedString)
  },
}
}
</script>