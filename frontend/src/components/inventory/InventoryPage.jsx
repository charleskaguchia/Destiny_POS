<<<<<<< HEAD
import React, { useState } from 'react'
=======
import React, { useState, useMemo, useEffect } from 'react'
import axios from 'axios'
>>>>>>> d5e799f (Refactor: Migrate to decoupled Django 5.0 and React 19 architecture)
import StatsBentoGrid from './StatsBentoGrid'
import InventoryList from './InventoryList'
import InventoryModal from './InventoryModal'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { Search, Plus, Filter, Loader2, AlertCircle } from 'lucide-react'

const InventoryPage = () => {
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

<<<<<<< HEAD
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })
=======
  useEffect(() => {
    fetchInventory()
  }, [])

  const fetchInventory = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get('http://127.0.0.1:8000/api/inventory/products/')
      
      // Handle both paginated and non-paginated responses
      const data = Array.isArray(response.data) ? response.data : (response.data?.results || [])
      setInventory(data)
    } catch (err) {
      setError('Connection Error: Is the backend running at http://127.0.0.1:8000?')
      console.error('Inventory fetch error:', err)
      setInventory([])
    } finally {
      setLoading(false)
    }
  }

  const filteredInventory = useMemo(() => {
    if (!Array.isArray(inventory)) return []
    
    return inventory.filter(item => {
      const name = item?.name || ''
      const category = item?.category || ''
      const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All Categories' || category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [inventory, searchTerm, selectedCategory])
>>>>>>> d5e799f (Refactor: Migrate to decoupled Django 5.0 and React 19 architecture)

  const handleSave = async (formData) => {
    // Note: Full implementation of save would involve POST/PUT to backend
    // For now, we'll re-fetch to see changes if backend is updated
    fetchInventory()
    handleCloseModal()
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // In a real app: await axios.delete(`.../${id}/`)
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

  const categories = ['All Categories', 'Personal Care', 'FMCG', 'OTC Drugs', 'Beverages']

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

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-secondary/40 gap-4">
            <Loader2 className="w-8 h-8 animate-spin" />
            <p className="font-label font-bold text-xs uppercase tracking-widest">Fetching live inventory...</p>
          </div>
        ) : error ? (
          <div className="py-20 flex flex-col items-center justify-center text-tertiary gap-4 bg-tertiary/5 rounded-3xl border border-tertiary/10 px-4 text-center">
            <AlertCircle className="w-8 h-8" />
            <div>
              <p className="font-headline font-bold">{error}</p>
              <button 
                onClick={fetchInventory}
                className="mt-2 text-xs font-label font-black uppercase tracking-widest underline underline-offset-4 hover:text-tertiary/70 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <InventoryList 
            items={filteredInventory} 
            onDelete={handleDelete} 
            onEdit={handleEdit} 
          />
        )}
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
