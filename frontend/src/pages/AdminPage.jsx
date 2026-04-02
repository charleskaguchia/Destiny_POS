import React, { useState } from 'react'
import { Users, Building2, ShieldCheck, Activity, Plus, MoreVertical, Edit2, Trash2, X, Save } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Badge from '../components/ui/Badge'

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('USERS')
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', role: 'Admin', branch: 'Main Branch', email: 'john@destiny.co.ke' },
    { id: 2, name: 'Alice Wambui', role: 'Cashier', branch: 'Downtown Branch', email: 'alice@destiny.co.ke' },
    { id: 3, name: 'Bob Maina', role: 'Cashier', branch: 'Main Branch', email: 'bob@destiny.co.ke' },
  ])
  const [branches, setBranches] = useState([
    { id: 1, name: 'Main Branch', location: 'Nairobi CBD', status: 'Active', dailySales: 45000 },
    { id: 2, name: 'Downtown Branch', location: 'River Road', status: 'Active', dailySales: 32000 },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userForm, setUserForm] = useState({ name: '', role: 'Cashier', branch: 'Main Branch', email: '' })
  const [branchForm, setBranchForm] = useState({ name: '', location: '', status: 'Active', dailySales: 0 })

  const handleAddUser = (e) => {
    e.preventDefault()
    setUsers([...users, { ...userForm, id: Date.now() }])
    setIsModalOpen(false)
    setUserForm({ name: '', role: 'Cashier', branch: 'Main Branch', email: '' })
  }

  const handleAddBranch = (e) => {
    e.preventDefault()
    setBranches([...branches, { ...branchForm, id: Date.now() }])
    setIsModalOpen(false)
    setBranchForm({ name: '', location: '', status: 'Active', dailySales: 0 })
  }

  const handleExport = () => {
    alert(`Exporting ${activeTab.toLowerCase()} data as CSV...`)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-headline text-4xl font-extrabold text-primary tracking-tight uppercase">
            SYSTEM ADMIN
          </h1>
          <p className="text-secondary/60 mt-2 font-medium">Manage users, branches, and global system configurations.</p>
        </div>
        <div className="flex bg-surface-low p-1 rounded-2xl">
          <button 
            onClick={() => setActiveTab('USERS')}
            className={`px-8 py-3 rounded-xl font-label font-black text-[10px] tracking-widest transition-all ${activeTab === 'USERS' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-secondary/40 hover:text-primary'}`}
          >
            USERS
          </button>
          <button 
            onClick={() => setActiveTab('BRANCHES')}
            className={`px-8 py-3 rounded-xl font-label font-black text-[10px] tracking-widest transition-all ${activeTab === 'BRANCHES' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-secondary/40 hover:text-primary'}`}
          >
            BRANCHES
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 flex flex-col gap-4">
          <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="font-label text-[10px] text-secondary/40 font-black tracking-widest uppercase">Total Users</span>
            <p className="font-headline text-2xl font-extrabold text-primary">{users.length} Active</p>
          </div>
        </Card>
        <Card className="p-6 flex flex-col gap-4">
          <div className="w-10 h-10 bg-secondary/5 text-secondary rounded-xl flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="font-label text-[10px] text-secondary/40 font-black tracking-widest uppercase">Total Branches</span>
            <p className="font-headline text-2xl font-extrabold text-primary">{branches.length} Branches</p>
          </div>
        </Card>
        <Card className="p-6 flex flex-col gap-4">
          <div className="w-10 h-10 bg-tertiary/5 text-tertiary rounded-xl flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="font-label text-[10px] text-secondary/40 font-black tracking-widest uppercase">System Status</span>
            <p className="font-headline text-2xl font-extrabold text-primary">Healthy</p>
          </div>
        </Card>
        <Card className="p-6 flex flex-col gap-4">
          <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="font-label text-[10px] text-secondary/40 font-black tracking-widest uppercase">Total Revenue</span>
            <p className="font-headline text-2xl font-extrabold text-primary">KES 1.2M</p>
          </div>
        </Card>
      </div>

      <Card className="p-0">
        <div className="p-8 border-b border-surface-high flex items-center justify-between">
          <h3 className="font-headline font-bold text-primary uppercase tracking-tight text-lg">
            {activeTab === 'USERS' ? 'User Management' : 'Branch Management'}
          </h3>
          <div className="flex gap-3">
            <Button size="sm" variant="outline" onClick={handleExport}>EXPORT</Button>
            <Button size="sm" onClick={() => setIsModalOpen(true)}>
              <Plus className="w-4 h-4" />
              <span>{activeTab === 'USERS' ? 'ADD USER' : 'ADD BRANCH'}</span>
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-surface-high">
                <th className="px-8 py-4 font-label text-[10px] text-secondary/40 font-black tracking-widest uppercase">
                  {activeTab === 'USERS' ? 'User Details' : 'Branch Name'}
                </th>
                <th className="px-8 py-4 font-label text-[10px] text-secondary/40 font-black tracking-widest uppercase">
                  {activeTab === 'USERS' ? 'Assigned Branch' : 'Location'}
                </th>
                <th className="px-8 py-4 font-label text-[10px] text-secondary/40 font-black tracking-widest uppercase">
                  {activeTab === 'USERS' ? 'Role' : 'Daily Sales'}
                </th>
                <th className="px-8 py-4 font-label text-[10px] text-secondary/40 font-black tracking-widest uppercase">Status</th>
                <th className="px-8 py-4 font-label text-[10px] text-secondary/40 font-black tracking-widest uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-high">
              {activeTab === 'USERS' ? users.map(user => (
                <tr key={user.id} className="hover:bg-surface-low/50 transition-colors">
                  <td className="px-8 py-5">
                    <p className="font-headline font-bold text-primary">{user.name}</p>
                    <p className="font-label text-[9px] text-secondary/40 font-bold uppercase tracking-widest">{user.email}</p>
                  </td>
                  <td className="px-8 py-5 font-headline font-bold text-primary text-sm">{user.branch}</td>
                  <td className="px-8 py-5">
                    <Badge variant={user.role === 'Admin' ? 'primary' : 'secondary'}>{user.role}</Badge>
                  </td>
                  <td className="px-8 py-5">
                    <Badge>Active</Badge>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-secondary/30 hover:text-primary transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button className="p-2 text-secondary/30 hover:text-tertiary transition-colors" onClick={() => setUsers(users.filter(u => u.id !== user.id))}><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              )) : branches.map(branch => (
                <tr key={branch.id} className="hover:bg-surface-low/50 transition-colors">
                  <td className="px-8 py-5 font-headline font-bold text-primary">{branch.name}</td>
                  <td className="px-8 py-5 font-headline font-bold text-primary text-sm">{branch.location}</td>
                  <td className="px-8 py-5 font-headline font-bold text-primary">KES {branch.dailySales.toLocaleString()}</td>
                  <td className="px-8 py-5">
                    <Badge variant="primary">{branch.status}</Badge>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-secondary/30 hover:text-primary transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button className="p-2 text-secondary/30 hover:text-tertiary transition-colors" onClick={() => setBranches(branches.filter(b => b.id !== branch.id))}><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <Card className="w-full max-w-md animate-in zoom-in duration-200 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-headline text-2xl font-extrabold text-primary uppercase tracking-tight">
                {activeTab === 'USERS' ? 'Add New User' : 'Add New Branch'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-surface-low rounded-xl transition-colors">
                <X className="w-6 h-6 text-secondary/40" />
              </button>
            </div>

            {activeTab === 'USERS' ? (
              <form onSubmit={handleAddUser} className="space-y-6">
                <Input label="Full Name" placeholder="e.g. John Doe" required value={userForm.name} onChange={e => setUserForm({...userForm, name: e.target.value})} />
                <Input label="Email Address" type="email" placeholder="john@destiny.co.ke" required value={userForm.email} onChange={e => setUserForm({...userForm, email: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block font-label font-black text-[10px] text-secondary/40 tracking-[0.15em] uppercase px-1">Role</label>
                    <select className="w-full bg-white border-2 border-surface-high rounded-xl py-3 px-4 font-headline font-bold text-sm text-primary focus:border-primary focus:outline-none transition-all" value={userForm.role} onChange={e => setUserForm({...userForm, role: e.target.value})}>
                      <option>Admin</option>
                      <option>Cashier</option>
                      <option>Manager</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block font-label font-black text-[10px] text-secondary/40 tracking-[0.15em] uppercase px-1">Branch</label>
                    <select className="w-full bg-white border-2 border-surface-high rounded-xl py-3 px-4 font-headline font-bold text-sm text-primary focus:border-primary focus:outline-none transition-all" value={userForm.branch} onChange={e => setUserForm({...userForm, branch: e.target.value})}>
                      {branches.map(b => <option key={b.id}>{b.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" type="button" onClick={() => setIsModalOpen(false)}>CANCEL</Button>
                  <Button className="flex-1" type="submit">CREATE USER</Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleAddBranch} className="space-y-6">
                <Input label="Branch Name" placeholder="e.g. Westlands Branch" required value={branchForm.name} onChange={e => setBranchForm({...branchForm, name: e.target.value})} />
                <Input label="Location" placeholder="e.g. Ring Road, Nairobi" required value={branchForm.location} onChange={e => setBranchForm({...branchForm, location: e.target.value})} />
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" type="button" onClick={() => setIsModalOpen(false)}>CANCEL</Button>
                  <Button className="flex-1" type="submit">CREATE BRANCH</Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      )}
    </div>
  )
}

export default AdminPage
