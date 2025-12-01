import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Header() {
  const count = useSelector(s => s.cart.items.reduce((sum, it) => sum + (it.quantity || 1), 0))
  return (
    <header>
      <div className="container nav">
        <h1><Link to="/" className="logo">ShoppyGlobe</Link></h1>
        <nav>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/cart">Cart <span className="cart-badge">{count}</span></NavLink>
        </nav>
      </div>
    </header>
  )
}
