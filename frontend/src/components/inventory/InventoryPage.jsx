import React, { useState } from 'react'
import StatsBentoGrid from './StatsBentoGrid'
import InventoryList from './InventoryList'
import InventoryModal from './InventoryModal'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { Search, Plus, Filter } from 'lucide-react'

const INITIAL_INVENTORY = [
  { id: 1, name: 'Lifebuoy Soap 150g', category: 'Personal Care', stock: 156, unit: 'Pieces', price: 120, status: 'In Stock' },
  { id: 2, name: 'Jogoo Maize Meal 2kg', category: 'FMCG', stock: 48, unit: 'Bales', price: 2150, status: 'Low Stock' },
  { id: 3, name: 'Panadol Extra', category: 'OTC Drugs', stock: 890, unit: 'Tablets', price: 15, status: 'In Stock' },
  { id: 4, name: 'Blue Band 500g', category: 'FMCG', stock: 12, unit: 'Pieces', price: 340, status: 'Critical' },
]

const InventoryPage = () => {
  const [inventory, setInventory] = useState(INITIAL_INVENTORY)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleSave = (formData) => {
    if (editingItem) {
      setInventory(prev => prev.map(item => item.id === editingItem.id ? { ...formData, id: item.id } : item))
    } else {
      setInventory(prev => [...prev, { ...formData, id: Date.now() }])
    }
    handleCloseModal()
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setInventory(prev => prev.filter(item => item.id !== id))
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingItem(null)
  }

  const handleExport = () => {
    alert('Exporting inventory list (CSV)...')
  }

  const categories = ['All Categories', 'Personal Care', 'FMCG', 'OTC Drugs']

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-headline text-4xl font-extrabold text-primary tracking-tight">
            INVENTORY
          </h1>
          <p className="text-secondary/60 mt-2 font-medium">Manage your products, derivatives and stock levels.</p>
        </div>
        <Button onClick={() => { setEditingItem(null); setIsModalOpen(true); }}>
          <Plus className="w-5 h-5" />
          <span>ADD NEW PRODUCT</span>
        </Button>
      </div>

      <StatsBentoGrid />
      
      <div className="bg-white rounded-3xl p-8 border border-surface-high shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="w-full md:w-96">
            <Input 
              placeholder="SEARCH BY NAME OR CATEGORY..." 
              icon={Search}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <div className="relative group">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white border-2 border-surface-high rounded-xl py-2 pl-4 pr-10 font-label font-black text-[10px] tracking-widest uppercase focus:border-primary focus:outline-none transition-all appearance-none cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-secondary/40 pointer-events-none" />
            </div>
            <Button variant="secondary" size="sm" onClick={handleExport}>EXPORT</Button>
          </div>
        </div>

        <InventoryList 
          items={filteredInventory} 
          onDelete={handleDelete} 
          onEdit={handleEdit} 
        />
      </div>

      <InventoryModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSave={handleSave}
        item={editingItem}
      />
    </div>
  )
}

export default InventoryPage
