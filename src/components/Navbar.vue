<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";

const routes = useRouter().getRoutes();
</script>

<template>
  <div class="navbar">
    <ul class="menu menu-horizontal mx-auto p-0">
      <li v-for="route in routes" :key="route.name">
        <RouterLink class="capitalize" :to="route.path">{{
          route.name
        }}</RouterLink>
      </li>
    </ul>
  </div>
</template>
