import { ref } from "vue"
import { getProductById, Product } from "../../services/productService"

export function useProductById() {
  const product = ref<Product | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

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

  return { product, loading, error, fetchProduct }
}
