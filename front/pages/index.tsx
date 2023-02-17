import AuthProvider from '@/app/Layout/AuthProvider'
import Layout from '@/app/Layout/Layout'
import Todo from '@/app/screens/Todo/Todo'
import React from 'react'
import { AppPage } from './_app'

const TodoPage: AppPage = () => {
  AuthProvider()
  return <Todo />
}

TodoPage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>

export default TodoPage
