<template>
  <navBar :iconHome="iconHome" :altIconHome="altIconHome" />
  <RouterView/>
  <foot/>
</template>
<style>
body{
  font-family: Helvetica;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  box-sizing: border-box;
}
.main-container{
  margin: 50px;
  min-height: 550px;
}
h1{
  text-align: center;
  font-size: 42px;
  margin-bottom: 30px;
  color: #222;
}
</style>

<script>
import navBar from "./components/Nav-bar.vue";
import foot from "./components/Footer.vue";

export default {
  components: {
    navBar,
    foot
  },
  data() {
    return {
      iconHome: 'public/img/logo.png',
      altIconHome: 'Logo'
    };
  },
};
</script>
