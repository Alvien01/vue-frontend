<script setup lang="ts">
import { useAuthUser } from '../../../composables/useAuthUser';
// import FooterMenu from '../../../components/FooterMenu.vue';

const user = useAuthUser();
const totalUsers = 5;
</script>

<template>
  <div class="page-container">
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

          <div class="col-md-4">
            <div class="card text-center border-0 rounded-4 shadow-sm">
              <div class="card-body py-4">
                <h6 class="text-muted">Active Sessions</h6>
                <h3 class="fw-bold">12</h3>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card text-center border-0 rounded-4 shadow-sm">
              <div class="card-body py-4">
                <h6 class="text-muted">Monthly Revenue</h6>
                <h3 class="fw-bold">$5,240</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Footer selalu di bawah dan full width -->
    <FooterMenu />
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
