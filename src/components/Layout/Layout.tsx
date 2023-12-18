import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet, useNavigate } from 'react-router'
import { signIn, signUp } from '../../services/UserService'
import { User } from '../../db'
import CardSpinner from '../Spinner/CardSpinner/CardSpinner'

type Props = {}

const Layout = (props: Props) => {
  const [user, setUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    const getUser = async () => {
      const result = await localStorage.getItem("user");
      setUser(JSON.parse(result!));
    }
    getUser();
  }, []);

  const handleSignOut = async () => {
    setIsLoading(true);
    await localStorage.removeItem("user");
    setUser(null);
    setIsLoading(false);
  }

  return (
    <div>
      <Navbar user={user!} handleSignOut={handleSignOut} />
      <div className='mt-5 pt-4 bg-light'>
       {
        isLoading ? 
        <div style={{position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"}}>
            <CardSpinner/>
        </div>: 
        <Outlet context={{setUser}}/>
       }
      </div>
    </div>
  )
}

export default Layout