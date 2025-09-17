<script setup lang="ts">
import { useLogout } from "../composables/auth/useLogout";
const logout = useLogout();
</script>

<template>
  <div class="list-group">
    <router-link to="/admin/dashboard" class="list-group-item list-group-item-action">
      Dashboard
    </router-link>
    <router-link to="/admin/users" class="list-group-item list-group-item-action">
      Users
    </router-link>
    <a href="#" @click="logout" class="list-group-item list-group-item-action">
      Logout
    </a>
  </div>
</template>
