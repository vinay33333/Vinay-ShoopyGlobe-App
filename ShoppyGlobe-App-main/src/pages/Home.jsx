import React from 'react'
import useFetchProducts from '../hooks/useFetchProducts'
import ProductItem from '../components/ProductItem'
import { useSelector, useDispatch } from 'react-redux'
import { setSearch } from '../store'

export default function Home() {
  const { products, loading, error } = useFetchProducts()
  const search = useSelector(s => s.cart.search)
  const dispatch = useDispatch()

  const filtered = products.filter(p => {
    const q = search.trim().toLowerCase()
    if (!q) return true
    return p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
  })

  return (
    <section>
      <div className="hero">
        <h2>Hello!! Welcome to ShoppyGlobe</h2>
        <p>Simple e-commerce application</p>
      </div>

      <div className="controls">
        <input placeholder="Search products..." value={search} onChange={(e)=>dispatch(setSearch(e.target.value))} />
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p className="error">Failed to load products: {error}</p>}

      <div className="product-list">
        {filtered.map(p => <ProductItem key={p.id} product={p} />)}
      </div>
    </section>
  )
}
