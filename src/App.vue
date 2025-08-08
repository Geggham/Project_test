<script setup>
</script>

<template>
  <header>
    <nav class="nav-buttons">
      <router-link to="/incomes" exact-active-class="active-btn" class="nav-btn">Incomes</router-link>
      <router-link to="/orders" exact-active-class="active-btn" class="nav-btn">Orders</router-link>
      <router-link to="/sales" exact-active-class="active-btn" class="nav-btn">Sales</router-link>
      <router-link to="/stocks" exact-active-class="active-btn" class="nav-btn">Stocks</router-link>
    </nav>
  </header>

  <main>
    <router-view />
  </main>
</template>

<style scoped>
header {
  background: #ffffff;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 0;
  z-index: 10;
}

.nav-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.nav-btn {
  display: inline-block;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.55rem 1.2rem;
  border-radius: 8px;
  color: #444;
  background-color: #f3f3f3;
  border: 1px solid transparent;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.nav-btn:hover {
  background-color: #e2e2e2;
  color: #222;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
}

.active-btn {
  background-color: #42b983;
  color: #fff;
  font-weight: 600;
  border-color: #3ca574;
  box-shadow: 0 3px 8px rgba(66, 185, 131, 0.3);
}
</style>
