<template>
  <div class="container-fluid mt-5 mb-5">
    <div class="card border-0 rounded-4 shadow-sm">
      <!-- Header -->
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Daftar Produk</h5>
        <router-link
          to="/admin/products/create"
          class="btn btn-sm btn-success rounded-4 shadow-sm border-0"
        >
          + Tambah Produk
        </router-link>
      </div>

      <!-- Body -->
      <div class="card-body">
        <!-- Loading -->
        <div v-if="loading" class="alert alert-info text-center">
          Loading...
        </div>

        <!-- Error -->
        <div v-else-if="error" class="alert alert-danger text-center">
          Error: {{ error }}
        </div>

        <!-- Tabel Produk -->
        <div v-else>
          <div v-if="products.length > 0" class="table-responsive">
            <table class="table table-hover align-middle table-striped mb-0">
              <thead class="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Nama</th>
                  <th>Harga</th>
                  <th>Stok</th>
                  <th class="text-center" style="width: 20%">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in products" :key="p.id">
                  <td>{{ p.id }}</td>
                  <td>{{ p.name }}</td>
                  <td>Rp {{ p.price?.toLocaleString("id-ID") }}</td>
                  <td>{{ p.stock }}</td>
                  <td class="text-center">
                    <router-link
                      :to="`/admin/products/${p.id}/edit`"
                      class="btn btn-sm btn-primary rounded-4 shadow-sm border-0 me-2"
                    >
                      Edit
                    </router-link>
                    <button
                      @click="handleDelete(p.id!)"
                      class="btn btn-sm btn-danger rounded-4 shadow-sm border-0"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Jika kosong -->
          <div v-else class="alert alert-secondary text-center">
            Belum ada produk.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import { useProduct } from "../../../composables/useProduct"
import { useProductDelete } from "../../../composables/product/useProductDelete"

const { products, loading, error, fetchProducts } = useProduct()
const { removeProduct } = useProductDelete()

onMounted(() => {
  fetchProducts()
})

const handleDelete = async (id: number) => {
  if (confirm("Yakin hapus produk ini?")) {
    try {
      await removeProduct(id)
      await fetchProducts()
    } catch (err) {
      alert("Gagal menghapus produk")
      console.error(err)
    }
  }
}
</script>
