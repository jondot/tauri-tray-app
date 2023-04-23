import * as React from 'react'
import { classed } from '@tw-classed/react'
import type * as Classed from '@tw-classed/react'

export const Button = classed.button(
  'inline-flex shadow-sm items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        filled:
          'border border-primary bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
        disabled:
          'opacity-50 cursor-not-allowed text-foreground border border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-2 rounded-md',
        lg: 'h-11 px-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'default',
    },
  }
)

export const Svg = classed.svg('animate-spin -ml-1 mr-3 h-5 w-5', {
  variants: {
    variant: {
      filled: 'text-white',
      destructive: 'text-white',
      outline: 'text-slate-500',
      secondary: 'text-slate-500',
      ghost: 'text-slate-500',
      link: 'text-slate-500',
      disabled: 'text-slate-500',
    },
  },
  defaultVariants: {
    variant: 'outline',
  },
})
export type ButtonProps = Classed.ComponentProps<typeof Button>
export const ProgressButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { inProgress: boolean }
>(({ inProgress, children, variant, ...props }, ref) => {
  return (
    <Button ref={ref} variant={variant} {...props}>
      {inProgress && (
        <Svg
          variant={variant}
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
