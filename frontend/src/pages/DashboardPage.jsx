import React from 'react'
import { 
  TrendingUp, Wallet, Users, AlertTriangle, Activity, 
  ArrowUpRight, ArrowDownRight, Package, Clock, ShoppingCart
} from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

const DashboardPage = () => {
  const metrics = [
    { label: 'Total Sales (Gross)', value: 'KES 154,200', change: '+12.5%', icon: ShoppingCart, color: 'text-primary' },
    { label: 'Daily Net Profit', value: 'KES 42,850', change: '+8.2%', icon: TrendingUp, color: 'text-primary', isHighlight: true },
    { label: 'Liquid Assets', value: 'KES 890,400', icon: Wallet, color: 'text-primary' },
    { label: 'Customer Debt (Mkopo)', value: 'KES 12,450', change: '+2.1%', icon: Users, color: 'text-tertiary' },
    { label: 'Supplier Payable', value: 'KES 45,000', change: '-5.0%', icon: Package, color: 'text-secondary' },
  ]

  const criticalAlerts = [
    { id: 1, name: 'Panadol Extra', issue: 'Low Stock (12 Units)', type: 'STOCK' },
    { id: 2, name: 'Lifebuoy Soap', issue: 'Expiring in 3 Days', type: 'EXPIRY' },
    { id: 3, name: 'Blue Band 500g', issue: 'Out of Stock', type: 'STOCK' },
  ]

  const recentActivity = [
    { id: 1, type: 'SALE', desc: 'Retail Sale #4521 completed', time: '2 mins ago', amount: '+ KES 1,200' },
    { id: 2, type: 'DEBT', desc: 'Payment from Mama Fatuma', time: '15 mins ago', amount: '+ KES 500' },
    { id: 3, type: 'STOCK', desc: 'Inventory adjusted for Jogoo Maize', time: '1 hour ago', amount: '- 5 Units' },
    { id: 4, type: 'PAYOUT', desc: 'Cash payout for transport', time: '2 hours ago', amount: '- KES 200' },
  ]

  const handleDownloadReport = () => {
    alert('Generating and downloading comprehensive branch report (PDF)...')
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-headline text-4xl font-extrabold text-primary tracking-tight uppercase">
            Overview
          </h1>
          <p className="text-secondary/60 mt-2 font-medium">Real-time performance metrics and critical alerts.</p>
        </div>
        <div className="flex gap-3">
          <Badge variant="primary" className="py-2 px-4">Branch: Nairobi CBD</Badge>
          <Button variant="outline" size="sm" onClick={handleDownloadReport}>Download Report</Button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {metrics.map((m, idx) => (
          <Card 
            key={idx} 
            className={`transition-all duration-200 hover:shadow-xl hover:-translate-y-1 cursor-default p-6 group border-surface-high ${
              m.isHighlight ? 'hover:bg-primary hover:text-white hover:border-transparent hover:shadow-primary/20' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                m.isHighlight ? 'bg-surface-low group-hover:bg-white/10' : 'bg-surface-low'
              }`}>
                <m.icon className={`w-5 h-5 transition-colors ${
                  m.isHighlight ? `${m.color} group-hover:text-white` : m.color
                }`} />
              </div>
              {m.change && (
                <div className={`flex items-center text-[10px] font-black transition-colors ${
                  m.change.startsWith('+') 
                    ? (m.isHighlight ? 'text-primary group-hover:text-white' : 'text-primary') 
                    : 'text-tertiary'
                }`}>
                  {m.change.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {m.change}
                </div>
              )}
            </div>
            <span className={`font-label text-[10px] font-black tracking-widest uppercase transition-colors ${
              m.isHighlight ? 'text-secondary/40 group-hover:text-white/60' : 'text-secondary/40'
            }`}>
              {m.label}
            </span>
            <p className="font-headline text-2xl font-extrabold mt-1 tracking-tight">{m.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Critical Alerts */}
        <Card className="lg:col-span-5 p-0 overflow-hidden shadow-sm">
          <div className="p-8 border-b border-surface-high flex items-center justify-between bg-tertiary/5">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-tertiary" />
              <h3 className="font-headline font-bold text-tertiary uppercase tracking-tight text-lg">Critical Alerts</h3>
            </div>
            <Badge variant="tertiary">{criticalAlerts.length} Action Items</Badge>
          </div>
          <div className="p-6 space-y-4">
            {criticalAlerts.map(alert => (
              <div key={alert.id} className="flex items-center justify-between p-4 bg-tertiary/5 border border-tertiary/10 rounded-2xl group hover:bg-tertiary/10 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-tertiary/10 text-tertiary rounded-xl flex items-center justify-center">
                    {alert.type === 'STOCK' ? <Package className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-headline font-bold text-primary">{alert.name}</p>
                    <p className="font-label text-[10px] text-tertiary font-bold uppercase tracking-widest">{alert.issue}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 scale-90">Fix Now</Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-7 p-0 overflow-hidden shadow-sm">
          <div className="p-8 border-b border-surface-high flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-primary" />
              <h3 className="font-headline font-bold text-primary uppercase tracking-tight text-lg">Recent Activity</h3>
            </div>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="p-6 space-y-2">
            {recentActivity.map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 hover:bg-surface-low rounded-2xl transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${item.type === 'SALE' ? 'bg-primary' : item.type === 'DEBT' ? 'bg-secondary' : 'bg-tertiary'}`} />
                  <div>
                    <p className="font-headline font-bold text-primary text-sm">{item.desc}</p>
                    <p className="font-label text-[9px] text-secondary/40 font-bold uppercase tracking-widest">{item.time}</p>
                  </div>
                </div>
                <span className={`font-headline font-bold text-sm ${item.amount.startsWith('+') ? 'text-primary' : 'text-tertiary'}`}>
                  {item.amount}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
