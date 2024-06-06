<template>
  <div>
    <v-row class="navbar">
      <ul>
        <li>
          <v-btn class="pa-2" color="#e00000" @click="inicio">
            <span style="text-transform: none; color: white;">Inicio</span>
          </v-btn>
        </li>
        <li>
          <v-btn class="pa-2" color="#e00000" @click="login">
            <span style="text-transform: none; color: white;">Iniciar Secion</span>
          </v-btn>
        </li>
        <li>
          <v-btn class="pa-2" color="#e00000" @click="empresa">
            <span style="text-transform: none; color: white;">Historia</span>
          </v-btn>
        </li>
      </ul>
    </v-row>
    <v-row>
      <v-col cols="7">
        <v-row align="center" justify="center">
          <v-img :src="require('@/assets/images/logo.svg')" />
        </v-row>
      </v-col>
      <v-col cols="5">
        <v-card rounded color="#454546" class="pa-10 custom-width contenedor" style="height: 90%!important; width: 500px!important;">
          <v-card-title>
            <v-row class="rowCard fontTitle pa-2 ma-2 " align="center" height="90vh" width="100vw" color="white">
              Bienvenido
            </v-row>
            <v-row class="rowCard text" align="center">
                ¿A dónde viajaremos hoy?
            </v-row>
          </v-card-title>
          <b-row class="rowTipo">
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
          <b-row class="destinoContainer">
            <b-button-group vertical class="destino">
              <b-button class="form-destino">
                <b-form-select class="btn-destino" v-model="LSalida" :options="filteredOptionsSalida"></b-form-select>
              </b-button>
              <v-img :src="require('@/assets/images/camion.svg')" class="logo" />
              <b-button class="form-destino">
                <b-form-select class="btn-destino" v-model="LDestino" :options="filteredOptionsDestino"></b-form-select>
              </b-button>
            </b-button-group>
          </b-row>
          <b-row class="calendarios">
            <b-col v-if="showDepartureCalendar" class="calendarContainerS">
              <b-row>
                <b-button class="tSalida" variant="primary">Salida</b-button>
              </b-row>
              <b-row class="cal1">
                <input class="" type="datetime-local" v-model="FSalida" required />
              </b-row>
            </b-col>
            <b-col v-if="isRoundTrip" class="calendarContainerR">
              <b-row>
                <b-button class="tSalida" variant="primary">Regreso</b-button>
              </b-row>
              <b-row class="cal2">
                <input type="datetime-local" class="" v-model="FDestino" required />
              </b-row>
            </b-col>
          </b-row>
          <v-row class="rowCard buscar-btn">
            <v-btn block class="pa-2" color="#e00000" @click="buscar">
              <span style="text-transform: none; color: white;">Buscar</span>
            </v-btn>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-data-table :headers="headersViaje" :items="viajesf" item-key="id">
        <template #[`item.acciones`]="{ item }">
          <v-row>
            <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
              Para comprar es necesario iniciar sesión
            </b-alert>
            <b-button @click="Comprar(item)" variant="info" class="m-1">
              <v-icon>mdi-cart-outline</v-icon>
            </b-button>
          </v-row>
        </template>
      </v-data-table>
    </v-row>
  </div>
</template>

<script>
import 'vue2-datepicker/index.css';
import DatePicker from 'vue2-datepicker';
import { mapState } from 'vuex';

