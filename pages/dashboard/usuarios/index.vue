<template>
  <div>
    <v-col cols="12">
      <v-row>
        <v-btn block color="#123CCC" @click="showDialog = true">
          <span style="text-transform: none; color: white;">
            Usuario nuevo
          </span>
        </v-btn>
      </v-row>
      <v-row>
        <v-data-table
          :headers="headers"
          :items="usuarios"
        >
          <template #[`item.email`]="{item}">
            <span style="font-weight: 800;">
              {{ item.email }}
            </span>
          </template>
          <template #[`item.acciones`]="{item}">
            <v-row>
              <v-col cols="6">
                <v-btn icon color="red" @click="deleteUser(item)">
                  <v-icon>mdi-trash-can</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn icon color="green" @click="updateUser(item)">
                  <v-icon>mdi-account</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </template>
        </v-data-table>
      </v-row>
      <v-dialog
        v-model="showDialog"
        persistent
        width="500"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-card-title>
            Agregar usuario
          </v-card-title>
          <v-card-text>
            <v-row width="100%">
              <v-text-field
                v-model="nombre"
                class="pa-2 ma-2"
                label="nombre"
                placeholder="Escribe tu nombre"
                outlined
                type="nombre"
              />
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row width="100%">
              <v-text-field
                v-model="apaterno"
                class="pa-2 ma-2"
                label="apaterno"
                placeholder="Escribe tu A. paterno🫚"
                outlined
                type="apaterno"
              />
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row width="100%">
              <v-text-field
                v-model="amaterno"
                class="pa-2 ma-2"
                label="amaterno"
                placeholder="Escribe tu A. materno🫚"
                outlined
                type="amaterno"
              />
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row width="100%">
              <v-text-field
                v-model="direccion"
                class="pa-2 ma-2"
                label="direccion"
                placeholder="Escribe tu direccion"
                outlined
                type="direccion"
              />
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row width="100%">
              <v-text-field
                v-model="telefono"
                class="pa-2 ma-2"
                label="telefono"
                placeholder="Escribe tu telefono"
                outlined
                type="telefono"
              />
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row width="100%">
              <v-text-field
                v-model="email"
                class="pa-2 ma-2"
                label="correo"
                placeholder="Escribe tu correo"
                outlined
              />
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row width="100%">
              <v-text-field
                v-model="password"
                class="pa-2 ma-2"
                label="password"
                placeholder="Escribe tu contraseña🫣"
                outlined
                type="password"
              />
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-col cols="6">
              <v-btn block color="green" @click="registrarUsuario">
                <span style="text-transform: none; color: white;">
                  Registrar
                </span>
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn block color="red" @click="showDialog = false">
                <span style="text-transform: none; color: white; ">
                  Cancelar
                </span>
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="showUpdate"
        persistent
        width="500"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-card-title>
            Actualizar usuario💩
          </v-card-title>
          <v-card-text>
            <v-row width="100%">
              <v-text-field
                v-model="userToUpdate.nombre"
                class="pa-2 ma-2"
                label="nombre"
                placeholder="Escribe tu nombre"
                outlined
                type="nombre"
              />
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row width="100%">
              <v-text-field
                v-model="userToUpdate.apaterno"
                class="pa-2 ma-2"
                label="apaterno"
                placeholder="Escribe tu A. paterno🫚"
                outlined
                type="apaterno"
              />
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row width="100%">
              <v-text-field
                v-model="userToUpdate.amaterno"
                class="pa-2 ma-2"
                label="amaterno"
                placeholder="Escribe tu A. materno🫚"
                outlined
                type="amaterno"
              />
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row width="100%">
              <v-text-field
                v-model="userToUpdate.direccion"
                class="pa-2 ma-2"
                label="direccion"
                placeholder="Escribe tu direccion"
                outlined
                type="direccion"
              />
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row width="100%">
              <v-text-field
                v-model="userToUpdate.telefono"
                class="pa-2 ma-2"
                label="telefono"
                placeholder="Escribe tu telefono📱"
                outlined
                type="telefono"
              />
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row width="100%">
              <v-text-field
                v-model="userToUpdate.email"
                class="pa-2 ma-2"
                label="correo"
                placeholder="Escribe tu correo"
                outlined
              />
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row width="100%">
              <v-text-field
                v-model="userToUpdate.password"
                class="pa-2 ma-2"
                label="password"
                placeholder="Escribe tu contraseña🫣"
                outlined
                type="password"
              />
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-col cols="6">
              <v-btn block color="green" @click="actualizarUsuario">
                <span style="text-transform: none; color: white;">
                  Actualizar
                </span>
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn block color="red" @click="showUpdate = false">
                <span style="text-transform: none; color: white; ">
                  Cancelar
                </span>
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="showDelete" width="300" persistent>
        <v-card>
          <v-card-title>Delete user</v-card-title>
          <v-card-text>Are you sure?</v-card-text>
          <v-card-actions>
            <v-col cols="6">
              <v-btn block color="green" @click="borrarUsuario">
                <span style="text-transform: none; color: white;">
                  Borrar
                </span>
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn block color="red" @click="showDelete = false">
                <span style="text-transform: none; color: white; ">
                  Cancelar
                </span>
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  auth: true,
  data () {
    return {
      usuarios: [],
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
      ],
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
      showUpdate: false
    }
  },
  computed: {
    ...mapState({
      token: state => state.token
    })
  },
  mounted () {
    this.obtenerUsuarios()
  },
  methods: {
    obtenerUsuarios () {
      const url = '/get-all-users'
      this.$axios.get(url).then((res) => {
        console.log('response => ', res)
        if (res.data.message === 'success') {
          this.usuarios = res.data.users
        }
      }).catch((error) => {
        console.log('error => ', error)
      })
    },
    registrarUsuario () {
      const url = '/register'
      const data = {
        email: this.email,
        password: this.password,
        nombre: this.nombre,
        apaterno: this.apaterno,
        amaterno: this.amaterno,
        direccion: this.direccion,
        telefono: this.telefono
      }
      this.$axios.post(url, data).then((res) => {
        console.log('@@@ res => ', res)
        if (res.data.message === 'User registered successfully') {
          this.showDialog = false
          this.obtenerUsuarios()
        }
      })
        .catch((error) => {
          console.log('@@@ error => ', error)
        })
    },
    borrarUsuario () {
      const url = `/users/${this.userToDelete.email}`
      console.log('@@ url => ', url)
      this.$axios.delete(url).then((res) => {
        console.log('@@ res => ', res)
        if (res.status === 204) {
          this.showDelete = false
          this.obtenerUsuarios()
        }
      })
        .catch((err) => {
          console.log('@@ err => ', err)
        })
    },
    deleteUser (user) {
      this.userToDelete = user
      this.showDelete = true
      console.log('@@ user => ', this.userToDelete)
    },
    updateUser (user) {
      this.userToUpdate = user
      this.showUpdate = true
    },
    actualizarUsuario () {
      const url = `/users/${this.userToUpdate.email}`
      console.log('@@ url => ', url)
      this.$axios.put(url, this.userToUpdate).then((res) => {
        console.log('@@ res => ', res)
        if (res.data.message === 'success') {
          this.obtenerUsuarios()
          this.showUpdate = false
        }
      })
        .catch((err) => {
          console.log('@@ err => ', err)
        })
    }
  }
}
</script>
