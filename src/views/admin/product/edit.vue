<template>
  <div class="container-fluid mt-5 mb-5">
    <div class="card border-0 rounded-4 shadow-sm">
      <div class="card-header">
        <h5 class="mb-0">Edit Produk</h5>
      </div>

      <div class="card-body">
        <div v-if="loading" class="alert alert-info text-center">
          Loading...
        </div>
        <div v-if="error" class="alert alert-danger text-center">
          {{ error }}
        </div>

        <form v-if="product" @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label class="form-label">Nama Produk</label>
            <input
              v-model="form.name"
              type="text"
              class="form-control rounded-4"
              required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Slug</label>
            <input
              v-model="form.slug"
              type="text"
              class="form-control rounded-4"
              required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Deskripsi</label>
            <textarea
              v-model="form.description"
              class="form-control rounded-4"
              rows="3"
            ></textarea>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Harga</label>
              <input
                v-model.number="form.price"
                type="number"
                class="form-control rounded-4"
              />
            </div>

            <div class="col-md-6 mb-3">
              <label class="form-label">Stok</label>
              <input
                v-model.number="form.stock"
                type="number"
                class="form-control rounded-4"
              />
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">URL Gambar</label>
            <input
              v-model="form.image_url"
              type="text"
              class="form-control rounded-4"
            />
          </div>

          <div class="d-flex justify-content-end">
            <router-link
              to="/admin/products"
              class="btn btn-light rounded-4 shadow-sm border me-2"
            >
              Batal
            </router-link>
            <button
              type="submit"
              class="btn btn-primary rounded-4 shadow-sm border-0"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useProductById } from "../../../composables/product/useProductById"
import { useProductUpdate } from "../../../composables/product/useProductUpdate"

const route = useRoute()
const router = useRouter()
const { product, fetchProduct, loading, error } = useProductById()
const { editProduct } = useProductUpdate()

const form = reactive({
  name: "",
  slug: "",
  description: "",
  price: 0,
  stock: 0,
  image_url: ""
})

onMounted(async () => {
  await fetchProduct(Number(route.params.id))
  if (product.value) {
    Object.assign(form, product.value)
  }
})

const handleSubmit = async () => {
  await editProduct(Number(route.params.id), form)
  router.push("/admin/products")
}
</script>
