import '@/styles/global.css'

import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router" // Keep react-router for v7
import { Navbar } from '@/components/common/navbar'
import { Footer } from '@/components/common/footer'
import HomePage from '@/pages/home'
import FavoritesPage from '@/pages/favorites'
import TransactionsPage from '@/pages/transactions'
import NotificationsPage from '@/pages/notifications'
import ProfilePage from '@/pages/profile'
import SettingsPage from '@/pages/settings'
import MovieDetails from '@/pages/movie/index'
import AuthPage from '@/pages/auth'
import AdminPanel from './pages/admin'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/transactions" element={<TransactionsPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
    <Footer />
  </BrowserRouter>
)