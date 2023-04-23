import { classed } from '@tw-classed/react'
import * as LabelPrimitive from '@radix-ui/react-label'
import * as SwitchPrimitives from '@radix-ui/react-switch'
import React from 'react'
import { cn } from '../utils'

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    className?: string
  }
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0'
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }

export const Textarea = classed.textarea(
  'flex w-full rounded-md shadow-sm border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      v: {
        normal: 'h-11',
        sm: 'text-sm h-10',
      },
      state: {
        normal: '',
        err: '!border-red-500 !border-2 !text-red-500 focus:!ring-red-500',
      },
    },
    defaultVariants: {
      v: 'normal',
      state: 'normal',
    },
  }
)

export const Input = classed.input(
  'flex shadow-sm h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  focus:ring-ring focus:border-input disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      v: {
        normal: 'h-11',
        sm: 'text-sm h-10',
      },
      state: {
        normal: '',
        err: '!border-red-500 !border-2 !text-red-500 focus:!ring-red-500',
      },
    },
    defaultVariants: {
      v: 'normal',
      state: 'normal',
    },
  }
)

export const Label = classed(
  LabelPrimitive.Root,
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',

  {
    variants: {
      v: {
        normal: 'text-foreground',
        form: 'text-muted-foreground',
      },
      state: {
        normal: '',
        err: '!text-red-500',
      },
    },
    defaultVariants: {
      v: 'normal',
      state: 'normal',
    },
  }
)

export const Field = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => <div className={cn('space-y-1', className)}>{children}</div>
