import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet, useNavigate } from 'react-router'
import { getAccessToken, logout } from '../../services/AuthorizationService'
import { User } from '../../db'
import CardSpinner from '../Spinner/CardSpinner/CardSpinner'

type Props = {}

const Layout = (props: Props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>();

  const handleSignOut = async () => {
    await logout();
    localStorage.removeItem("user");
    setUser(null);
    navigate("/sign-in")
  }

  return (
    <div>
      <Navbar user={user!} handleSignOut={handleSignOut} />
      <div className='mt-5 pt-4 bg-light'>
        <Outlet context={{user, setUser}}/>
      </div>
    </div>
  )
}

export default Layout