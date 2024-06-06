<template>
    <div>
        <div class="bus-seats">
            <div v-for="(seat, index) in seats" :key="index" :class="['seat', { selected: seat.selected }]" @click="selectSeat(index)">
            {{ seat.number }}
            </div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        seats: Array.from({ length: 40 }, (_, i) => ({
          number: i + 1,
          selected: false
        }))
      };
    },
    methods: {
      selectSeat(index) {
        this.seats[index].selected = !this.seats[index].selected;
        this.$emit('seatSelected', this.seats);
      }
    }
  };
  </script>
  
  <style scoped>
  .bus-seats {
    height: 100px;
    width: 130px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    padding: 10px;
  }
  .seat {
    width: 30px;
    height: 30px;
    background-color: #e74646;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .seat.selected {
    background-color: #4caf50;
    color: white;
  }
  </style>
  