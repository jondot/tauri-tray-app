/* eslint-disable no-console */
import { invoke } from '@tauri-apps/api'
import { SignupForm } from './components/signup'

const Form = () => (
  <SignupForm
    onSubmit={(d: any) => {
      console.log('submit', d)
      invoke('greet', d).then((response) => console.log(response))
    }}
  />
)

export default Form
