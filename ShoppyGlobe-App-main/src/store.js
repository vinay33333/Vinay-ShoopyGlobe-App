import { configureStore, createSlice } from '@reduxjs/toolkit'

const initialCart = JSON.parse(localStorage.getItem('shoppy_cart') || '[]')

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: initialCart, search: '' },
  reducers: {
    addToCart(state, action) {
      const product = action.payload
      const existing = state.items.find(i => i.id === product.id)
      if (existing) {
        existing.quantity = Math.min((existing.quantity || 1) + 1, 99)
      } else {
        state.items.push({ ...product, quantity: 1 })
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload)
    },
    setQuantity(state, action) {
      const { id, quantity } = action.payload
      const item = state.items.find(i => i.id === id)
      if (item) item.quantity = Math.max(1, quantity)
    },
    clearCart(state) {
      state.items = []
    },
    setSearch(state, action) {
      state.search = action.payload
    }
  }
})

export const { addToCart, removeFromCart, setQuantity, clearCart, setSearch } = cartSlice.actions

const store = configureStore({ reducer: { cart: cartSlice.reducer } })

store.subscribe(() => {
  const state = store.getState()
  try {
    localStorage.setItem('shoppy_cart', JSON.stringify(state.cart.items))
  } catch(e) {}
})

export default store
