<template>
  <div class="container">
    <h2>доходы</h2>

    <div class="filters">
      <input type="date" v-model="dateFrom" />
      <input type="date" v-model="dateTo" />
      <input
        type="text"
        v-model="searchWarehouse"
        placeholder="Поиск по складу..."
      />
      <button class="btn" @click="fetchData">Применить</button>
    </div>

    <div class="chart-wrapper">
      <canvas ref="chartRef"></canvas>
    </div>

    <div class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th v-for="key in tableHeaders" :key="key">{{ key }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in filteredData" :key="index">
            <td
              v-for="key in tableHeaders"
              :key="key"
              :style="highlightCell(key, row[key])"
            >
              {{ row[key] ?? '-' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <button class="btn" @click="prevPage" :disabled="page <= 1">Prev</button>
      <button class="btn" @click="nextPage">Next</button>
      <span class="page-info">Page: {{ page }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import Chart from 'chart.js/auto'

const data = ref([])
const dateFrom = ref('2023-01-01')
const dateTo = ref('2025-12-31')
const page = ref(1)
const limit = 100
const key = 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie'

const chartRef = ref(null)
let chart = null
const tableHeaders = ref([])
const searchWarehouse = ref('')

async function fetchData() {
  try {
    const res = await axios.get('http://109.73.206.144:6969/api/incomes', {
      params: {
        key,
        dateFrom: dateFrom.value,
        dateTo: dateTo.value,
        page: page.value,
        limit,
      },
    })

    data.value = res.data.data

    if (data.value.length > 0) {
      tableHeaders.value = Object.keys(data.value[0])
    } else {
      tableHeaders.value = []
    }

    drawChart()
  } catch (error) {
    console.error('Ошибка при получении данных:', error)
  }
}

function drawChart() {
  if (chart) {
    chart.destroy()
  }

  if (!chartRef.value || data.value.length === 0) return

  const ctx = chartRef.value.getContext('2d')
  const labels = data.value.map(item => item.date)
  const values = data.value.map(item => Number(item.total_price) || 0)

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Total Price',
          data: values,
          fill: false,
          borderColor: '#4CAF50',
          backgroundColor: '#4CAF50',
          tension: 0.2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Total Price',
          },
          beginAtZero: true,
        },
      },
    },
  })
}

function prevPage() {
  if (page.value > 1) {
    page.value--
    fetchData()
  }
}

function nextPage() {
  page.value++
  fetchData()
}

const filteredData = computed(() => {
  if (!searchWarehouse.value) return data.value
  return data.value.filter(row =>
    String(row.warehouse_name || '')
      .toLowerCase()
      .includes(searchWarehouse.value.toLowerCase())
  )
})

function highlightCell(key, value) {
  if (
    key === 'warehouse_name' &&
    searchWarehouse.value &&
    String(value || '')
      .toLowerCase()
      .includes(searchWarehouse.value.toLowerCase())
  ) {
    return { color: 'green', fontWeight: 'bold' }
  }
  return {}
}

onMounted(fetchData)
</script>

<style scoped>
.container {
  max-width: 75%;
  margin: 2rem auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  overflow-x: hidden;
}

h2 {
  text-align: center;
  color: #333;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

input[type='date'],
input[type='text'] {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-width: 200px;
}

.btn {
  background-color: #4CAF50;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
}

.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.btn:hover:not(:disabled) {
  background-color: #45a049;
}

.chart-wrapper {
  width: 100%;
  height: 400px;
  overflow-x: auto;
}

.chart-wrapper canvas {
  width: 100% !important;
  height: 100% !important;
}

.table-wrapper {
  overflow-x: auto;
  margin-top: 1rem;
}

.data-table {
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 0.75rem;
  text-align: left;
  border: 1px solid #e0e0e0;
  font-size: 0.95rem;
  white-space: nowrap;
}

.data-table th {
  background-color: #f5f5f5;
  font-weight: 600;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.page-info {
  font-weight: bold;
  color: #333;
}
</style>
