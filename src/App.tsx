import { Route, Routes } from 'react-router-dom'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import AboutPage from './pages/AboutPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import ContactPage from './pages/ContactPage'
import DeliveryPage from './pages/DeliveryPage'
import HomePage from './pages/HomePage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ShopPage from './pages/ShopPage'

function App() {
  return (
    <div className="min-h-screen bg-[#f8faf7] text-slate-900 antialiased dark:bg-slate-950">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:productId" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
