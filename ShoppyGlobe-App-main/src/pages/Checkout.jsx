import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../store'
import { useNavigate } from 'react-router-dom'

export default function Checkout() {
  const items = useSelector(s => s.cart.items)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name:'', email:'', address:'' })
  const [placing, setPlacing] = useState(false)
  const total = items.reduce((sum, it) => sum + (it.price * (it.quantity||1)), 0).toFixed(2)

  function onChange(e) { setForm({...form, [e.target.name]: e.target.value }) }
  function placeOrder(e) {
    e.preventDefault()
    setPlacing(true)
    setTimeout(()=>{
      alert('Order placed')
      dispatch(clearCart())
      navigate('/')
    }, 800)
  }

  return (
    <section>
      <h2>Checkout</h2>
      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={placeOrder}>
          <label>Name<input name="name" value={form.name} onChange={onChange} required /></label>
          <label>Email<input name="email" value={form.email} onChange={onChange} type="email" required /></label>
          <label>Address<textarea name="address" value={form.address} onChange={onChange} required /></label>
          <div className="form-actions"><button className="place-order-btn" type="submit" disabled={placing}>Place Order</button></div>
        </form>
        <aside className="order-summary">
          <h3>Order Summary</h3>
          {items.length===0? <p>No items.</p> : items.map(it => <div key={it.id} className="summary-item"><strong>{it.title}</strong> x {it.quantity} - ${(it.price*(it.quantity||1)).toFixed(2)}</div>)}
          <p className="muted">Total: <strong>${total}</strong></p>
        </aside>
      </div>
    </section>
  )
}
