// src/services/productService.ts
import api from "./api"

export interface Product {
  id?: number
  name: string
  slug: string
  description?: string
  price?: number
  stock?: number
  image_url?: string
}

// Ambil semua produk
export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get("/api/products")
  return res.data
}

// Ambil produk berdasarkan ID
export const getProductById = async (id: number): Promise<Product> => {
  const res = await api.get(`/api/products/${id}`)
  return res.data
}

// Buat produk baru
export const createProduct = async (payload: Product): Promise<Product> => {
  const res = await api.post("/api/products", payload)
  return res.data
}

// Update produk
export const updateProduct = async (id: number, payload: Product): Promise<Product> => {
  const res = await api.put(`/api/products/${id}`, payload)
  return res.data
}

// Hapus produk
export const deleteProduct = async (id: number): Promise<{ message: string }> => {
  const res = await api.delete(`/api/products/${id}`)
  return res.data
}
