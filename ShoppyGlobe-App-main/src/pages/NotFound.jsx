import React from 'react'
import { Link, useLocation } from 'react-router-dom'
export default function NotFound() {
  const loc = useLocation()
  return (
    <section className="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The requested URL <code>{loc.pathname}</code> could not be found on this server.</p>
      <p>If you followed a broken link, please report it.</p>
      <p><Link to="/">Back to Home</Link></p>
    </section>
  )
}
