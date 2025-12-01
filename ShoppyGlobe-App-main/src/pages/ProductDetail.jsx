import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store'

export default function ProductDetail() {
  const { id } = useParams()
  const [state, setState] = useState({ loading: true, error: null, product: null })

  useEffect(() => {
    let mounted = true
    async function fetchProduct() {
      try {
        const res = await fetch('https://dummyjson.com/products/' + id)
        if (!res.ok) throw new Error('Network response not ok')
        const json = await res.json()
        if (mounted) setState({ loading: false, error: null, product: json })
      } catch (err) {
        if (mounted) setState({ loading: false, error: err.message, product: null })
      }
    }
    fetchProduct()
    return () => { mounted = false }
  }, [id])

  const dispatch = useDispatch()

  if (state.loading) return <p>Loading...</p>
  if (state.error) return <div className="error">Error: {state.error}</div>
  const p = state.product
  return (
    <section className="product-detail">
      <img src={p.thumbnail || (p.images && p.images[0])} alt={p.title} loading="lazy" />
      <div className="product-detail-content">
        <h2>{p.title}</h2>
        <p className="muted">{p.brand} • {p.category}</p>
        <p className="desc">{p.description}</p>
        <p><strong>Price: </strong>${p.price}</p>
        <div style={{marginTop: '1rem'}}>
          <button className="btn" onClick={() => dispatch(addToCart(p))}>Add to Cart</button>
          <Link to="/cart" className="btn" style={{marginLeft: '0.5rem'}}>Go to Cart</Link>
        </div>
      </div>
    </section>
  )
}
