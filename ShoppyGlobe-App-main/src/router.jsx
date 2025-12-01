import React, { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const AppLayout = lazy(() => import('./pages/AppLayout.jsx'))
const Home = lazy(() => import('./pages/Home.jsx'))
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'))
const Cart = lazy(() => import('./pages/Cart.jsx'))
const Checkout = lazy(() => import('./pages/Checkout.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'product/:id', element: <ProductDetail /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: '*', element: <NotFound /> }
    ]
  }
])

export default router
