// src/composables/useOrder.ts
import { ref } from "vue"
import { createOrder, getOrderById, CheckoutRequest } from "../services/orderService"

export function useOrder() {
  const order = ref<any>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const createNewOrder = async (payload: CheckoutRequest) => {
    loading.value = true
    error.value = null
    try {
      const data = await createOrder(payload)
      order.value = data
      return data
    } catch (err: any) {
      error.value = err.response?.data?.error || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchOrderById = async (orderId: string) => {
    loading.value = true
    error.value = null
    try {
      const data = await getOrderById(orderId)
      order.value = data
      return data
    } catch (err: any) {
      error.value = err.response?.data?.error || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    order,
    loading,
    error,
    createNewOrder,
    fetchOrderById,
  }
}
