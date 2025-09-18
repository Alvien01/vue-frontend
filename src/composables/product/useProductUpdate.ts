import { ref } from "vue"
import { updateProduct, Product } from "../../services/productService"

export function useProductUpdate() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const editProduct = async (id: number, payload: Product) => {
    loading.value = true
    try {
      await updateProduct(id, payload)
    } catch (err: any) {
      error.value = err.response?.data?.error || err.message
    } finally {
      loading.value = false
    }
  }

  return { loading, error, editProduct }
}
