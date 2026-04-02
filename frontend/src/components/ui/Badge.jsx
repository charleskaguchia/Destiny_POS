import React from 'react'
import { twMerge } from 'tailwind-merge'

const Badge = ({ children, variant = 'neutral', className }) => {
  const variants = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    tertiary: 'bg-tertiary/10 text-tertiary',
    neutral: 'bg-surface-low text-secondary/60'
  }

  return (
    <span className={twMerge(
      'font-label text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md inline-block',
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}

export default Badge
