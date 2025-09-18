import { ref } from "vue"
import { getProducts, Product } from "../../services/productService"

export function useProducts() {
  const products = ref<Product[]>([])
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

  return { products, loading, error, fetchProducts }
}
