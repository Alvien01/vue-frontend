// src/composables/useProduct.ts
import { ref } from "vue"
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  Product,
} from "../services/productService"

export function useProduct() {
  const products = ref<Product[]>([])
  const product = ref<Product | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchProducts = async () => {
    loading.value = true
    try {
      products.value = await getProducts()
    } catch (err: any) {
      error.value = err.response?.data?.error || err.message
    } finally {
      loading.value = false
    }
  }

  const fetchProduct = async (id: number) => {
    loading.value = true
    try {
      product.value = await getProductById(id)
    } catch (err: any) {
      error.value = err.response?.data?.error || err.message
    } finally {
      loading.value = false
    }
  }

  const addProduct = async (payload: Product) => {
    await createProduct(payload)
    await fetchProducts()
  }

  const editProduct = async (id: number, payload: Product) => {
    await updateProduct(id, payload)
    await fetchProducts()
  }

  const removeProduct = async (id: number) => {
    await deleteProduct(id)
    await fetchProducts()
  }

  return {
    products,
    product,
    loading,
    error,
    fetchProducts,
    fetchProduct,
    addProduct,
    editProduct,
    removeProduct,
  }
}
