import { Outlet } from 'react-router-dom'
import DesktopSidebar from './DesktopSidebar'
import MobileTopBar from './MobileTopBar'
import MobileBottomNav from './MobileBottomNav'

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-surface">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DesktopSidebar />
      </div>

      {/* Mobile App Bar */}
      <div className="block lg:hidden">
        <MobileTopBar />
      </div>

      {/* Main Content Area */}
      <main className="lg:ml-72 p-6 lg:p-12 pb-24 lg:pb-12 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="block lg:hidden">
        <MobileBottomNav />
      </div>
    </div>
  )
}

export default DashboardLayout
