<template>
    <v-card rounded color="#c8c8c8" class="pa-7" style="height: 100%!important;">
      <v-card-title>
        <v-row class="rowCard fontTitle" align="center">
          Inicio de sesion
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row>
          Ingrese su correo
        </v-row>
        <v-row>
          <v-text-field v-model="email" rounded label="E-mail" outlined />
        </v-row>
        <v-row>
          Ingrese su contraseña
        </v-row>
        <v-row>
          <v-text-field v-model="password" rounded label="Password" type="password" outlined />
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-col cols="10">
          <v-row class="rowCard">
            <v-btn block class="pa-2" color="#e00000" @click="login">
              <span style="text-transform: none; color: white;">Login</span>
            </v-btn>
          </v-row>
          <v-row class="rowCard">
            <span>¿No tienes una cuenta?  </span>
            <a @click="showDialog = true"> Registrate</a>
          </v-row>
        </v-col>
      </v-card-actions>
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
                placeholder="Escribe tu direccion➡️"
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
                placeholder="Escribe tu telefono📱"
                outlined
                type="telefono"
              />
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row width="100%">
              <v-text-field
                v-model="emailNuevo"
                class="pa-2 ma-2"
                label="correo"
                placeholder="Escribe tu correo🗯️"
                outlined
              />
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row width="100%">
              <v-text-field
                v-model="passwordNuevo"
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
                  Registrar📒
                </span>
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn block color="red" @click="showDialog = false">
                <span style="text-transform: none; color: white; ">
                  Cancelar🥱
                </span>
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </template>
  
  <script>
  export default {
    data () {
      return {
        email: null,
        password: null,
        emailNuevo: null,
        passwordNuevo: null,
        showDialog: false,
        nombre: null,
        apaterno: null,
        amaterno: null,
        direccion: null,
        telefono: null
      }
    },
    methods: {
      async login () {
        const sendData = {
          email: this.email,
          password: this.password
        }
        await this.$auth.loginWith('local', {
          data: sendData
        }).then(async (res) => {
          const result = await res.data
          if (result.message === 'success') {
            this.$store.commit('setToken', result.token)
            this.$router.push('/dashboard')
          }
        }).catch((err) => {
          console.log('@@@ error => ', err)
        })
      },
      registrarUsuario () {
        const url = '/register'
        const data = {
          email: this.emailNuevo,
          password: this.passwordNuevo,
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
          }
        })
          .catch((error) => {
            console.log('@@@ error => ', error)
          })
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
    line-height: 78px!important;
    font-family: 'Times New Roman', Times, serif;
  }
  </style>
  