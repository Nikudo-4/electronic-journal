<template>
  <div>
  <h3>Электронный журнал</h3>
    <span >Школа № 30</span>
    <div>
    <q-btn @click="scan()">go scan</q-btn>
    </div>
  </div>
</template>

<script>
export default {

methods:{
  scan(){
    cordova.plugins.barcodeScanner.scan(
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      },
      function (error) {
          alert("Scanning failed: " + error);
      }
   );
  }
}
}
</script>