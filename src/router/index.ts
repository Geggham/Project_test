import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import OrdersPage from "../pages/OrdersPage.vue"
import SalesPage from "../pages/SalesPage.vue"
import StocksPage from "../pages/StocksPage.vue"
import IncomesPage from "../pages/IncomesPage.vue"

const routes: RouteRecordRaw[] = [
  { path: '/incomes', component: IncomesPage },
  { path: '/orders', component: OrdersPage },
  { path: '/sales', component: SalesPage },
  { path: '/stocks', component: StocksPage },
  { path: '/', redirect: '/incomes' }, 
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
