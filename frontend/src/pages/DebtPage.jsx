import React, { useState } from 'react'
import { UserPlus, Search, WalletCards, ArrowDownLeft, ArrowUpRight, Plus, History, X } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Badge from '../components/ui/Badge'

const DebtPage = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Mama Fatuma', phone: '0712345678', balance: 450, status: 'Active' },
    { id: 2, name: 'Baba James', phone: '0722334455', balance: 2150, status: 'Overdue' },
    { id: 3, name: 'Teacher Kamau', phone: '0733112233', balance: 0, status: 'Active' },
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [paymentAmount, setPaymentAmount] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', balance: 0, status: 'Active' })

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.phone.includes(searchTerm)
  )

  const handleAddPayment = () => {
    if (!selectedCustomer || !paymentAmount) return
    
    const amount = Number(paymentAmount)
    setCustomers(prev => prev.map(c => {
      if (c.id === selectedCustomer.id) {
        const newBalance = Math.max(0, c.balance - amount)
        return { 
          ...c, 
          balance: newBalance,
          status: newBalance === 0 ? 'Active' : c.status 
        }
      }
      return c
    }))
    
    setSelectedCustomer(prev => {
      const newBalance = Math.max(0, prev.balance - amount)
      return { 
        ...prev, 
        balance: newBalance,
        status: newBalance === 0 ? 'Active' : prev.status
      }
    })
    setPaymentAmount('')
  }

  const handleClearCredit = () => {
    if (!selectedCustomer) return
    if (window.confirm(`Clear entire credit balance for ${selectedCustomer.name}?`)) {
      setCustomers(prev => prev.map(c => 
        c.id === selectedCustomer.id ? { ...c, balance: 0, status: 'Active' } : c
      ))
      setSelectedCustomer(prev => ({ ...prev, balance: 0, status: 'Active' }))
    }
  }

  const handleAddCustomer = (e) => {
    e.preventDefault()
    setCustomers([...customers, { ...newCustomer, id: Date.now() }])
    setIsModalOpen(false)
    setNewCustomer({ name: '', phone: '', balance: 0, status: 'Active' })
  }

  const handleExport = () => {
    alert('Exporting customer debt ledger as CSV...')
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 h-[calc(100vh-12rem)] flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-headline text-4xl font-extrabold text-primary tracking-tight uppercase">
            Credit (Mkopo)
          </h1>
          <p className="text-secondary/60 mt-2 font-medium">Manage customer accounts and outstanding debt ledgers.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleExport}>EXPORT</Button>
          <Button onClick={() => setIsModalOpen(true)}>
            <UserPlus className="w-5 h-5" />
            <span>REGISTER NEW CUSTOMER</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 overflow-hidden">
        {/* Customer List */}
        <Card className="lg:col-span-4 flex flex-col p-0 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-surface-high">
            <Input 
              icon={Search} 
              placeholder="SEARCH CUSTOMERS..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredCustomers.map(customer => (
              <button 
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                className={`w-full p-6 text-left border-b border-surface-high transition-all flex items-center justify-between group ${selectedCustomer?.id === customer.id ? 'bg-primary/5 border-l-4 border-l-primary' : 'hover:bg-surface-low'}`}
              >
                <div>
                  <p className="font-headline font-bold text-primary">{customer.name}</p>
                  <p className="font-label text-[9px] text-secondary/40 font-bold uppercase tracking-widest">{customer.phone}</p>
                </div>
                <div className="text-right">
                  <p className={`font-headline font-bold ${customer.balance > 0 ? 'text-tertiary' : 'text-primary/40'}`}>
                    KES {customer.balance.toLocaleString()}
                  </p>
                  <Badge variant={customer.status === 'Active' ? 'primary' : 'tertiary'} className="scale-75 origin-right">
                    {customer.status}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Debt Ledger Details */}
        <div className="lg:col-span-8 flex flex-col gap-6 overflow-hidden">
          {selectedCustomer ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-primary text-white border-none p-8 flex flex-col justify-between">
                  <span className="font-label text-[10px] font-black tracking-[0.2em] uppercase opacity-60">Total Outstanding Balance</span>
                  <p className="font-headline text-5xl font-extrabold mt-4 tracking-tight">
                    KES {selectedCustomer.balance.toLocaleString()}
                  </p>
                </Card>
                <Card className="p-8">
                  <h3 className="font-label text-[10px] font-black text-secondary/40 tracking-[0.2em] uppercase mb-6">Record Repayment</h3>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Input 
                        placeholder="0.00" 
                        type="number" 
                        value={paymentAmount}
                        onChange={e => setPaymentAmount(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleAddPayment} disabled={!paymentAmount}>RECORD</Button>
                    {selectedCustomer.balance > 0 && (
                      <Button variant="tertiary" onClick={handleClearCredit}>CLEAR</Button>
                    )}
                  </div>
                </Card>
              </div>

              <Card className="flex-1 overflow-hidden flex flex-col p-0">
                <div className="p-8 border-b border-surface-high flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <History className="w-5 h-5 text-secondary/40" />
                    <h3 className="font-headline font-bold text-primary uppercase tracking-tight">Transaction History</h3>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4" />
                    <span>ADD CREDIT SALE</span>
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-8">
                  <div className="space-y-6">
                    {/* Mock History */}
                    {[
                      { type: 'CREDIT', amount: 450, date: '2026-03-28', note: '2kg Jogoo Maize Meal' },
                      { type: 'PAYMENT', amount: 200, date: '2026-03-25', note: 'Partial repayment' },
                      { type: 'CREDIT', amount: 150, date: '2026-03-20', note: '1kg Sugar, 1 Matchbox' },
                    ].map((txn, idx) => (
                      <div key={idx} className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${txn.type === 'CREDIT' ? 'bg-tertiary/10 text-tertiary' : 'bg-primary/10 text-primary'}`}>
                            {txn.type === 'CREDIT' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="font-headline font-bold text-primary">{txn.note}</p>
                            <p className="font-label text-[9px] text-secondary/40 font-bold uppercase tracking-widest">{txn.date}</p>
                          </div>
                        </div>
                        <p className={`font-headline font-bold ${txn.type === 'CREDIT' ? 'text-tertiary' : 'text-primary'}`}>
                          {txn.type === 'CREDIT' ? '+' : '-'} KES {txn.amount.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </>
          ) : (
            <div className="bg-white rounded-3xl border border-surface-high flex-1 flex flex-col items-center justify-center text-center p-20 opacity-50">
              <div className="w-20 h-20 bg-surface-low rounded-3xl flex items-center justify-center mb-8">
                <WalletCards className="text-secondary/20 w-10 h-10" />
              </div>
              <h2 className="text-2xl font-headline font-bold text-primary mb-2">Select a Customer</h2>
              <p className="text-secondary/60 max-w-xs mx-auto text-sm">Choose a customer from the left list to view their full debt ledger and record payments.</p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <Card className="w-full max-w-md animate-in zoom-in duration-200 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-headline text-2xl font-extrabold text-primary uppercase tracking-tight">
                New Customer Account
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-surface-low rounded-xl transition-colors">
                <X className="w-6 h-6 text-secondary/40" />
              </button>
            </div>

            <form onSubmit={handleAddCustomer} className="space-y-6">
              <Input label="Customer Full Name" placeholder="e.g. Mama Mboga" required value={newCustomer.name} onChange={e => setNewCustomer({...newCustomer, name: e.target.value})} />
              <Input label="Phone Number" placeholder="07XX XXX XXX" required value={newCustomer.phone} onChange={e => setNewCustomer({...newCustomer, phone: e.target.value})} />
              <Input label="Initial Debt (Optional)" type="number" placeholder="0.00" value={newCustomer.balance} onChange={e => setNewCustomer({...newCustomer, balance: Number(e.target.value)})} />
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" type="button" onClick={() => setIsModalOpen(false)}>CANCEL</Button>
                <Button className="flex-1" type="submit">CREATE ACCOUNT</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}

export default DebtPage
