import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, setQuantity } from '../store'
import { Link, useNavigate } from 'react-router-dom'

function CartItem({ item, onRemove, onSetQty }) {
  return (
    <div className="cart-item">
      <img src={item.thumbnail || (item.images && item.images[0])} alt={item.title} loading="lazy" />
      <div className="cart-details">
        <h4>{item.title}</h4>
        <p className="muted">${item.price}</p>
        <div className="quantity">
          <button onClick={() => onSetQty(item.id, (item.quantity||1)-1)}>-</button>
          <span className="qty">{item.quantity}</span>
          <button onClick={() => onSetQty(item.id, (item.quantity||1)+1)}>+</button>
        </div>
      </div>
      <div className="cart-actions">
        <button className="remove-btn" onClick={() => onRemove(item.id)}>Remove</button>
      </div>
    </div>
  )
}

export default function Cart() {
  const items = useSelector(s => s.cart.items)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const total = items.reduce((sum, it) => sum + (it.price * (it.quantity||1)), 0).toFixed(2)

  function handleRemove(id) { dispatch(removeFromCart(id)) }
  function handleSetQty(id, qty) { dispatch(setQuantity({id, quantity: Math.max(1, qty)})) }

  if (items.length === 0) return (
    <section><h2>Your Cart is empty</h2><p><Link to="/">Go shopping</Link></p></section>
  )

  return (
    <section className="cart-container">
      <h2>Your Cart</h2>
      <div className="cart-list">
        {items.map(it => <CartItem key={it.id} item={it} onRemove={handleRemove} onSetQty={handleSetQty} />)}
      </div>
      <div className="cart-summary">
        <p>Total: <strong>${total}</strong></p>
        <button className="btn primary" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
      </div>
    </section>
  )
}
