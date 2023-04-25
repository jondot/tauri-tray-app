import { classed } from '@tw-classed/react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export const Label = classed(
  LabelPrimitive.Root,
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      variant: {
        normal: 'text-foreground',
        form: 'text-muted-foreground',
      },
      state: {
        normal: '',
        err: '!text-red-500',
      },
    },
    defaultVariants: {
      variant: 'normal',
      state: 'normal',
    },
  }
)

export function Field({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <div className={cn('space-y-1', className)}>{children}</div>
}

export function TextAreaField({
  name,
  label,
  register,
  errors,
  required,
  className,
}: {
  name: string
  register: any
  errors: any
  label?: string
  required?: boolean
  className?: string
}) {
  return <Field className={className}>
    {label && (
      <Label htmlFor={name} variant="form" state={errors[name] && 'err'}>
        {label}
      </Label>
    )}
    <Textarea
      id={name}
      required={required}
      state={errors[name] ? 'err' : null}
      {...register(name)}
    />
    {errors[name] && (
      <p className="text-xs text-red-500">{errors[name]?.message}</p>
    )}
  </Field>
}

export function InputField({
  name,
  label,
  register,
  errors,
  required,
  className,
}: {
  name: string
  register: any
  errors: any
  label?: string
  required?: boolean
  className?: string
}) {
  return <Field className={className}>
    {label && (
      <Label htmlFor={name} variant="form" state={errors[name] && 'err'}>
        {label}
      </Label>
    )}
    <Input
      id={name}
      required={required}
      state={errors[name] ? 'err' : null}
      {...register(name)}
    />
    {errors[name] && (
      <p className="text-xs text-red-500">{errors[name]?.message}</p>
    )}
  </Field>
}

export function Email({
  name,
  label,
  register,
  errors,
}: {
  label?: string
  name: string
  register: any
  errors: any
}) {
  return <Field>
    {label && (
      <Label htmlFor={name} variant="form" state={errors[name] && 'err'}>
        {label}
      </Label>
    )}
    <Input
      id={name}
      autoComplete="email"
      required
      state={errors[name] ? 'err' : null}
      {...register(name)}
    />
    {errors[name] && (
      <p className="text-xs text-red-500">{errors[name]?.message}</p>
    )}
  </Field>
}

export function Password({
  name,
  label,
  register,
  errors,
}: {
  label?: string
  name: string
  register: any
  errors: any
}) {
  return <Field>
    {label && (
      <Label htmlFor={name} variant="form" state={errors[name] && 'err'}>
        {label}
      </Label>
    )}
    <Input
      id={name}
      autoComplete="password"
      type="password"
      required
      state={errors[name] ? 'err' : null}
      {...register(name)}
    />
    {errors[name] && (
      <p className="text-xs text-red-500">{errors[name]?.message}</p>
    )}
  </Field>
}
