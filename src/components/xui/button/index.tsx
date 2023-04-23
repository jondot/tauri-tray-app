import * as React from 'react'
import { classed } from '@tw-classed/react'
import type { ButtonProps } from '@/components/ui/button'
import { Button } from '@/components/ui/button'

export const Svg = classed.svg('animate-spin -ml-1 mr-3 h-5 w-5', {
  variants: {
    variant: {

      default: 'text-white',
      destructive: 'text-white',
      outline: 'text-slate-500',
      secondary: 'text-slate-500',
      ghost: 'text-slate-500',
      link: 'text-slate-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const ProgressButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { inProgress: boolean }
>(({ inProgress, children, variant, ...props }, ref) => {
  return (
    <Button ref={ref} variant={variant} {...props}>
      {inProgress && (
        <Svg
          variant={variant as any}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </Svg>
      )}
      {children}
    </Button>
  )
})
ProgressButton.displayName = 'ProgressButton'
