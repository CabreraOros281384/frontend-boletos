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
      <b-container>
    <b-row>
      <b-col>
        <v-btn block class="pa-2" color="#666666" variant="primary" @click="setTipo('Sencillo')">
          <span style="text-transform: none; color: white;">Sencillo</span>
        </v-btn>
      </b-col>
      <b-col>
        <v-btn block class="pa-2" color="#666666" variant="primary" @click="setTipo('Redondo')">
          <span style="text-transform: none; color: white;">Redondo</span>
        </v-btn>
      </b-col>
    </b-row>
    <b-row>
      <b-button-group vertical class="destino">
          <b-button class="form-destino">
            <b-form-select class="btn-destino" v-model="salida" :options="filteredOptionsSalida">
            </b-form-select>
          </b-button>
          <v-img :src="require('@/assets/images/camion.svg')" class="logo" />
          <b-button class="form-destino">
            <b-form-select class="btn-destino" v-model="destino" :options="filteredOptionsDestino"></b-form-select>
          </b-button>
      </b-button-group>
    </b-row>
    <b-row class="calendarios">
      <b-col v-if="showDepartureCalendar" class="pa-2 ori">
        <b-row>
          <b-button class="comprarbtn" variant="primary">Salida</b-button>
        </b-row>
        <b-row class="cal1">
          <input type="datetime-local" v-model="FSalida" required />
        </b-row>
      </b-col>
      <b-col v-if="isRoundTrip" class="pa-2 ori2">
        <b-row>
          <b-button class="comprarbtn " variant="primary">Regreso</b-button>
        </b-row>
        <b-row class="cal2">
          <input type="datetime-local" v-model="FDestino" required />
        </b-row>
      </b-col>
    </b-row>
    <b-row class="pasajeros">
      <b-button-group  class="pasajero-btn">
          <template>
            <div class="pasajeroDentro">
              <label for="demo-sb">Seleccione sus Boletos</label>
                <b-form-spinbutton id="demo-sb" v-model="value" min="1" max="40"></b-form-spinbutton>
              </div>
          </template>
    
    </b-button-group>
      </b-row>
    <b-row>
      <div class="equipaje">
      <b-form-radio name="radio-size" size="lg"> Agregar equipaje extra, con costo adicionla</b-form-radio>
    </div>
    </b-row>
  </b-container>
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
        showDepartureCalendar: false,
        FSalida: null,
        FDestino: null,
        Precio: null,
        HDestino: null,
        HSalida: null,
        LSalida: null,
        LDestino: null,
        showDatePicker: false,
        showDialog: false,
        email: null,
        password: null,
        userToDelete: null,
        showDelete: false,
        nombre: null,
        apaterno: null,
        amaterno: null,
        direccion: null,
        telefono: null,
        userToUpdate: {},
        showUpdate: false,
        tipoSeleccionado: null, // Nuevo: para almacenar el tipo de viaje seleccionado
        showDepartureCalendar: false,
        showReturnCalendar: false,
        isRoundTrip: false,

      }
    },
    components: {
      ContenidoInicio,
      ToggleButton
    },
    methods: {
    comprar() {
      this.$router.push('/inicio/tours');
    },
    setTipo(tipo) {
    this.tipoSeleccionado = tipo;
    if (tipo === 'Sencillo') {
        this.showDepartureCalendar = true;
        this.showReturnCalendar = false;
        this.isRoundTrip = false;
      } else if (type === 'Redondo') {
        this.showDepartureCalendar = true;
        this.showReturnCalendar = true;
        this.isRoundTrip = true;
      }
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
  .comprarbtn {
  color: whitesmoke;
}
.salida{
  width: 95%;
  display: flex;
  flex-direction: row;
}
.cal1 {
  width: 95%;
  display: flex;
  flex-direction: center;
  justify-content: center;
  align-items: center;
}
.cal2 {
  width: 95%;
  display: flex;
  flex-direction: center;
  justify-content: center;
  align-items: center;
}
.destino {
  background-color: aliceblue;
  border-radius: 30px;
  height: 90px;
  width: 100%;
  display: flex;
  flex-direction: center;
  justify-content: center;
  align-items: center;
}
.form-destino {
  margin-right: 25px;
  margin-left: 25px;
  font-size: 15px;
}
.btn-destino {
  color: black !important;
  text-align: center;
}
.logo{
  display: flex;
  flex-direction: center;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 30px;
}
.pasajeros{
  flex-direction: center;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}
.pasajero-btn{
  background-color: aliceblue;
  border-radius: 15px;
  height: 60px;
  width: 100%;
  margin-top: 3px;
  text-align: center;
}
.calendarios{
  height: 60px;
  margin-top: 20px;
  flex-direction: center;
  justify-content: center;
  align-items: center;
}
.ori{
  margin-left: 6px;
}
.equipaje{
  margin-top: 20px;
  color: aliceblue;
  margin-left: 15px
}
.pasajeroDentro{
  margin-top: 5px;
  margin-left: 20px;
  margin-right: 20px;
}
  </style>