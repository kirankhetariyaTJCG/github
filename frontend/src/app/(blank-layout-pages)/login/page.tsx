// Next Imports
import type { Metadata } from 'next'

// Custom Imports
import Login from '@/views/pages/Login'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account in 1ROOS'
}

const LoginPage = () => <Login />

export default LoginPage
