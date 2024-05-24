<template>
    <div>
      <b-button variant="primary" @click="toggleDatePicker">Mostrar Calendario</b-button>
      <date-picker v-if="showDatePicker" v-model="selectedDate"></date-picker>
    </div>
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
        showDatePicker: false,
        selectedDate: null
      };
    },
    methods: {
      toggleDatePicker() {
        this.showDatePicker = !this.showDatePicker;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos adicionales si es necesario */
  </style>
  