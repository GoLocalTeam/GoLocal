
     import React from 'react';
     import { Routes, Route } from 'react-router-dom';
     import LandingPage from './pages/LandingPage';
     import Signup from './pages/Signup';
     import Login from './pages/Login';
     import Dashboard from './pages/Dashboard';
     import Profile from './pages/Profile';
     import ShopList from './components/ShopList';
     import CreateShop from './components/CreateShop';
     import ShopDetails from './components/ShopDetails';
     import ProductList from './components/ProductList';
     import ServiceList from './components/ServiceList';
     import Search from './components/Search';

     const App = () => {
       return (
         <Routes>
           <Route path="/" element={<LandingPage />} />
           <Route path="/signup" element={<Signup />} />
           <Route path="/login" element={<Login />} />
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/profile" element={<Profile />} />
           <Route path="/shops" element={<ShopList />} />
           <Route path="/create-shop" element={<CreateShop />} />
           <Route path="/shops/:shopId" element={<ShopDetails />} />
           <Route path="/products" element={<ProductList />} />
           <Route path="/services" element={<ServiceList />} />
           <Route path="/search" element={<Search />} />
         </Routes>
       );
     };

     export default App;
     