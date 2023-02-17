import Layout from '@/app/Layout/Layout'
import Auth from '@/app/screens/Auth/Auth'
import React from 'react'
import { AppPage } from './_app'

const AuthPage: AppPage = () => {
  return <Auth />
}

AuthPage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>

export default AuthPage
