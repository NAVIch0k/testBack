import Image from 'next/image'
import React from 'react'
import logout from '../../public/svg/logout.svg'
import s from './GlobalHeader.module.scss'
const GlobalHeader = () => {
  return (
    <div className={s.cont}>
      <p>Todo List</p>
      <Image src={logout} width={30} height={30} alt='logout' className={s.img}/>
    </div>
  )
}

export default GlobalHeader
