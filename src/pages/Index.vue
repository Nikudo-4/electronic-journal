<template>
  <div style="text-align:center">
  <h3>Электронный журнал</h3>
    <span >Школа № 30</span>
    <div>
      <q-btn @click="scan()">go scan</q-btn>
      <q-btn @click="info1()">INFO</q-btn>
      <div>DATA:{{dataChild}}</div>
      <div>INFO:{{info}}</div>
      <div>
        <!-- <q-btn @decode="onDecode" > dsdfsdsfd</q-btn> -->
    <qrcode-stream @decode="onDecode"></qrcode-stream>
    
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
    info:''
  }
},
components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture
  },
computed:{
  ...mapGetters(['dataChild'])
},

methods:{
  ...mapActions(['giveChild']),
  async scan(){
    cordova.plugins.barcodeScanner.scan(
        function(result){
          alert(result.text)
          this.giveChild(result)
        }
   );
  },
  info1(){
  // localStorage.getItem('store')
    let value = localStorage.getItem('store')
    this.info = value  
    alert(this.info)
  },
  async onDecode (decodedString) {
    alert(decodedString)
    this.giveChild(decodedString)
  },
}
}
</script>