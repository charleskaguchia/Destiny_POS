import React from 'react'
import { twMerge } from 'tailwind-merge'

const Card = ({ children, className, padded = true }) => {
  return (
    <div className={twMerge(
      'bg-white rounded-3xl border border-surface-high shadow-sm overflow-hidden',
      padded && 'p-8',
      className
    )}>
      {children}
    </div>
  )
}

export default Card
