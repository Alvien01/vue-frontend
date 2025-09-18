import { ref } from "vue"
import { deleteProduct } from "../../services/productService"

export function useProductDelete() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const removeProduct = async (id: number) => {
    loading.value = true
    try {
      await deleteProduct(id)
    } catch (err: any) {
      error.value = err.response?.data?.error || err.message
    } finally {
      loading.value = false
    }
  }

  return { loading, error, removeProduct }
}
