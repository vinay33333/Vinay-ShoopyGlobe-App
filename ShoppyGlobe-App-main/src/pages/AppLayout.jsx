import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header.jsx'

export default function AppLayout() {
  return (
    <div>
      <Header />
      <main className="container" style={{paddingTop: '1rem'}}>
        <Outlet />
      </main>
    </div>
  )
}
