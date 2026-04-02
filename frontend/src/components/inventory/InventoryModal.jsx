import React, { useState, useEffect } from 'react'
import { Plus, Search, Filter, X, Save } from 'lucide-react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Card from '../ui/Card'
import Badge from '../ui/Badge'

const InventoryModal = ({ isOpen, onClose, onSave, item }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'FMCG',
    stock: 0,
    unit: 'Pieces',
    price: 0,
    status: 'In Stock'
  })

  useEffect(() => {
    if (item) {
      setFormData(item)
    } else {
      setFormData({
        name: '',
        category: 'FMCG',
        stock: 0,
        unit: 'Pieces',
        price: 0,
        status: 'In Stock'
      })
    }
  }, [item, isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-xl shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-headline text-2xl font-extrabold text-primary uppercase tracking-tight">
            {item ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-surface-low rounded-xl transition-colors">
            <X className="w-6 h-6 text-secondary/40" />
          </button>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault()
          onSave(formData)
        }} className="space-y-6">
          <Input 
            label="Product Name"
            placeholder="e.g. Lifebuoy Soap 150g"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            required
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block font-label font-black text-[10px] text-secondary/40 tracking-[0.15em] uppercase px-1">Category</label>
              <select 
                className="w-full bg-white border-2 border-surface-high rounded-xl py-3 px-4 font-headline font-bold text-sm text-primary focus:border-primary focus:outline-none transition-all"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option>FMCG</option>
                <option>Personal Care</option>
                <option>OTC Drugs</option>
                <option>Beverages</option>
              </select>
            </div>
            <Input 
              label="Price (KES)"
              type="number"
              value={formData.price}
              onChange={e => setFormData({...formData, price: Number(e.target.value)})}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Current Stock"
              type="number"
              value={formData.stock}
              onChange={e => setFormData({...formData, stock: Number(e.target.value)})}
              required
            />
            <Input 
              label="Unit (e.g. Pieces, Bales)"
              value={formData.unit}
              onChange={e => setFormData({...formData, unit: e.target.value})}
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={onClose} type="button">Cancel</Button>
            <Button className="flex-1" type="submit">
              <Save className="w-4 h-4" />
              <span>{item ? 'Update Product' : 'Save Product'}</span>
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default InventoryModal
