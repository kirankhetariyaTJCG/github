// Next Imports
import type { Metadata } from 'next'

// Custom Imports
import RegisterView from '@/views/pages/Register'

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register your account'
}

const Register = () => <RegisterView />

export default Register
