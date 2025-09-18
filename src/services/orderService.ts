// src/services/orderService.ts
import api from "./api"

export interface CheckoutRequest {
  user_id: number
  product_id: number
  qty: number
  name: string
  email: string
  phone: string
}

export const createOrder = async (payload: CheckoutRequest) => {
  // harus pakai /api/orders
  const res = await api.post("/api/orders", payload)
  return res.data
}

export const getOrderById = async (orderId: string) => {
  // harus pakai /api/orders/:order_id
  const res = await api.get(`/api/orders/${orderId}`)
  return res.data
}
