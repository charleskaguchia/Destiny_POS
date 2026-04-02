import React from 'react'
import { MoreVertical, Layers, Trash2, Edit3 } from 'lucide-react'
import Badge from '../ui/Badge'

const InventoryList = ({ items, onDelete, onEdit }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-surface-high">
            <th className="font-label py-4 text-[10px] text-secondary/40 font-black tracking-[0.15em]">PRODUCT DETAILS</th>
            <th className="font-label py-4 text-[10px] text-secondary/40 font-black tracking-[0.15em]">CATEGORY</th>
            <th className="font-label py-4 text-[10px] text-secondary/40 font-black tracking-[0.15em]">STOCK LEVEL</th>
            <th className="font-label py-4 text-[10px] text-secondary/40 font-black tracking-[0.15em]">PRICE (KES)</th>
            <th className="font-label py-4 text-[10px] text-secondary/40 font-black tracking-[0.15em]">STATUS</th>
            <th className="font-label py-4 text-[10px] text-secondary/40 font-black tracking-[0.15em]">ACTIONS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-high">
          {items.map((item) => (
            <tr key={item.id} className="group hover:bg-gray-50 transition-colors">
              <td className="py-5 pr-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-surface-high rounded-xl flex items-center justify-center text-primary/40 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                    <Layers className="w-5 h-5" />
                  </div>
                  <span className="font-headline font-bold text-primary group-hover:text-primary transition-colors">
                    {item.name}
                  </span>
                </div>
              </td>
              <td className="py-5 pr-4">
                <Badge>{item.category}</Badge>
              </td>
              <td className="py-5 pr-4">
                <div className="flex flex-col">
                  <span className="font-headline font-bold text-primary">{item.stock}</span>
                  <span className="font-label text-[9px] text-secondary/40 font-bold uppercase">{item.unit}</span>
                </div>
              </td>
              <td className="py-5 pr-4">
                <span className="font-headline font-bold text-primary">
                  {item.price.toLocaleString()}
                </span>
              </td>
              <td className="py-5 pr-4">
                <Badge variant={
                  item.status === 'In Stock' ? 'primary' : 
                  item.status === 'Low Stock' ? 'secondary' : 
                  'tertiary'
                }>
                  {item.status}
                </Badge>
              </td>
              <td className="py-5">
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => onEdit(item)}
                    className="p-2 text-secondary/30 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => onDelete(item.id)}
                    className="p-2 text-secondary/30 hover:text-tertiary hover:bg-tertiary/5 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {items.length === 0 && (
        <div className="py-20 text-center space-y-4">
          <div className="w-16 h-16 bg-surface-low rounded-full flex items-center justify-center mx-auto text-secondary/20">
            <Layers className="w-8 h-8" />
          </div>
          <p className="font-label font-bold text-xs text-secondary/40 tracking-widest uppercase">No products found</p>
        </div>
      )}
    </div>
  )
}

export default InventoryList
