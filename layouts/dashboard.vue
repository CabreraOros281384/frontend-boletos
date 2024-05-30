<template>
    <v-app class="barra">
      <v-navigation-drawer color="#FF6F91" class="barra">
        <v-sheet
          color="grey"
          class="pa-4"
        >
          <v-avatar class="mb-4" color="grey darken-1" size="64" />
        </v-sheet>
  
        <v-divider color="green"/>
  
        <v-list>
          <v-list-item v-for="[icon, text, ruta] in links" :key="icon" link :to="ruta">
            <v-list-item-icon>
              <v-icon>{{ icon }}</v-icon>
            </v-list-item-icon>
  
            <v-list-item-content>
              <v-list-item-title>{{ text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <v-main>
        <v-container class="py-8 px-10" fluid>
          <Nuxt />
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  export default {
    data: () => ({
      drawer: null,
      links: [
        ['mdi-account', 'este es el texto', '/dashboard/usuarios']
      ]
    })
  }
  </script>
<style>
.barra{
    width: 150px;
    font-size: 50px;
}
</style>
  