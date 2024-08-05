import React from 'react'
import CreateNewBoard from './CreateNewBoard/CreateNewBoard'
import MyBoards from './MyBoards/MyBoards'
import NeedHelp from './NeedHelp/NeedHelp'
import LogOut from './LogOut/LogOut'

const Sidebar = () => {
  return (
    <div>
        <svg className={s.iconMenu}>
        </svg>
         <div className={s.sidebar}>
            <div className={s.title}>
                <div className={s.logo}>
                <svg className={s.logoIcon}>
              </svg>
                </div>
                <h2 className={s.mainTitle}>Task Pro</h2>
            </div>
            <CreateNewBoard />
         </div>
         <MyBoards/>
         <div className={s.needHelp}>
            <NeedHelp/>
            <LogOut/>
         </div>
    </div>
  )
}

export default Sidebar
