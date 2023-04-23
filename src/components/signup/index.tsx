import { z } from 'zod'
import { useForm } from '../../hooks/use-form'
import { Email, InputField, Password } from '../xui/forms'
import { ProgressButton } from '../xui/button'

export const emailSchema = z.string().min(1, { message: 'email is required' })
export const loginSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(5, { message: 'password requires at least 5 characters' }),
})

export const signupSchema = loginSchema.extend({
  name: z.string().min(3, { message: 'please provide your name' }),
})

interface SignupFormProps {
  onSubmit: (arg0: any) => void
}

export function SignupForm({ onSubmit }: SignupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ schema: signupSchema })
  if (errors) {
    // eslint-disable-next-line no-console
    console.log('form errors', errors)
  }

  return (
    <div className="p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        action="#"
        method="POST"
      >
        <Email label="Email" name="email" register={register} errors={errors} />
        <InputField
          label="Name"
          name="name"
          register={register}
          errors={errors}
        />
        <Password
          label="Password"
          name="password"
          register={register}
          errors={errors}
        />

        <ProgressButton
          inProgress={isSubmitting}
          type="submit"
          className="w-full"
        >
          Sign in
        </ProgressButton>
      </form>
    </div>
  )
}
