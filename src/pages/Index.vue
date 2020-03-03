<template>
  <div style="text-align:center">
  <h3>Электронный журнал</h3>
    <span >Школа № 30</span>
    <div>
      <q-btn @click="scan()">go scan</q-btn>
      <div>{{dataChild}}</div>
      <div>{{info}}</div>
      <div>
        <!-- <q-btn @decode="onDecode" > dsdfsdsfd</q-btn> -->
    <qrcode-stream @decode="onDecode"></qrcode-stream>
    
    </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions , mapMutations} from 'vuex'
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'

import axios from 'axios'
export default {
data(){
  return{
    info:null
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
 mounted() {
    // axios
    //   .get('http://193.228.162.185:9072/api/app/schoolchild/f80686d0-59a0-11ea-970b-872030887c49')
    //   .then(response => (this.info = response));
    // this.giveChild()
  },
methods:{
  ...mapActions(['giveChild']),
  async scan(){
    cordova.plugins.barcodeScanner.scan(
        function(result){
          this.giveChild(result.text)
        }
   );
  },
  async onDecode (decodedString) {
    alert(decodedString)
    this.giveChild(decodedString)
  },
}
}
</script>