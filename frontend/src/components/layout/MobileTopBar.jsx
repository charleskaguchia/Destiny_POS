import { Menu, Search } from 'lucide-react'

const MobileTopBar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-surface-high flex items-center justify-between px-6 z-50">
      <div className="flex items-center gap-4">
        <button className="p-2 text-secondary">
          <Menu className="w-6 h-6" />
        </button>
        <span className="font-headline font-bold text-lg text-primary tracking-tight">
          DESTINY POS
        </span>
      </div>
      <button className="p-2 text-secondary">
        <Search className="w-6 h-6" />
      </button>
    </header>
  )
}

export default MobileTopBar
