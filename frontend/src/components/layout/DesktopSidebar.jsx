import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingCart, Timer, WalletCards, Settings } from 'lucide-react'
import { clsx } from 'clsx'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { label: 'Inventory', icon: Package, path: '/inventory' },
  { label: 'Sales & POS', icon: ShoppingCart, path: '/sales' },
  { label: 'Shifts', icon: Timer, path: '/shifts' },
  { label: 'Credit (Mkopo)', icon: WalletCards, path: '/debt' },
  { label: 'Admin', icon: Settings, path: '/admin' },
]

const DesktopSidebar = () => {
  const location = useLocation()

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-surface-high flex flex-col">
      <div className="p-8 pb-12">
        <h1 className="font-headline text-2xl font-extrabold tracking-tight text-primary">
          DESTINY POS
        </h1>
        <p className="font-label text-[10px] text-secondary/60 mt-1">Editorial SME System</p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={clsx(
              'flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group',
              location.pathname === item.path
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'text-secondary/70 hover:bg-surface-low hover:text-primary'
            )}
          >
            <item.icon className={clsx(
              'w-5 h-5 transition-transform duration-200 group-hover:scale-110',
              location.pathname === item.path ? 'text-white' : 'text-secondary/40 group-hover:text-primary'
            )} />
            <span className="font-label font-bold text-xs tracking-wide">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-surface-high">
        <Link
          to="/settings"
          className="flex items-center gap-4 px-4 py-3 text-secondary/70 hover:text-primary transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span className="font-label font-bold text-xs tracking-wide">Settings</span>
        </Link>
      </div>
    </aside>
  )
}

export default DesktopSidebar
