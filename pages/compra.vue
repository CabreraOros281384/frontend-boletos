<template>
  <div>
    <v-row>
      <v-col cols="3">
        <v-navigation-drawer class="menuLateral" v-model="drawer" fixed>
          <v-list>
            <v-list-item-icon>
              <v-img :src="require('@/assets/images/logo.svg')" />
            </v-list-item-icon>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">Usuario</v-list-item-title>
                <v-list-item-subtitle>{{ actualUser.nombre }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Active</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-content @click="inicio">
                <v-list-item-title>Inicio</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-content @click="login">
                <v-list-item-title>Iniciar secion en otra cuenta</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-col>
      <v-col cols="3">
        <v-card class="pasajeros">
          <v-card-title>Información de Pasajeros</v-card-title>
          <v-card-text>
            <div v-for="(pasajero, index) in pasajeros" :key="index">
              <v-text-field label="Nombre" v-model="pasajero.nombre" required></v-text-field>
              <v-text-field label="Apellido Paterno" v-model="pasajero.apellidoPaterno" required></v-text-field>
              <v-row><p>Recuerda llevar una identificación oficial</p></v-row>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="ResumenP" ref="resumenP">
          <v-card-title>Resumen del pedido</v-card-title>
          <v-card-text>
            <div v-if="viaje" id="resumen-pedido">
              <p><strong>Tipo de Viaje:</strong> {{ viaje.Tipo }}</p>
              <p><strong>Horario de Salida:</strong> {{ viaje.HSalida }}</p>
              <p><strong>Horario de Destino:</strong> {{ viaje.HDestino }}</p>
              <p><strong>Lugar de Salida:</strong> {{ viaje.LSalida }}</p>
              <p><strong>Lugar de Destino:</strong> {{ viaje.LDestino }}</p>
              <p><strong>Precio por asiento:</strong> {{ viaje.Precio }}</p>
              <p><strong>Asientos Seleccionados:</strong> {{ selectedSeats.map(seat => seat.number).join(', ') }}</p>
              <p><strong>Total de Asientos Seleccionados:</strong> {{ seatSelectionCount }}</p>
              <p><strong>Precio Total:</strong> {{ precioTotal }}</p>
              <p v-for="(pasajero, index) in pasajeros" :key="index">
                <strong>Nombre del pasajero {{ index + 1 }}:</strong> {{ pasajero.nombre }}<br />
                <strong>Apellido Paterno del pasajero {{ index + 1 }}:</strong> {{ pasajero.apellidoPaterno }}
              </p>
            </div>
            <v-alert v-else type="error">No hay viaje seleccionado.</v-alert>
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col cols="6"><v-btn block class="btn-comprar white--text" color="#E73C21" dark @click="confirmarCompra">Comprar</v-btn></v-col>
              <v-col cols="6"></v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="2">
        <v-card class="autobus" style="height: 550px!important;width: 230px;">
          <v-card-title>Seleccione sus boletos</v-card-title>
          <v-card-title>Frente del autobus</v-card-title>
          <v-card-content>
            <bus-seats @seatSelected="handleSeatSelection"></bus-seats>
          </v-card-content>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BusSeats from '~/components/BusSeats.vue';
import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';



export default {
  name: 'CompraPage',
  components: {
    BusSeats
  },
  async asyncData({ query }) {
    return {
      viaje: query.viaje ? JSON.parse(query.viaje) : null
    };
  },
  data() {
    return {
      drawer: true,
      selectedSeats: [],
      actualUser: this.$store.getters.getActualUser,
      seatSelectionCount: 0,
      precioTotal: 0,
      pasajeros: [] // Array para almacenar información de los pasajeros
    };
  },
  methods: {
    inicio() {
      this.$router.push('/inicio/inicio');
    },
    login () {
      this.$router.push('/')
    },
    handleSeatSelection(seats) {
      this.selectedSeats = seats.filter(seat => seat.selected);
      this.seatSelectionCount = this.selectedSeats.length;
      this.calcularPrecioTotal();
      this.actualizarPasajeros();
    },
    calcularPrecioTotal() {
      if (this.viaje && this.viaje.Precio) {
        this.precioTotal = this.seatSelectionCount * this.viaje.Precio;
      } else {
        this.precioTotal = 0;
      }
    },
    actualizarPasajeros() {
      const nuevosPasajeros = [];
      for (let i = 0; i < this.seatSelectionCount; i++) {
        nuevosPasajeros.push({
          nombre: '',
          apellidoPaterno: ''
        });
      }
      this.pasajeros = nuevosPasajeros;
    },
    confirmarCompra() {
      if (this.selectedSeats.length === 0) {
        alert("Seleccione al menos un asiento");
        return;
      } else {
        alert("Tu compra fue realizada, imprime tus boletos");
        setTimeout(() => {
          this.generarPDF();
        }, 1000); // Ajusta el tiempo si es necesario
        return;
      }

      // Lógica para confirmar la compra
      console.log("Asientos seleccionados:", this.selectedSeats);
      this.$router.push('/confirmacion');
    },
    generarPDF() {
      // Llama a la función para asegurarse de que los datos estén actualizados
      const doc = new JsPDF();
      doc.text(`Tipo de Viaje: ${this.viaje.Tipo}`, 10, 10);
      doc.text(`Horario de Salida: ${this.viaje.HSalida}`, 10, 20);
      doc.text(`Horario de Destino: ${this.viaje.HDestino}`, 10, 30);
      doc.text(`Lugar de Salida: ${this.viaje.LSalida}`, 10, 40);
      doc.text(`Lugar de Destino: ${this.viaje.LDestino}`, 10, 50);
      doc.text(`Precio por Asiento: ${this.viaje.Precio}`, 10, 60);
      doc.text(`Asientos Seleccionados: ${this.selectedSeats.map(seat => seat.number).join(', ')}`, 10, 70);
      doc.text(`Total de Asientos Seleccionados: ${this.seatSelectionCount}`, 10, 80);
      doc.text(`Precio Total: ${this.precioTotal}`, 10, 90);

      this.pasajeros.forEach((pasajero, index) => {
        doc.text(`Pasajero ${index + 1}: ${pasajero.nombre} ${pasajero.apellidoPaterno}`, 10, 100 + (index * 10));
      });

      doc.save('resumen_viaje.pdf');
    }
  }
};
</script>


<style scoped>
.menuLateral {
  background-color: rgb(193, 173, 173);
  height: 800px!important;
}
.btn-comprar{
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
</style>

