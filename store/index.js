export const state = () => ({
    viaje: null,
    actualUser: null,
    token: null
  })
  
  export const mutations = {
    setUser (state, user) {
      state.actualUser = user
    },
    setToken (state, token) {
      state.token = token
    },
    setViaje (state, viaje){
      state.viaje = viaje
    },
  }
  export const getters = {
    getActualUser (state) {
      return state.actualUser
    }
  }