import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/customers",
      name: "customers",
      component: () => import("@/views/CustomersView.vue"),
    },
    {
      path: "/employees",
      name: "employees",
      component: () => import("@/views/EmployeesView.vue"),
    },
    {
      path: "/categories",
      name: "categories",
      component: () => import("@/views/CategoriesView.vue"),
    },
    {
      path: "/shippers",
      name: "shippers",
      component: () => import("@/views/ShippersView.vue"),
    },
    {
      path: "/suppliers",
      name: "suppliers",
      component: () => import("@/views/SuppliersView.vue"),
    },
    {
      path: "/products",
      name: "products",
      component: () => import("@/views/ProductsView.vue"),
    },
    {
      path: "/orders",
      name: "orders",
      component: () => import("@/views/OrdersView.vue"),
    },
  ],
});

export default router;
