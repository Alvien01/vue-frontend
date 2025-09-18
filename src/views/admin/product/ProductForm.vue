<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg w-[400px]">
      <h3 class="text-lg font-bold mb-4">
        {{ product ? "Edit Produk" : "Tambah Produk" }}
      </h3>

      <form @submit.prevent="save">
        <label class="block mb-2">Nama</label>
        <input v-model="form.name" type="text" class="input mb-3" required />

        <label class="block mb-2">Slug</label>
        <input v-model="form.slug" type="text" class="input mb-3" required />

        <label class="block mb-2">Deskripsi</label>
        <textarea v-model="form.description" class="input mb-3"></textarea>

        <label class="block mb-2">Harga</label>
        <input v-model="form.price" type="number" class="input mb-3" required />

        <label class="block mb-2">Stok</label>
        <input v-model="form.stock" type="number" class="input mb-3" required />

        <label class="block mb-2">URL Gambar</label>
        <input v-model="form.image_url" type="text" class="input mb-3" />

        <div class="flex justify-end mt-4 space-x-2">
          <button type="button" class="btn-sm bg-gray-400" @click="$emit('close')">Batal</button>
          <button type="submit" class="btn-sm">Simpan</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue"
import { useProduct } from "../../../composables/useProduct"
import type { Product } from "../../../services/productService"

const props = defineProps<{ product: Product | null }>()
const emit = defineEmits(["close", "saved"])
const { addProduct, editProduct } = useProduct()

const form = reactive<Product>({
  name: "",
  slug: "",
  description: "",
  price: 0,
  stock: 0,
  image_url: "",
})

watch(
  () => props.product,
  (val) => {
    if (val) {
      Object.assign(form, val)
    } else {
      Object.assign(form, {
        name: "",
        slug: "",
        description: "",
        price: 0,
        stock: 0,
        image_url: "",
      })
    }
  },
  { immediate: true }
)

const save = async () => {
  if (props.product) {
    await editProduct(props.product.id!, form)
  } else {
    await addProduct(form)
  }
  emit("saved")
}
</script>

<style scoped>
.input {
  width: 100%;
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 6px;
}
.btn-sm {
  background: #4f46e5;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
}
</style>
