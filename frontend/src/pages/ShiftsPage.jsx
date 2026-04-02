import React, { useState } from 'react'
import { Timer, Banknote, History, ArrowUpRight, ArrowDownLeft, Plus, CheckCircle2 } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Badge from '../components/ui/Badge'

const ShiftsPage = () => {
  const [activeShift, setActiveShift] = useState(null)
  const [showOpenModal, setShowOpenModal] = useState(false)
  const [showCloseModal, setShowCloseModal] = useState(false)
  const [showPayoutModal, setShowPayoutModal] = useState(false)
  const [openingCash, setOpeningCash] = useState('')
  const [payoutAmount, setPayoutAmount] = useState('')
  const [payoutReason, setPayoutReason] = useState('')
  const [closingCash, setClosingCash] = useState('')

  const handleOpenShift = () => {
    setActiveShift({
      id: Date.now(),
      startTime: new Date().toLocaleTimeString(),
      openingCash: Number(openingCash),
      payouts: [],
      sales: 15420, // Mock current sales for demonstration
    })
    setShowOpenModal(false)
    setOpeningCash('')
  }

  const handleAddPayout = () => {
    setActiveShift(prev => ({
      ...prev,
      payouts: [...prev.payouts, { id: Date.now(), amount: Number(payoutAmount), reason: payoutReason }]
    }))
    setShowPayoutModal(false)
    setPayoutAmount('')
    setPayoutReason('')
  }

  const handleCloseShift = () => {
    // Logic for reconciliation would happen here
    setActiveShift(null)
    setShowCloseModal(false)
    setClosingCash('')
  }

  const totalPayouts = activeShift?.payouts.reduce((sum, p) => sum + p.amount, 0) || 0
  const expectedCash = (activeShift?.openingCash || 0) + (activeShift?.sales || 0) - totalPayouts

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-headline text-4xl font-extrabold text-primary tracking-tight">
            SHIFTS
          </h1>
          <p className="text-secondary/60 mt-2 font-medium">Monitor cashier shifts and reconcile physical cash.</p>
        </div>
        {!activeShift ? (
          <Button onClick={() => setShowOpenModal(true)}>
            <Plus className="w-5 h-5" />
            <span>OPEN NEW SHIFT</span>
          </Button>
        ) : (
          <Button variant="tertiary" onClick={() => setShowCloseModal(true)}>
            <CheckCircle2 className="w-5 h-5" />
            <span>CLOSE CURRENT SHIFT</span>
          </Button>
        )}
      </div>

      {activeShift ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-6 border-primary/10">
                <span className="font-label text-[10px] text-secondary/40 font-black tracking-widest uppercase">Opening Cash</span>
                <p className="font-headline text-3xl font-extrabold text-primary mt-1">KES {activeShift.openingCash.toLocaleString()}</p>
              </Card>
              <Card className="p-6">
                <span className="font-label text-[10px] text-secondary/40 font-black tracking-widest uppercase">Total Sales</span>
                <p className="font-headline text-3xl font-extrabold text-primary mt-1">KES {activeShift.sales.toLocaleString()}</p>
              </Card>
              <Card className="p-6 border-tertiary/10">
                <span className="font-label text-[10px] text-tertiary/60 font-black tracking-widest uppercase">Total Payouts</span>
                <p className="font-headline text-3xl font-extrabold text-tertiary mt-1">- KES {totalPayouts.toLocaleString()}</p>
              </Card>
            </div>

            <Card className="p-0">
              <div className="p-8 border-b border-surface-high flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-surface-low rounded-xl flex items-center justify-center text-secondary/40">
                    <History className="w-5 h-5" />
                  </div>
                  <h3 className="font-headline font-bold text-primary uppercase tracking-tight text-lg">Shift Activity (Payouts)</h3>
                </div>
                <Button size="sm" variant="secondary" onClick={() => setShowPayoutModal(true)}>
                  <Plus className="w-4 h-4" />
                  <span>LOG PAYOUT</span>
                </Button>
              </div>
              <div className="p-8">
                {activeShift.payouts.length > 0 ? (
                  <div className="space-y-4">
                    {activeShift.payouts.map(p => (
                      <div key={p.id} className="flex items-center justify-between p-4 bg-surface-low rounded-2xl">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-tertiary/10 text-tertiary rounded-lg flex items-center justify-center">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-headline font-bold text-primary text-sm uppercase">{p.reason}</p>
                            <p className="font-label text-[9px] text-secondary/40 font-bold uppercase tracking-widest">Business Expense</p>
                          </div>
                        </div>
                        <p className="font-headline font-bold text-tertiary">KES {p.amount.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-secondary/20">
                    <p className="font-label font-bold text-[10px] uppercase tracking-[0.2em]">No payouts recorded yet</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <Card className="bg-primary text-white border-none shadow-xl shadow-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <Timer className="w-6 h-6 opacity-60" />
                <span className="font-label font-bold text-[10px] tracking-[0.2em] uppercase opacity-80">Active Shift Since {activeShift.startTime}</span>
              </div>
              <p className="font-label text-[10px] font-black tracking-widest uppercase opacity-60">Expected Cash in Till</p>
              <p className="font-headline text-5xl font-extrabold mt-2 tracking-tighter">
                KES {expectedCash.toLocaleString()}
              </p>
            </Card>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-20 border border-surface-high shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-surface-low rounded-3xl flex items-center justify-center mb-8">
            <Timer className="text-secondary/20 w-10 h-10" />
          </div>
          <h2 className="text-3xl font-headline font-extrabold text-primary mb-3">No Active Shift</h2>
          <p className="text-secondary/60 max-w-md mx-auto mb-10 font-medium">Please open a new shift by inputting the starting physical cash amount in the till.</p>
          <Button onClick={() => setShowOpenModal(true)} className="px-10">
            <Plus className="w-5 h-5" />
            <span>OPEN NEW SHIFT NOW</span>
          </Button>
        </div>
      )}

      {/* Modals */}
      {showOpenModal && (
        <div className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <Card className="w-full max-w-md animate-in zoom-in duration-200">
            <h2 className="font-headline text-2xl font-extrabold text-primary uppercase tracking-tight mb-8">Open New Shift</h2>
            <div className="space-y-6">
              <Input 
                label="Opening Physical Cash (KES)" 
                placeholder="0.00" 
                type="number"
                value={openingCash}
                onChange={e => setOpeningCash(e.target.value)}
              />
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowOpenModal(false)}>CANCEL</Button>
                <Button className="flex-1" onClick={handleOpenShift} disabled={!openingCash}>OPEN SHIFT</Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {showPayoutModal && (
        <div className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <Card className="w-full max-w-md animate-in zoom-in duration-200">
            <h2 className="font-headline text-2xl font-extrabold text-primary uppercase tracking-tight mb-8">Log Cash Payout</h2>
            <div className="space-y-6">
              <Input 
                label="Amount (KES)" 
                placeholder="0.00" 
                type="number"
                value={payoutAmount}
                onChange={e => setPayoutAmount(e.target.value)}
              />
              <Input 
                label="Reason / Recipient" 
                placeholder="e.g. Bread Supplier" 
                value={payoutReason}
                onChange={e => setPayoutReason(e.target.value)}
              />
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowPayoutModal(false)}>CANCEL</Button>
                <Button className="flex-1" onClick={handleAddPayout} disabled={!payoutAmount || !payoutReason}>RECORD PAYOUT</Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {showCloseModal && (
        <div className="fixed inset-0 bg-tertiary/10 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <Card className="w-full max-w-md animate-in zoom-in duration-200 border-tertiary/20">
            <h2 className="font-headline text-2xl font-extrabold text-tertiary uppercase tracking-tight mb-4">Close Shift</h2>
            <p className="text-secondary/60 text-sm mb-8">Enter the final physical cash count for reconciliation.</p>
            <div className="space-y-6">
              <div className="bg-surface-low p-4 rounded-2xl space-y-2 mb-6">
                <div className="flex justify-between text-[10px] font-black text-secondary/40 uppercase tracking-widest">
                  <span>Expected Cash</span>
                  <span>KES {expectedCash.toLocaleString()}</span>
                </div>
              </div>
              <Input 
                label="Physical Cash Count (KES)" 
                placeholder="0.00" 
                type="number"
                value={closingCash}
                onChange={e => setClosingCash(e.target.value)}
              />
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowCloseModal(false)}>CANCEL</Button>
                <Button variant="tertiary" className="flex-1" onClick={handleCloseShift} disabled={!closingCash}>RECONCILE & CLOSE</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

export default ShiftsPage
