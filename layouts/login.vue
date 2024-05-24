<template>
    <v-app>
      <v-app-bar>
        <v-row class="navbar">
        <ul>
          <li><v-btn class="pa-2" color="#e00000" @click="inicio">
              <span style="text-transform: none; color: white;">Inicio</span>
            </v-btn>
          </li>
          <li><v-btn class="pa-2" color="#e00000" @click="login">
              <span style="text-transform: none; color: white;">Login</span>
            </v-btn>
          </li>
          <li>
            <v-btn class="pa-2" color="#e00000" @click="login">
              <span style="text-transform: none; color: white;">Sevicios</span>
            </v-btn>
          </li>
          <li>
            <v-btn class="pa-2" color="#e00000" @click="empresa">
              <span style="text-transform: none; color: white;">Acerca de </span>
            </v-btn>
          </li>
          <li>
            <v-btn class="pa-2" color="#e00000" @click="login">
              <span style="text-transform: none; color: white;">Contacto</span>
            </v-btn>
          </li>
        </ul>
      </v-row>
      </v-app-bar>
      <v-main>
        <v-sheet class="pa-2 ma-2" height="90vh" width="100vw" color="white">
          <v-row>
            <v-col cols="7">
              <v-row align="center" justify="center">
                <v-img :src="require('@/assets/images/logo.svg')" />
              </v-row>
            </v-col>
            <v-col cols="4" style="height: 80%!important;" align-self="center">
              <Nuxt />
            </v-col>
          </v-row>
        </v-sheet>
      </v-main>
    </v-app>
  </template>

 <script>
 export default {
  name: 'Inicio',
  name: 'ExampleComponent',
    data () {
      return {

      }
    },
    methods: {
    inicio() {
      this.$router.push('/inicio');
    },
    login () {
      this.$router.push('/')
    },
    empresa () {
      this.$router.push('/empresa')
    }
  }
  }
 
</script> 
<style>
  .navbar {
    background-color: red;
    padding: 1.3em;
  }
  .navbar ul {
    list-style-type: none;
    display: flex;
    gap: 1em;
  }
  .navbar ul li {
    display: inline;
  }
  .navbar ul li a {
    color: rgb(227, 29, 29);
    text-decoration: none;
  }
</style>