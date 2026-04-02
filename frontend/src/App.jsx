import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AdminPage from "./pages/AdminPage";
import DashboardLayout from './components/layout/DashboardLayout'
import InventoryPage from './components/inventory/InventoryPage'
import POSPage from './components/sales/POSPage'
import SalesPage from './pages/SalesPage'
import ShiftsPage from './pages/ShiftsPage'
import DebtPage from './pages/DebtPage'
import SettingsPage from "./pages/SettingsPage";
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="sales" element={<POSPage />} />
          <Route path="sales-ledger" element={<SalesPage />} />
          <Route path="shifts" element={<ShiftsPage />} />
          <Route path="debt" element={<DebtPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
