/* eslint-disable no-console */
import { invoke } from '@tauri-apps/api'
import { SignupForm } from '../components/signup'
import { useToast } from '@/components/ui/use-toast'

function Form() {
  const { toast } = useToast()
  return (
    <SignupForm
      onSubmit={(d: any) => {
        console.log('submit', d)
        invoke('greet', d).then((response) => {
          toast({
            title: 'from rust:',
            description: JSON.stringify(response),
          })
        })
      }}
    />
  )
}

export default Form