export default {
  components: {
    DatePicker
  },
  name: 'tourpage',
  auth: false,
  data () {
    return {
      viajesf: [],
      headersViaje: [
        { text: 'Tipo de Viaje', value: 'Tipo', align: 'center', sortable: true },
        { text: 'Horario de salida', value: 'HSalida', align: 'center', sortable: true },
        { text: 'Horario de destino', value: 'HDestino', align: 'center', sortable: true },
        { text: 'Lugar de salida', value: 'LSalida', align: 'center', sortable: true },
        { text: 'Lugar de Destino', value: 'LDestino', align: 'center', sortable: true },
        { text: 'Precio', value: 'Precio', align: 'center', sortable: true },
        { text: 'Acciones', value: 'acciones', align: 'center' }
      ],
      optionsSalida: [
        { value: 'null', text: 'Seleccione su salida' },
        { value: 'Leon', text: 'Leon' },
        { value: 'Guanajuato', text: 'Guanajuato' },
        { value: 'Irapuato', text: 'Irapuato' },
        { value: 'Salamanca', text: 'Salamanca' },
      ],
      optionsDestino: [
        { value: 'null', text: 'Seleccione el destino' },
        { value: 'Leon', text: 'Leon' },
        { value: 'Guanajuato', text: 'Guanajuato' },
        { value: 'Irapuato', text: 'Irapuato' },
        { value: 'Salamanca', text: 'Salamanca' },
      ],
      showDismissibleAlert: false,
      showLoginPrompt: false,
      NAsientos: null,
      showDepartureCalendar: false,
      Tipo: null,
      FSalida: null,
      FDestino: null,
      HDestino: null,
      HSalida: null,
      LSalida: null,
      LDestino: null,
      showDatePicker: false,
      showReturnCalendar: false,
      showDialog: false,
      userToDelete: null,
      showDelete: false,
      showUpdate: false,
      isRoundTrip: false,
      tipoSeleccionado: null // Nuevo: para almacenar el tipo de viaje seleccionado
    }
  },
  computed: {
    filteredOptionsDestino() {
      return this.optionsDestino.filter(option => option.value !== this.salida);
    },
    filteredOptionsSalida() {
      return this.optionsSalida.filter(option => option.value !== this.destino);
    },
    ...mapState({
      token: state => state.token
    })
  },
  mounted () {
    this.obtenerViajes();
  },
  methods: {
    Comprar(item) {
      if (this.token) {
        this.$router.push({ path: '/compra', query: { viaje: JSON.stringify(item) } });
      } else {
        // Mostrar el modal de inicio de sesión
        this.showDismissibleAlert = true;
      }
    },
    redirectToLogin() {
      this.showLoginPrompt = false;
      this.$router.push('/login');
    },
    inicio() {
      this.$router.push('/inicio/inicio');
    },
    login () {
      this.$router.push('/')
    },
    empresa () {
      this.$router.push('/empresa')
    },
    obtenerViajes () {
      const url = '/get-all-viajes';
      this.$axios.get(url).then((res) =>{
        console.log('response =>', res);
        if (res.data.message === 'success') {
          this.viajesf = res.data.viajes.map(viaje => ({
            ...viaje,
          }));
          console.log('viajesf =>', this.viajesf); // Comprobación adicional
        }
      }).catch((error) => {
        console.log('error => ', error);
      });
    },
    buscar() {
      if (this.tipoSeleccionado === 'Sencillo') {
        this.buscarViaje();
      } else if (this.tipoSeleccionado === 'Redondo') {
        this.buscarViajeRedondo();
      }
    },
    buscarViaje() {
      if (!this.tipoSeleccionado || !this.FSalida || !this.LSalida || !this.LDestino) {
        console.error('Debe seleccionar todos los campos requeridos');
        return;
      }

      // Convertir la fecha a cadena en formato ISO 8601
      const FSalidaISO = new Date(this.FSalida).toISOString();
      if (!FSalidaISO) {
        console.error('Fecha inválida:', this.FSalida);
        return;
      }

      const data = {
        Tipo: this.tipoSeleccionado,
        LSalida: this.LSalida,
        LDestino: this.LDestino,
        FSalida: FSalidaISO,
      };

      console.log('Enviando datos:', data);

      const url = '/buscar-viaje';
      this.$axios.post(url, data).then(res => {
        if (res.data.message === 'success') {
          this.viajesf = res.data.viajes;
          console.log('Viajes que coinciden:', this.viajesf);
        }
      }).catch(error => {
        console.error('Error en buscarViaje:', error);
        if (error.response) {
          console.error('Datos de respuesta del error:', error.response.data);
        }
      });
    },
    buscarViajeRedondo() {
      if (!this.tipoSeleccionado || !this.FSalida || !this.FDestino || !this.LSalida || !this.LDestino) {
        console.error('Debe seleccionar todos los campos requeridos');
        return;
      }

      // Convertir la fecha a cadena en formato ISO 8601
      const FSalidaISO = new Date(this.FSalida).toISOString();
      const FDestinoISO = new Date(this.FDestino).toISOString();

      if (!FSalidaISO) {
        console.error('Fecha inválida:', this.FSalida);
        return;
      }

      const data = {
        Tipo: this.tipoSeleccionado,
        LSalida: this.LSalida,
        LDestino: this.LDestino,
        FSalida: FSalidaISO,
        FDestino: FDestinoISO
      };

      console.log('Enviando datos:', data);

      const url = '/buscar-viaje-redondo';
      this.$axios.post(url, data).then(res => {
        if (res.data.message === 'success') {
          this.viajesf = res.data.viajes;
          console.log('Viajes que coinciden:', this.viajesf);
        }
      }).catch(error => {
        console.error('Error en buscarViajeRedondo:', error);
        if (error.response) {
          console.error('Datos de respuesta del error:', error.response.data);
        }
      });
    },
    setTipo(tipo) {
      this.tipoSeleccionado = tipo;
      if (tipo === 'Sencillo') {
        this.showDepartureCalendar = true;
        this.showReturnCalendar = false;
        this.isRoundTrip = false;
      } else if (tipo === 'Redondo') {
        this.showDepartureCalendar = true;
        this.showReturnCalendar = true;
        this.isRoundTrip = true;
      }
    }
  }
}
</script>


<style>
  .navbar {
    margin-left: 3px;
    background-color: red;
    padding: 1.3em;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }
  .navbar ul {
    margin-left: 70px;
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
  .rowCard {
    width: 60%;
    display: flex;
    justify-content: left;
    margin-top: 20px;
    margin-left: 15px;
  }
  .fontTitle {
    font-size: 40px!important;
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
.salida{
  width: 95%;
  display: flex;
  flex-direction: row;
}
.destino {
  background-color: aliceblue;
  border-radius: 30px;
  height: 90px;
  width: 90%;
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
  height: 50px;
  width: 10px !important;
}
.pasajeros{
  flex-direction: center;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 30px
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
  margin-block-end: 20px;
  margin-top: 20px;
  color: aliceblue;
  margin-left: 30px;
}
.pasajeroDentro{
  margin-top: 5px;
  margin-left: 2px;
  margin-right: 2px;
}
.contenedor{
  margin-top: 10px;
  border-radius: 30px;
}
.rowTipo{
  margin-left: 15px;
  margin-right: 15px;
  color: white;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.destinoContainer{
  margin-left: 45px;
  margin-right: 10px;
}
.calendarContainerS{
  background-color: aliceblue;
  margin-left: 30px;
  margin-right: 30px;
  border-radius: 8px;
}
.calendarContainerR{
  background-color: aliceblue;
  margin-left: 10px;
  margin-right: 30px;
  border-radius: 8px;
}
.tSalida{
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.buscar-btn{
  margin-top: 15px;
}
</style>