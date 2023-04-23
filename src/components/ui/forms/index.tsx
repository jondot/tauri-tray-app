import { Field, Input, Label, Textarea } from '../input'

export const TextAreaField = ({
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
}) => (
  <Field className={className}>
    {label && (
      <Label htmlFor={name} v="form" state={errors[name] && 'err'}>
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
)

export const InputField = ({
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
}) => (
  <Field className={className}>
    {label && (
      <Label htmlFor={name} v="form" state={errors[name] && 'err'}>
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
)

export const Email = ({
  name,
  label,
  register,
  errors,
}: {
  label?: string
  name: string
  register: any
  errors: any
}) => (
  <Field>
    {label && (
      <Label htmlFor={name} v="form" state={errors[name] && 'err'}>
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
)

export const Password = ({
  name,
  label,
  register,
  errors,
}: {
  label?: string
  name: string
  register: any
  errors: any
}) => (
  <Field>
    {label && (
      <Label htmlFor={name} v="form" state={errors[name] && 'err'}>
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
)
