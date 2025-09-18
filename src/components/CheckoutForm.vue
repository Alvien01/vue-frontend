<template>
  <div class="checkout">
    <h2 class="text-xl font-bold mb-4">Checkout</h2>
    <form @submit.prevent="handleCheckout" class="space-y-4">
      <div class="form-group">
        <label for="user_id">User ID</label>
        <input v-model="form.user_id" id="user_id" type="number" placeholder="User ID" class="input" required />
        <input v-model="form.name" type="text" class="input bg-gray-100" disabled placeholder="Nama User" />
      </div>

      <div class="form-group">
        <label for="product_id">Product ID</label>
        <input v-model="form.product_id" id="product_id" type="number" placeholder="Product ID" class="input" required />
        <input v-model="form.name" type="text" class="input bg-gray-100" disabled placeholder="Nama Produk" />
      </div>

      <div class="form-group">
        <label for="qty">Jumlah</label>
        <input v-model="form.qty" id="qty" type="number" placeholder="Quantity" class="input" required />
      </div>

      <div class="form-group">
        <label for="name">Nama Lengkap</label>
        <input v-model="form.name" id="name" type="text" placeholder="Nama Lengkap" class="input" required />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="form.email" id="email" type="email" placeholder="Email" class="input" required />
      </div>

      <div class="form-group">
        <label for="phone">No HP</label>
        <input v-model="form.phone" id="phone" type="text" placeholder="No HP" class="input" required />
      </div>

      <button type="submit" class="btn">Buat Pesanan</button>
    </form>

    <div v-if="order">
      <h3 class="mt-6 text-lg font-semibold">Order Created</h3>
      <p>Order ID: {{ order.order_id }}</p>
      <p>Total: Rp {{ order.amount }}</p>
      <button class="btn mt-2" @click="payNow">Bayar Sekarang</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import { useOrder } from "../composables/useOrder"

const { createNewOrder, order } = useOrder()

const form = reactive({
  user_id: 1,
  product_id: 3,
  qty: 1,
  name: "",
  email: "",
  phone: "",
})

const payNow = () => {
  if (!order.value) return
  const snapToken = order.value.token
  const clientKey = order.value.client_key

  const script = document.createElement("script")
  script.src = "https://app.sandbox.midtrans.com/snap/snap.js"
  script.setAttribute("data-client-key", clientKey)
  document.body.appendChild(script)

  script.onload = () => {
    // @ts-ignore
    window.snap.pay(snapToken, {
      onSuccess: function(result: any) {
        console.log("success:", result)
        alert("Pembayaran berhasil!")
      },
      onPending: function(result: any) {
        console.log("pending:", result)
        alert("Pembayaran pending")
      },
      onError: function(result: any) {
        console.error("error:", result)
        alert("Pembayaran gagal")
      },
      onClose: function() {
        alert("Kamu menutup popup tanpa menyelesaikan pembayaran")
      },
    })
  }
}

const handleCheckout = async () => {
  try {
    await createNewOrder(form)
  } catch (e) {
    console.error(e)
  }
}
</script>

<style scoped>
.form-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.form-group label {
  width: 120px;
  font-weight: 500;
  color: #333;
}

.input {
  flex: 1;
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 6px;
}

.btn {
  background: #4f46e5;
  color: white;
  padding: 10px 16px;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.btn:hover {
  background: #4338ca;
}
</style>
