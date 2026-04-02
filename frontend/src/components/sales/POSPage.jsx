import React, { useState } from 'react'
import { Search, ShoppingCart, Trash2, CreditCard, Banknote, UserPlus, Filter, CheckCircle2 } from 'lucide-react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Card from '../ui/Card'
import Badge from '../ui/Badge'

const MOCK_PRODUCTS = [
  { id: 1, name: 'Lifebuoy Soap 150g', category: 'Personal Care', stock: 156, price: 120, wholesalePrice: 110 },
  { id: 2, name: 'Jogoo Maize Meal 2kg', category: 'FMCG', stock: 48, price: 2150, wholesalePrice: 2050 },
  { id: 3, name: 'Panadol Extra', category: 'OTC Drugs', stock: 890, price: 15, wholesalePrice: 12 },
  { id: 4, name: 'Blue Band 500g', category: 'FMCG', stock: 12, price: 340, wholesalePrice: 320 },
  { id: 5, name: 'Coca Cola 500ml', category: 'Beverages', stock: 72, price: 70, wholesalePrice: 65 },
  { id: 6, name: 'Tusker Lager 500ml', category: 'Beverages', stock: 24, price: 250, wholesalePrice: 230 },
]

const POSPage = () => {
  const [saleType, setSaleType] = useState('RETAIL')
  const [searchTerm, setSearchTerm] = useState('')
  const [cart, setCart] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addToCart = (product) => {
    const price = saleType === 'RETAIL' ? product.price : product.wholesalePrice
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
      }
      return [...prev, { ...product, qty: 1, activePrice: price }]
    })
  }

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta)
        return { ...item, qty: newQty }
      }
      return item
    }))
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.activePrice * item.qty), 0)

  const handleCheckout = () => {
    if (cart.length === 0) return
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setShowSuccess(true)
      setCart([])
      setTimeout(() => setShowSuccess(false), 3000)
    }, 2000)
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 h-[calc(100vh-12rem)] animate-in fade-in duration-500">
      {/* Left Column: Search & Selection */}
      <div className="xl:col-span-8 flex flex-col gap-6 overflow-hidden">
        <div className="flex gap-4">
          <div className="flex-1">
            <Input 
              icon={Search}
              placeholder="SEARCH PRODUCTS (NAME OR CATEGORY)..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="py-5"
            />
          </div>
          <Button variant="outline" className="px-8">
            <Filter className="w-5 h-5" />
            <span>FILTER</span>
          </Button>
        </div>

        <Card className="flex-1 overflow-y-auto flex flex-col shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline font-extrabold text-primary text-xl tracking-tight uppercase">Product Catalog</h3>
            <div className="flex bg-surface-low p-1 rounded-xl">
              <button 
                onClick={() => setSaleType('RETAIL')}
                className={`px-6 py-2 rounded-lg font-label font-black text-[10px] tracking-widest transition-all ${saleType === 'RETAIL' ? 'bg-white text-primary shadow-sm' : 'text-secondary/40'}`}
              >
                RETAIL
              </button>
              <button 
                onClick={() => setSaleType('WHOLESALE')}
                className={`px-6 py-2 rounded-lg font-label font-black text-[10px] tracking-widest transition-all ${saleType === 'WHOLESALE' ? 'bg-white text-primary shadow-sm' : 'text-secondary/40'}`}
              >
                WHOLESALE
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <button 
                key={product.id} 
                onClick={() => addToCart(product)}
                className="p-4 rounded-2xl border-2 border-surface-high hover:border-primary hover:bg-primary/5 transition-all text-left flex flex-col gap-3 group relative overflow-hidden"
              >
                <div className="w-10 h-10 bg-surface-low rounded-xl flex items-center justify-center text-secondary/30 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-headline font-bold text-primary text-sm leading-tight group-hover:text-primary transition-colors">{product.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="font-label font-bold text-[10px] text-secondary/40 tracking-wider">KES {saleType === 'RETAIL' ? product.price : product.wholesalePrice}</p>
                    <Badge variant={product.stock < 20 ? 'tertiary' : 'primary'} className="scale-75 origin-right">
                      {product.stock}
                    </Badge>
                  </div>
                </div>
                {cart.find(item => item.id === product.id) && (
                  <div className="absolute top-2 right-2 text-primary animate-in zoom-in">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Right Column: Cart & Checkout */}
      <div className="xl:col-span-4 flex flex-col gap-6">
        <Card className="flex-1 flex flex-col p-0 shadow-xl border-primary/10">
          <div className="p-8 border-b border-surface-high flex items-center justify-between bg-surface-low/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <h3 className="font-headline font-extrabold text-primary text-xl tracking-tight uppercase">Current Cart</h3>
            </div>
            {cart.length > 0 && (
              <button 
                onClick={() => setCart([])}
                className="text-tertiary hover:bg-tertiary/10 p-2 rounded-lg transition-colors"
                title="Clear Cart"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            {cart.map(item => (
              <div key={item.id} className="flex flex-col gap-2 group animate-in slide-in-from-right-4 duration-200">
                <div className="flex items-center justify-between">
                  <p className="font-headline font-bold text-primary">{item.name}</p>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-tertiary hover:bg-tertiary/5 rounded transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center bg-surface-low rounded-lg p-1">
                    <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 flex items-center justify-center font-bold text-primary hover:bg-white rounded-md transition-all">-</button>
                    <span className="w-10 text-center font-headline font-bold text-xs">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 flex items-center justify-center font-bold text-primary hover:bg-white rounded-md transition-all">+</button>
                  </div>
                  <p className="font-headline font-bold text-primary text-sm">KES {(item.activePrice * item.qty).toLocaleString()}</p>
                </div>
              </div>
            ))}
            
            {cart.length === 0 && !showSuccess && (
              <div className="flex flex-col items-center justify-center h-full text-secondary/20 gap-4">
                <div className="w-20 h-20 bg-surface-low rounded-3xl flex items-center justify-center">
                  <ShoppingCart className="w-10 h-10" />
                </div>
                <p className="font-label font-black text-[10px] tracking-[0.2em] uppercase">Cart is Empty</p>
              </div>
            )}

            {showSuccess && (
              <div className="flex flex-col items-center justify-center h-full text-primary gap-4 animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="text-center">
                  <p className="font-headline font-bold text-lg">Transaction Complete!</p>
                  <p className="font-label text-[10px] text-secondary/40 font-bold uppercase tracking-widest mt-1">Receipt ID: #POS-2026-0001</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4"
                  onClick={() => alert('Generating and downloading receipt (PDF)...')}
                >
                  DOWNLOAD RECEIPT
                </Button>
              </div>
            )}
          </div>

          <div className="p-8 bg-surface-low space-y-6 border-t border-surface-high">
            <div className="space-y-2">
              <div className="flex justify-between text-secondary/60 font-label font-bold text-[10px] tracking-widest uppercase px-1">
                <span>Subtotal</span>
                <span>KES {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-primary font-headline font-black text-3xl tracking-tight bg-white p-4 rounded-2xl shadow-sm border border-primary/5">
                <span>TOTAL</span>
                <span>KES {subtotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
               <button className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border-2 border-surface-high hover:border-primary hover:bg-primary/5 transition-all group">
                  <Banknote className="w-6 h-6 text-secondary/40 group-hover:text-primary transition-colors" />
                  <span className="font-label font-bold text-[8px] uppercase tracking-tighter text-secondary/60 group-hover:text-primary">CASH</span>
               </button>
               <button className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border-2 border-surface-high hover:border-primary hover:bg-primary/5 transition-all group">
                  <CreditCard className="w-6 h-6 text-secondary/40 group-hover:text-primary transition-colors" />
                  <span className="font-label font-bold text-[8px] uppercase tracking-tighter text-secondary/60 group-hover:text-primary">M-PESA</span>
               </button>
               <button className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border-2 border-surface-high hover:border-primary hover:bg-primary/5 transition-all group">
                  <UserPlus className="w-6 h-6 text-secondary/40 group-hover:text-primary transition-colors" />
                  <span className="font-label font-bold text-[8px] uppercase tracking-tighter text-secondary/60 group-hover:text-primary">MKOPO</span>
               </button>
            </div>

            <Button 
              className="w-full py-5 text-sm" 
              onClick={handleCheckout}
              disabled={cart.length === 0 || isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>PROCESSING...</span>
                </div>
              ) : (
                <span>COMPLETE TRANSACTION</span>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default POSPage
