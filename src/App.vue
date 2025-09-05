<script setup lang="ts">
import SidebarMenu from "./components/SidebarMenu.vue";
</script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
      <div class="container-fluid">
        <button
          class="btn btn-outline-light me-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
        >
          <i class="bi bi-list"></i>
        </button>
        <router-link :to="{ name: 'dashboard' }" class="navbar-brand">
          HOME
        </router-link>

        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="bi bi-person-circle fs-5"></i>
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <router-link to="/profile" class="dropdown-item">
                    My Profile
                  </router-link>
                </li>
                <li>
                  <router-link to="/settings" class="dropdown-item">
                    Settings
                  </router-link>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a href="#" class="dropdown-item">Logout</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div
      class="offcanvas offcanvas-start"
      tabindex="-1"
      id="sidebarMenu"
      aria-labelledby="sidebarMenuLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="sidebarMenuLabel">Main Menu</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <SidebarMenu />
      </div>
    </div>
    <div class="container mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>
