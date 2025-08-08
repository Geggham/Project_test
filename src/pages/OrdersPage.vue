<template>
  <div class="container">
    <h2>Заказы</h2>

    <div class="filters">
      <input
        v-model="tempWarehouseFilter"
        placeholder="Фильтр по складу"
        class="filter-input"
      />
      <input
        v-model="tempRegionFilter"
        placeholder="Фильтр по региону"
        class="filter-input"
      />
      <select v-model="tempCancelFilter" class="filter-input">
        <option value="">Все</option>
        <option value="true">Отменён</option>
        <option value="false">Не отменён</option>
      </select>

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
            <th>Discount %</th>
            <th>Total Price</th>
            <th>Warehouse</th>
            <th>Region</th>
            <th>Subject</th>
            <th>Is Cancelled</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in filteredOrders" :key="order.g_number">
            <td>{{ order.g_number }}</td>
            <td>{{ order.date }}</td>
            <td>{{ order.last_change_date }}</td>
            <td>{{ order.supplier_article }}</td>
            <td>{{ order.tech_size }}</td>
            <td>{{ order.barcode }}</td>
            <td>{{ order.brand }}</td>
            <td>{{ order.category }}</td>
            <td>{{ order.discount_percent }}%</td>
            <td>{{ order.total_price }}</td>
            <td>{{ order.warehouse_name }}</td>
            <td>{{ order.oblast }}</td>
            <td>{{ order.subject }}</td>
            <td>{{ order.is_cancel ? 'Yes' : 'No' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="filteredOrders.length === 0" class="empty-message">
      Заказы не найдены.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const orders = ref([]);
const key = "E6kUTYrYwZq2tN4QEtyzsbEBk3ie";

const tempWarehouseFilter = ref("");
const tempRegionFilter = ref("");
const tempCancelFilter = ref("");

const warehouseFilter = ref("");
const regionFilter = ref("");
const cancelFilter = ref("");

async function fetchOrders() {
  try {
    const res = await axios.get("http://109.73.206.144:6969/api/orders", {
      params: {
        key,
        dateFrom: "2023-01-01",
        dateTo: "2025-12-31",
        page: 1,
        limit: 100,
      },
    });
    orders.value = res.data.data;
  } catch (error) {
    console.error("Ошибка при получении заказов", error);
  }
}

onMounted(fetchOrders);

function applyFilters() {
  warehouseFilter.value = tempWarehouseFilter.value;
  regionFilter.value = tempRegionFilter.value;
  cancelFilter.value = tempCancelFilter.value;
}

function resetFilters() {
  tempWarehouseFilter.value = "";
  tempRegionFilter.value = "";
  tempCancelFilter.value = "";
  warehouseFilter.value = "";
  regionFilter.value = "";
  cancelFilter.value = "";
}

const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    const matchesWarehouse = order.warehouse_name?.toLowerCase().includes(warehouseFilter.value.toLowerCase());
    const matchesRegion = order.oblast?.toLowerCase().includes(regionFilter.value.toLowerCase());
    const matchesCancel =
      cancelFilter.value === ""
        ? true
        : cancelFilter.value === "true"
        ? order.is_cancel === true
        : order.is_cancel === false;

    return (
      (!warehouseFilter.value || matchesWarehouse) &&
      (!regionFilter.value || matchesRegion) &&
      matchesCancel
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
}

.data-table {
  width: 100%;
  min-width: 900px;
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
  color: #333;
}

.empty-message {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 1rem;
  color: #888;
}
</style>
