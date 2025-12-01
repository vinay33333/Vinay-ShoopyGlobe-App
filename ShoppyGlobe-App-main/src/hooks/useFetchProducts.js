import { useState, useEffect } from 'react'

export default function useFetchProducts() {
  const [data, setData] = useState({ products: [], loading: true, error: null })

  useEffect(() => {
    let mounted = true
    async function fetchData() {
      try {
        const res = await fetch('https://dummyjson.com/products')
        if (!res.ok) throw new Error('Network response not ok')
        const json = await res.json()
        if (mounted) setData({ products: json.products || [], loading: false, error: null })
      } catch (err) {
        if (mounted) setData({ products: [], loading: false, error: err.message })
      }
    }
    fetchData()
    return () => { mounted = false }
  }, [])

  return data
}
