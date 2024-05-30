<template>
    <v-card rounded color="#454546" class="pa-10 custom-width" style="height: 100%!important;">
      <v-card-title>
        <v-row class="rowCard fontTitle" align="center">
          Bienvenido
        </v-row>
        <v-row class="rowCard text" align="center">
          ¿A donde viajaremos hoy?
        </v-row>
      </v-card-title>
    <v-row>
      <ContenidoInicio />
    </v-row>
      <v-card-actions>
        <v-col cols="10">
          <v-row class="rowCard">
            <v-btn block class="pa-2" color="#e00000" @click="comprar">
              <span style="text-transform: none; color: white;">Buscar</span>
            </v-btn>
          </v-row>
        </v-col>
        <ToggleButton />
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  import ContenidoInicio from '~/components/inicio/ContenidoInicio.vue';
  import ToggleButton from '~/components/inicio/ToggleButton.vue'
  export default {
  name: 'Inicio',
  name: 'ExampleComponent',
    data () {
      return {

      }
    },
    components: {
      ContenidoInicio,
      ToggleButton
    },
    methods: {
    comprar() {
      this.$router.push('/inicio/tours');
    }
  }
  }
  </script>
  
  <style scoped>
  .rowCard {
    width: 60%;
    display: flex;
    justify-content: left;
    margin-top: 20px;
  }
  .fontTitle {
    font-size: 30px!important;
    color: white;
    line-height: 78px!important;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    margin-top: 0%;
  }
  .text {
    font-size: 20px!important;
    color: white;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }
  </style>