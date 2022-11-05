import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react'

import { z } from 'zod'
import { PasswordField } from '../password-field'
import { useForm } from '../../hooks/use-form'

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

export const SignupForm = ({ onSubmit }: SignupFormProps) => {
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
    <Box
      sx={{
        border: '1px solid #eee',
        p: 6,
        borderRadius: 'md',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="5">
          <Stack spacing="5">
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input type="email" {...register('email')} />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">Full Name</FormLabel>
              <Input type="name" {...register('name')} />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <PasswordField {...register('password')} />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
          </Stack>
          <Stack spacing="6">
            <Button isLoading={isSubmitting} variant="outline" type="submit">
              Submit This
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  )
}
