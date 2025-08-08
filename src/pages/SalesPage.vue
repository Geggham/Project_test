<template>
  <div class="container">
    <h2>Продажи</h2>

    <div class="filters">
      <input
        v-model="tempRegionFilter"
        placeholder="Фильтр по региону"
        class="filter-input"
      />
      <input
        v-model="tempCountryFilter"
        placeholder="Фильтр по стране"
        class="filter-input"
      />
      <input
        v-model="tempWarehouseFilter"
        placeholder="Фильтр по складу"
        class="filter-input"
      />
      <button @click="applyFilters" class="filter-button">Применить</button>
      <button @click="resetFilters" class="reset-button">Сбросить фильтры</button>
    </div>

    <div class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th>G Number</th>
            <th>Date</th>
            <th>Last Change</th>
            <th>Supplier Article</th>
            <th>Tech Size</th>
            <th>Barcode</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price with Disc</th>
            <th>Total Price</th>
            <th>Finished Price</th>
            <th>For Pay</th>
            <th>Warehouse</th>
            <th>Region</th>
            <th>Country</th>
            <th>Oblast</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sale in filteredSales" :key="sale.g_number">
            <td>{{ sale.g_number }}</td>
            <td>{{ sale.date }}</td>
            <td>{{ sale.last_change_date }}</td>
            <td>{{ sale.supplier_article }}</td>
            <td>{{ sale.tech_size }}</td>
            <td>{{ sale.barcode }}</td>
            <td>{{ sale.brand }}</td>
            <td>{{ sale.category }}</td>
            <td>{{ sale.price_with_disc }}</td>
            <td>{{ sale.total_price }}</td>
            <td>{{ sale.finished_price }}</td>
            <td>{{ sale.for_pay }}</td>
            <td>{{ sale.warehouse_name }}</td>
            <td>{{ sale.region_name }}</td>
            <td>{{ sale.country_name }}</td>
            <td>{{ sale.oblast_okrug_name }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="filteredSales.length === 0" class="empty-message">
      Продаж нет.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const sales = ref([]);
const key = "E6kUTYrYwZq2tN4QEtyzsbEBk3ie";

const tempRegionFilter = ref("");
const tempCountryFilter = ref("");
const tempWarehouseFilter = ref("");

const regionFilter = ref("");
const countryFilter = ref("");
const warehouseFilter = ref("");

const dateFrom = "2023-01-01";
const dateTo = "2025-12-31";
const page = 1;
const limit = 100;

async function fetchSales() {
  try {
    const res = await axios.get("http://109.73.206.144:6969/api/sales", {
      params: {
        key,
        dateFrom,
        dateTo,
        page,
        limit,
      },
    });
    sales.value = res.data.data;
  } catch (error) {
    console.error("Ошибка при получении sales", error);
  }
}

onMounted(fetchSales);

function applyFilters() {
  regionFilter.value = tempRegionFilter.value;
  countryFilter.value = tempCountryFilter.value;
  warehouseFilter.value = tempWarehouseFilter.value;
}

function resetFilters() {
  tempRegionFilter.value = "";
  tempCountryFilter.value = "";
  tempWarehouseFilter.value = "";
  regionFilter.value = "";
  countryFilter.value = "";
  warehouseFilter.value = "";
}

const filteredSales = computed(() => {
  return sales.value.filter(sale => {
    const regionMatch = sale.region_name?.toLowerCase().includes(regionFilter.value.toLowerCase());
    const countryMatch = sale.country_name?.toLowerCase().includes(countryFilter.value.toLowerCase());
    const warehouseMatch = sale.warehouse_name?.toLowerCase().includes(warehouseFilter.value.toLowerCase());

    return (
      (!regionFilter.value || regionMatch) &&
      (!countryFilter.value || countryMatch) &&
      (!warehouseFilter.value || warehouseMatch)
    );
  });
});
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

.filters {
  margin-bottom: 1.5rem;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.filter-input {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1 1 200px;
  min-width: 180px;
}

.filter-button {
  background-color: #4CAF50;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease;
}

.filter-button:hover {
  background-color: #45a049;
}

.reset-button {
  background-color: #f44336;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease;
}

.reset-button:hover {
  background-color: #e53935;
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
