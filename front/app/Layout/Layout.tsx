import React, { PropsWithChildren } from 'react'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className='max-w-5xl w-full h-screen mx-auto'>{children}</div>
}

export default Layout
