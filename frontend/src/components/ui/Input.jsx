import React from 'react'
import { twMerge } from 'tailwind-merge'

const Input = ({ label, error, className, icon: Icon, ...props }) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="block font-label font-black text-[10px] text-secondary/40 tracking-[0.15em] uppercase px-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary/30" />
        )}
        <input 
          className={twMerge(
            'w-full bg-white border-2 border-surface-high rounded-xl py-3 px-4 font-headline font-bold text-sm text-primary placeholder:text-secondary/20 focus:border-primary focus:outline-none transition-all',
            Icon && 'pl-12',
            error && 'border-tertiary focus:border-tertiary',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-[10px] font-label font-bold text-tertiary px-1 uppercase tracking-wider">{error}</p>
      )}
    </div>
  )
}

export default Input
