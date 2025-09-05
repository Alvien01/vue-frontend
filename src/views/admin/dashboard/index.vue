<script setup lang="ts">
import { useAuthUser } from '../../../composables/useAuthUser';
const user = useAuthUser();
const totalUsers = 5;
</script>

<template>
  <div class="container my-5">
    <section class="mb-4">
      <h1 class="fw-bold">Dashboard</h1>
      <p class="text-muted">Ringkasan informasi aplikasi Anda</p>
    </section>
    <section class="mb-4">
      <h5>
        Selamat Datang, <strong>{{ user?.name }}</strong>
      </h5>
    </section>
    <section class="mb-5">
      <div class="row g-4">
        <div class="col-md-4">
          <div class="card text-center border-0 rounded-4 shadow-sm">
            <div class="card-body py-4">
              <h6 class="text-muted">Total Users</h6>
              <h3 class="fw-bold">{{ totalUsers }}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer class="text-center text-muted border-top pt-3">
      &copy; 2025 - Aplikasi Admin Panel
    </footer>
  </div>
</template>
