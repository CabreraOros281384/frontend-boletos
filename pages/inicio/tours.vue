<template>
  <div>
    <v-row>
      <v-data-table
        :headers="headersViaje"
        :items="viajesf"
        item-key="id"
      >
        <!-- Puedes añadir slots aquí si necesitas personalizar columnas -->
      </v-data-table>
    </v-row>
    <v-col cols="12">
      <v-row>
        <v-data-table
          :headers="headers"
          :items="usuarios"
          item-key="id"
        >
          <!-- Puedes añadir slots aquí si necesitas personalizar columnas -->
        </v-data-table>
      </v-row>
    </v-col>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  auth: false,
  data () {
    return {
      usuarios: [],
      viajesf: [],
      headersViaje: [
        {
          text: 'Lugar de salida',
          value: 'LSalida',
          align: 'center',
          sortable: true
        },
        {
          text: 'Lugar de Destino',
          value: 'LDestino',
          align: 'center',
          sortable: true
        },
      ],
      headers: [
        {
          text: 'Email',
          value: 'email',
          align: 'center',
          sortable: true
        },
        {
          text: 'nombre',
          value: 'nombre',
          align: 'center',
          sortable: true
        },
        {
          text: 'apaterno',
          value: 'apaterno',
          align: 'center',
          sortable: true
        },
        {
          text: 'amaterno',
          value: 'amaterno',
          align: 'center',
          sortable: true
        },
        {
          text: 'direccion',
          value: 'direccion',
          align: 'center',
          sortable: true
        },
        {
          text: 'telefono',
          value: 'telefono',
          align: 'center',
          sortable: true
        },
        {
          text: 'Acciones',
          value: 'acciones',
          align: 'center'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      token: state => state.token
    })
  },
  mounted () {
    this.obtenerUsuarios();
    this.obtenerViajes();
  },
  methods: {
    obtenerViajes () {
      const url = '/get-all-viajes'
      this.$axios.get(url).then((res) =>{
        console.log('response =>', res)
        if (res.data.message === 'succes'){
          this.viajesf = res.data.viajes
          console.log('viajesf =>', this.viajesf); // Comprobación adicional
        }
      }).catch((error) => {
        console.log('error => ', error)
      })
    },
    obtenerUsuarios () {
      const url = '/get-all-users'
      this.$axios.get(url).then((res) => {
        console.log('response => ', res)
        if (res.data.message === 'success') {
          this.usuarios = res.data.users
          console.log('usuarios =>', this.usuarios); // Comprobación adicional
        }
      }).catch((error) => {
        console.log('error => ', error)
      })
    }
  }
}
</script>
