<template>
  <div id="nav">
    <router-link id="logo-url" to="/">
      <img id="logo" :src="iconHome" :alt="altIconHome">
    </router-link>
    <router-link to="/">Home</router-link>
    <router-link to="/pedidos">Pedidos</router-link>
  </div>
</template>

<style scoped>
#nav{
    display: flex;
    background-color: #222;
    border-bottom: 4px solid black;
    padding: 15px 50px;
    justify-content: flex-end;
    align-items: center;
}
#nav #logo-url{
    margin: auto;
    margin-left: 0;
}
#logo{  
  width: 40px;
}
#nav a{
    color: #FCBa03;
    text-decoration: none;
    margin: 12px;
    transition: .5s;
}
#nav a:hover{
    color: #fff;
}
</style>

<script>
export default {
  name: "navBar",
  props: {
    iconHome: String,
    altIconHome: String
  },
};
</script>
