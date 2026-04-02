import React, { useState } from 'react'
import { 
  Store, MapPin, Phone, Coins, Database, RefreshCcw, 
  Settings2, Percent, ShieldAlert, Info, UserPlus, X, Save, Trash2, Shield
} from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Badge from '../components/ui/Badge'

const INITIAL_STAFF = [
  { id: 1, name: 'John Doe', role: 'Owner', initials: 'JD' },
  { id: 2, name: 'Alice Wambui', role: 'Cashier', initials: 'AW' },
  { id: 3, name: 'Bob Maina', role: 'Cashier', initials: 'BM' },
]

const SettingsPage = () => {
  const [staff, setStaff] = useState(INITIAL_STAFF)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newStaff, setNewStaff] = useState({ name: '', role: 'Cashier' })
  const [isSyncEnabled, setIsSyncEnabled] = useState(true)

  const handleAddStaff = (e) => {
    e.preventDefault()
    const initials = newStaff.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
    
    const newUser = {
      id: Date.now(),
      name: newStaff.name,
      role: newStaff.role,
      initials: initials || '??'
    }
    
    setStaff([...staff, newUser])
    setNewStaff({ name: '', role: 'Cashier' })
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="font-headline text-4xl font-extrabold text-primary tracking-tight uppercase">
          Settings & Admin
        </h1>
        <p className="text-secondary/60 mt-2 font-medium">Configure store identity, business rules, and staff access.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Card 1: Store Identity */}
        <Card className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Store className="w-5 h-5 text-primary" />
            <h3 className="font-headline font-bold text-primary uppercase tracking-tight text-lg">Store Identity</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Store Name" defaultValue="Destiny Editorial Shop" icon={Store} />
            <Input label="Location / Branch" defaultValue="Nairobi CBD" icon={MapPin} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Contact Number" defaultValue="+254 712 345 678" icon={Phone} />
            <Input label="Currency Symbol" defaultValue="KES" icon={Coins} />
          </div>
          <div className="pt-4">
            <Button size="sm" className="w-full md:w-auto">Save Identity</Button>
          </div>
        </Card>

        {/* Card 2: System Integrity (Dark Teal) */}
        <Card className="bg-primary text-white border-none space-y-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-5 h-5 opacity-60" />
              <h3 className="font-headline font-bold uppercase tracking-tight text-lg">System Integrity</h3>
            </div>
            <p className="text-white/60 text-sm font-medium mb-8">
              Maintain the health of your local database. Backup your data regularly or clear the local cache to resolve sync issues.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="secondary" className="bg-white/10 text-white hover:bg-white/20 border-none flex-1">
              <RefreshCcw className="w-4 h-4" />
              <span>Manual Backup</span>
            </Button>
            <Button variant="tertiary" className="bg-tertiary text-white hover:bg-tertiary/80 border-none flex-1">
              <Trash2 className="w-4 h-4" />
              <span>Clear Cache</span>
            </Button>
          </div>
        </Card>

        {/* Card 3: Business Logic */}
        <Card className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Settings2 className="w-5 h-5 text-primary" />
            <h3 className="font-headline font-bold text-primary uppercase tracking-tight text-lg">Business Logic</h3>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-surface-low rounded-2xl">
            <div>
              <p className="font-headline font-bold text-primary text-sm">Automatic Offline Sync</p>
              <p className="font-label text-[9px] text-secondary/40 font-bold uppercase tracking-widest mt-0.5">Push data when online</p>
            </div>
            <button 
              onClick={() => setIsSyncEnabled(!isSyncEnabled)}
              className={`w-12 h-6 rounded-full transition-all relative ${isSyncEnabled ? 'bg-primary' : 'bg-secondary/20'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isSyncEnabled ? 'right-1' : 'left-1'}`} />
            </button>
          </div>

          <Input label="Default Tax Rate (%)" type="number" defaultValue="16" icon={Percent} />

          <div className="pt-4 border-t border-surface-high">
            <h4 className="font-label text-[10px] text-secondary/40 font-black tracking-widest uppercase mb-4">Wholesale Threshold</h4>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input placeholder="Min Units for Wholesale" type="number" defaultValue="12" />
              </div>
              <Button variant="outline">Update Rule</Button>
            </div>
          </div>
        </Card>

        {/* Card 4: Staff & Access */}
        <Card className="p-0 flex flex-col shadow-lg border-primary/5">
          <div className="p-8 border-b border-surface-high flex items-center justify-between bg-surface-low/30">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="font-headline font-bold text-primary uppercase tracking-tight text-lg">Staff & Access</h3>
            </div>
            <Button size="sm" onClick={() => setIsModalOpen(true)}>
              <UserPlus className="w-4 h-4" />
              <span>Add New User</span>
            </Button>
          </div>

          <div className="p-8 flex-1 space-y-4">
            {staff.map(user => (
              <div key={user.id} className="flex items-center justify-between p-4 hover:bg-surface-low rounded-2xl transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-headline font-black text-xs">
                    {user.initials}
                  </div>
                  <div>
                    <p className="font-headline font-bold text-primary">{user.name}</p>
                    <p className="font-label text-[9px] text-secondary/40 font-bold uppercase tracking-widest">{user.role}</p>
                  </div>
                </div>
                <Badge variant={user.role === 'Owner' ? 'primary' : 'secondary'}>
                  {user.role}
                </Badge>
              </div>
            ))}
          </div>

          <div className="p-6 bg-tertiary/5 border-t border-tertiary/10 m-4 rounded-2xl flex gap-4">
            <Info className="w-5 h-5 text-tertiary shrink-0" />
            <p className="text-[10px] font-medium text-tertiary/80 leading-relaxed">
              <strong className="block uppercase tracking-wider mb-1">Owner Permissions Required</strong>
              Only users with the 'Owner' role can modify store identity, wholesale thresholds, or delete staff records. Cashiers are restricted to POS and Shift operations.
            </p>
          </div>
        </Card>
      </div>

      {/* Add Staff Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <Card className="w-full max-w-md shadow-2xl animate-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-headline text-2xl font-extrabold text-primary uppercase tracking-tight">
                Add New Staff
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-surface-low rounded-xl transition-colors">
                <X className="w-6 h-6 text-secondary/40" />
              </button>
            </div>

            <form onSubmit={handleAddStaff} className="space-y-6">
              <Input 
                label="Full Name" 
                placeholder="e.g. Jane Doe" 
                required
                value={newStaff.name}
                onChange={e => setNewStaff({ ...newStaff, name: e.target.value })}
              />
              <div className="space-y-1.5">
                <label className="block font-label font-black text-[10px] text-secondary/40 tracking-[0.15em] uppercase px-1">Role</label>
                <select 
                  className="w-full bg-white border-2 border-surface-high rounded-xl py-3 px-4 font-headline font-bold text-sm text-primary focus:border-primary focus:outline-none transition-all"
                  value={newStaff.role}
                  onChange={e => setNewStaff({ ...newStaff, role: e.target.value })}
                >
                  <option value="Cashier">Cashier</option>
                  <option value="Manager">Manager</option>
                  <option value="Owner">Owner</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button className="flex-1" type="submit">Create User</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}

export default SettingsPage
