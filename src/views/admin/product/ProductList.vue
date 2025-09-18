<template>
  <div class="p-6">
    <h2 class="text-xl font-bold mb-4">Daftar Produk</h2>

    <button
      class="btn mb-4"
      @click="openForm()"
    >
      Tambah Produk
    </button>

    <table class="w-full border border-collapse">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-2 border">ID</th>
          <th class="p-2 border">Nama</th>
          <th class="p-2 border">Harga</th>
          <th class="p-2 border">Stok</th>
          <th class="p-2 border">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td class="p-2 border">{{ item.id }}</td>
          <td class="p-2 border">{{ item.name }}</td>
          <td class="p-2 border">Rp {{ item.price }}</td>
          <td class="p-2 border">{{ item.stock }}</td>
          <td class="p-2 border">
            <button class="btn-sm mr-2" @click="openForm(item)">Edit</button>
            <button class="btn-sm bg-red-500" @click="remove(item.id!)">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>

    <ProductForm
      v-if="showForm"
      :product="selectedProduct"
      @close="closeForm"
      @saved="refresh"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useProduct } from "../../../composables/useProduct"
import ProductForm from "../../../views/admin/product/ProductForm.vue"

const { products, fetchProducts, removeProduct } = useProduct()
const showForm = ref(false)
const selectedProduct = ref<any>(null)

const openForm = (product: any = null) => {
  selectedProduct.value = product
  showForm.value = true
}
const closeForm = () => {
  showForm.value = false
}
const refresh = async () => {
  await fetchProducts()
  closeForm()
}

const remove = async (id: number) => {
  if (confirm("Yakin hapus produk ini?")) {
    await removeProduct(id)
  }
}

onMounted(fetchProducts)
</script>

<style scoped>
.btn {
  background: #4f46e5;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
}
.btn-sm {
  background: #4f46e5;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
}
</style>
