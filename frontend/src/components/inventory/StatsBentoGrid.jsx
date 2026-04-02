import React from 'react'
import { Package, AlertTriangle, Clock, TrendingUp } from 'lucide-react'
import { clsx } from 'clsx'

const stats = [
  { label: 'TOTAL PRODUCTS', value: '1,248', icon: Package, color: 'bg-primary/5 text-primary' },
  { label: 'LOW STOCK ITEMS', value: '18', icon: AlertTriangle, color: 'bg-tertiary/5 text-tertiary' },
  { label: 'EXPIRING SOON', value: '5', icon: Clock, color: 'bg-secondary/5 text-secondary' },
  { label: 'VALUATION (KES)', value: '450,200', icon: TrendingUp, color: 'bg-primary/5 text-primary' },
]

const StatsBentoGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white p-6 rounded-3xl border border-surface-high flex flex-col gap-4 group hover:shadow-lg hover:shadow-surface-high/50 transition-all duration-300">
          <div className={clsx('w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110', stat.color)}>
            <stat.icon className="w-6 h-6" />
          </div>
          <div>
            <span className="font-label text-[10px] text-secondary/50 font-extrabold tracking-widest">{stat.label}</span>
            <p className="font-headline text-3xl font-extrabold text-primary mt-1 tracking-tight">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsBentoGrid
