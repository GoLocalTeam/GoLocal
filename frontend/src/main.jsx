import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
// Placeholder imports for Dashboard and Listings
import Dashboard from '../pages/Dashboard'
import ShopList from './components/ShopList'
import ServiceList from './components/ServiceList'
import ProductList from './components/ProductList'
import Profile from '../pages/Profile'
import MyShops from './components/MyShops'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="my-shops" element={<MyShops />} />
          <Route path="shops" element={<ShopList />} />
          <Route path="services" element={<ServiceList />} />
          <Route path="products" element={<ProductList />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<LandingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
