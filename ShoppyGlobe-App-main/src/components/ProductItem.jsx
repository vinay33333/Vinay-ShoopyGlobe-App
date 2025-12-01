import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store'
import { Link } from 'react-router-dom'

export default function ProductItem({ product }) {
  const dispatch = useDispatch()
  return (
    <article className="product-card" key={product.id}>
      <Link to={`/product/${product.id}`}><img src={product.thumbnail || (product.images && product.images[0])} alt={product.title} loading="lazy" /></Link>
      <div className="product-info">
        <h3>{product.title}</h3>
        <p className="muted">{product.brand}</p>
        <p className="desc">{product.description?.slice(0,100)}{product.description && product.description.length>100 ? '...' : ''}</p>
        <div className="card-footer">
          <div className="price">${product.price}</div>
          <button className="btn" onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
        </div>
      </div>
    </article>
  )
}
