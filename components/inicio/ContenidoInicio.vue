<template>
  <b-container>
    <b-row>
      <b-col>
        <v-btn block class="pa-2" color="#666666" variant="primary" @click="toggleDatePicker('one-way')">
          <span style="text-transform: none; color: white;">Sencillo</span>
        </v-btn>
      </b-col>
      <b-col>
        <v-btn block class="pa-2" color="#666666" variant="primary" @click="toggleDatePicker('round-trip')">
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
          <date-picker v-model="selectedDate"></date-picker>
        </b-row>
      </b-col>
      <b-col v-if="isRoundTrip" class="pa-2 ori2">
        <b-row>
          <b-button class="comprarbtn " variant="primary">Regreso</b-button>
        </b-row>
        <b-row class="cal2">
          <date-picker v-if="showReturnCalendar" v-model="returnDate"></date-picker>
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
</template>

<script>
import 'vue2-datepicker/index.css';
import DatePicker from 'vue2-datepicker';

export default {
  components: {
    DatePicker
  },
  data() {
    return {
      salida: null,
      destino: null,
      numero: null,
      value: null,
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
        options: [
          { value: '1', text: '1' },
          { value: '2', text: '2' },
          { value: '3', text: '3' },
          { value: '4', text: '4' },
    ],
      showDepartureCalendar: false,
      showReturnCalendar: false,
      isRoundTrip: false,
      selectedDate: null,
      returnDate: null,
    };
  },
  computed: {
    filteredOptionsSalida() {
      return this.optionsSalida.filter(option => option.value !== this.destino);
    },
    filteredOptionsDestino() {
      return this.optionsDestino.filter(option => option.value !== this.salida);
    },
    filteredOptionsPasajeros(){
      return this.optionsNumero.filter(option => option.value !== this.numero);
    }
  },
  methods: {
    toggleDatePicker(type) {
      if (type === 'one-way') {
        this.showDepartureCalendar = true;
        this.showReturnCalendar = false;
        this.isRoundTrip = false;
      } else if (type === 'round-trip') {
        this.showDepartureCalendar = true;
        this.showReturnCalendar = true;
        this.isRoundTrip = true;
      }
    }
  }
};
</script>

<style scoped>
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
  width: 45px;
  height: 60px;
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
