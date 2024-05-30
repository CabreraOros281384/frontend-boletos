<template>
  <div>
    <b-card class="tarjeta border">
      <b-card-text class="contenido">
        <h1>Viaje Disponible</h1>
        <h3>Precio $</h3>
        Some quick example text to build on the <em>card title</em> and make up the bulk of the card's
        content.
      </b-card-text>
      <b-card-text class="contenido">A second paragraph of text in the card.</b-card-text>
      <v-btn block class="Boton" color="#e00000" @click="comprar">
        <span style="text-transform: none; color: white;">Reservar</span>
      </v-btn>
    </b-card>
    <b-card class="tarjeta border">
      <b-card-text class="contenido">
        <h1>Viaje Disponible</h1>
        <h3>Precio $</h3>
        Some quick example text to build on the <em>card title</em> and make up the bulk of the card's
        content.
      </b-card-text>
      <b-card-text class="contenido">A second paragraph of text in the card.</b-card-text>
      <v-btn block class="Boton" color="#e00000" @click="comprar">
        <span style="text-transform: none; color: white;">Reservar</span>
      </v-btn>
    </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  auth: true,
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      token: state => state.token
    })
  },
  methods: {
    comprar() {
      this.$router.push('/inicio/tours');
    },
  }
}
</script>

<style>
.tarjeta {
  background-color: rgb(217, 222, 220);
  margin-top: 20px;
}
.border {
  border: 5px solid black;
  border-radius: 10px;
}
.contenido {
  margin-right: auto;
  margin-left: 15px;
}
</style>
