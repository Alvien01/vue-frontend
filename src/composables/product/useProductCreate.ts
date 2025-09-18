import { ref } from "vue"
import { createProduct, Product } from "../../services/productService"

export function useProductCreate() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const addProduct = async (payload: Product) => {
    loading.value = true
    try {
      await createProduct(payload)
    } catch (err: any) {
      error.value = err.response?.data?.error || err.message
    } finally {
      loading.value = false
    }
  }

  return { loading, error, addProduct }
}
