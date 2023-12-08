import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router'

type Props = {}

const Layout = (props: Props) => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default Layout