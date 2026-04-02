import React from 'react'
import Button from '../components/ui/Button'

const SalesPage = () => {
  const handleExport = () => {
    alert('Exporting sales ledger as CSV...')
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-headline text-4xl font-extrabold text-primary tracking-tight uppercase">
            Sales
          </h1>
          <p className="text-secondary/60 mt-2 font-medium">Monitor and manage all sale transactions.</p>
        </div>
        <Button variant="outline" onClick={handleExport}>EXPORT LEDGER</Button>
      </div>
      <div className="bg-white rounded-3xl p-12 border border-surface-high shadow-sm flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-surface-low rounded-2xl flex items-center justify-center mb-6">
          <span className="text-3xl text-primary/30">📊</span>
        </div>
        <h2 className="text-2xl font-headline font-bold text-primary mb-2">Sales Ledger Coming Soon</h2>
        <p className="text-secondary/60 max-w-md mx-auto">This page will display historical sales data, transaction breakdowns, and daily revenue reports.</p>
      </div>
    </div>
  )
}

export default SalesPage
