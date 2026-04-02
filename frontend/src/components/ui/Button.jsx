import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  ...props 
}) => {
  const variants = {
    primary: 'bg-primary text-white hover:shadow-lg hover:shadow-primary/20 active:scale-95',
    secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/20 active:scale-95',
    tertiary: 'bg-tertiary/10 text-tertiary hover:bg-tertiary/20 active:scale-95',
    outline: 'border-2 border-surface-high text-primary hover:border-primary active:scale-95',
    ghost: 'text-secondary/60 hover:text-primary hover:bg-surface-low'
  }

  const sizes = {
    sm: 'px-4 py-2 text-[10px]',
    md: 'px-6 py-3 text-xs',
    lg: 'px-8 py-4 text-sm'
  }

  return (
    <button 
      className={twMerge(
        'rounded-xl font-label font-bold tracking-widest transition-all uppercase flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
