import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, Store } from 'lucide-react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Mock successful login
      localStorage.setItem('isAuthenticated', 'true')
      navigate('/')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative">
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 mb-6">
            <Store className="text-white w-8 h-8" />
          </div>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary">
            DESTINY POS
          </h1>
          <p className="font-label text-[10px] text-secondary/40 font-black tracking-[0.2em] uppercase mt-2">
            Editorial SME Management
          </p>
        </div>

        <Card className="p-10">
          <div className="mb-8 text-center">
            <h2 className="font-headline text-2xl font-bold text-primary">Welcome Back</h2>
            <p className="font-body text-secondary/60 text-sm mt-1">Sign in to manage your branch operations</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <Input 
              label="Email Address"
              placeholder="e.g. manager@destiny.co.ke"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <div className="space-y-2">
              <Input 
                label="Password"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex justify-end px-1">
                <button type="button" className="font-label font-bold text-[9px] text-primary hover:underline uppercase tracking-wider">
                  Forgot Password?
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full py-4" 
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>AUTHENTICATING...</span>
                </div>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>SIGN INTO DASHBOARD</span>
                </>
              )}
            </Button>
          </form>
        </Card>

        <p className="text-center mt-8 font-label text-[9px] text-secondary/40 font-black tracking-widest uppercase">
          &copy; 2026 Destiny Editorial POS. All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

export default LoginPage
