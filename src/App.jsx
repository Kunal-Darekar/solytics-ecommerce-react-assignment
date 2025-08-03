import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'
import Header from './components/Header'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import Cart from './components/Cart'
import { Box } from '@mui/material'

function App() {
  return (
    <CartProvider>
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Box>
    </CartProvider>
  )
}

export default App 