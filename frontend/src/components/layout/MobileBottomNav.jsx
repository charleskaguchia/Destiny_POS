import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingCart, Timer, WalletCards } from 'lucide-react'
import { clsx } from 'clsx'

const navItems = [
  { label: 'Dash', icon: LayoutDashboard, path: '/' },
  { label: 'Inv', icon: Package, path: '/inventory' },
  { label: 'POS', icon: ShoppingCart, path: '/sales' },
  { label: 'Shift', icon: Timer, path: '/shifts' },
  { label: 'Debt', icon: WalletCards, path: '/debt' },
]

const MobileBottomNav = () => {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-xl border-t border-surface-high flex items-center justify-around px-2 z-50">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={clsx(
            'flex flex-col items-center gap-1.5 px-3 py-2 transition-all duration-200',
            location.pathname === item.path ? 'text-primary' : 'text-secondary/50'
          )}
        >
          <item.icon className={clsx(
            'w-6 h-6',
            location.pathname === item.path ? 'fill-primary/10' : ''
          )} />
          <span className="font-label font-bold text-[9px] uppercase tracking-wider">
            {item.label}
          </span>
        </Link>
      ))}
    </nav>
  )
}

export default MobileBottomNav
