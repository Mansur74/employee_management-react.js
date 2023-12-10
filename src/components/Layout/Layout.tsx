import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router'

type Props = {}

const Layout = (props: Props) => {
  return (
    <div>
      <Navbar/>
      <div className='mt-5 pt-4 bg-light'>
       <Outlet/>
      </div>
    </div>
  )
}

export default Layout