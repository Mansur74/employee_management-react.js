import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet, useNavigate } from 'react-router'


type Props = {}

const Layout = (props: Props) => {
  const [isSignIn, setIsSignIn] = useState<boolean>();


  return (
    <div>
      <Navbar isSignIn={isSignIn!} setIsSignIn={setIsSignIn} />
      <div className='mt-5 pt-4 bg-light'>
        <Outlet context={{setIsSignIn}} />
      </div>
    </div>
  )
}

export default Layout