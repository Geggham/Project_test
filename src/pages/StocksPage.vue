<template>
  <div class="container">
    <h2>Остатки</h2>

    <div class="date-picker">
      <label for="dateFrom">Дата: </label>
      <input id="dateFrom" type="date" v-model="dateFrom" />
      <button @click="fetchStocks">Загрузить</button>
    </div>

    <div class="table-wrapper" v-if="stocks.length > 0">
      <table class="data-table">
        <thead>
          <tr>
            <th v-for="key in tableHeaders" :key="key">{{ key }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in stocks" :key="index">
            <td v-for="key in tableHeaders" :key="key">{{ row[key] ?? '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="empty-message">
      Остатков нет.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const stocks = ref([])
const key = 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie'

const today = new Date().toISOString().slice(0, 10)
const dateFrom = ref(today)

const tableHeaders = ref([])

async function fetchStocks() {
  try {
    const res = await axios.get('http://109.73.206.144:6969/api/stocks', {
      params: {
        key,
        dateFrom: dateFrom.value
      }
    })
    stocks.value = res.data.data

    if (stocks.value.length > 0) {
      tableHeaders.value = Object.keys(stocks.value[0])
    }
  } catch (error) {
    console.error('Ошибка при получении stocks', error)
  }
}

onMounted(fetchStocks)
</script>

<style scoped>
.container {
  max-width: 75%;
  margin: 2rem auto;
  padding: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  overflow-x: hidden;
}

h2 {
  text-align: center;
  color: #333;
}

.date-picker {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

input[type="date"] {
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 0.5rem 1rem;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #66b1ff;
}

.table-wrapper {
  overflow-x: auto;
  margin-top: 1.5rem;
}

.data-table {
  width: 100%;
  min-width: 75%;
  border-collapse: collapse;
  font-size: 14px;
}

.data-table th,
.data-table td {
  padding: 0.75rem;
  text-align: left;
  border: 1px solid #e0e0e0;
  white-space: nowrap;
}

.data-table th {
  background-color: #f5f5f5;
  font-weight: 600;
  color: #333;
}

.empty-message {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 1rem;
  color: #888;
}
</style>
