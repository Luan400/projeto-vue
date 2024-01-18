<template>
<Banner/>
  <div class="main-container">
    <h1>Monte o seu Taco:</h1>
 <TacoForm/>
  </div>
</template>

<style scoped></style>

<script>

import Banner from "../components/Banner.vue"
import TacoForm from "../components/TacoForm.vue"

export default {
  name: 'Home',
  components: {
    Banner,
    TacoForm
  }
}
 
</script>
