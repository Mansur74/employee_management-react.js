import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet, useNavigate } from 'react-router'
import { signIn } from '../../services/UserService'
import { User } from '../../db'

type Props = {}

const Layout = (props: Props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const getUser = async () => {
      const result = await localStorage.getItem("user");
      setUser(JSON.parse(result!));
    }
    getUser();
  }, [])

  const handleSignIn = async(e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    const body = {
      email: form.get("email") as string,
      password: form.get("password") as string
    }

    const result = await signIn(body);
    
    if(typeof result?.data !== "string"){
      await localStorage.setItem("user", JSON.stringify(result?.data!)); 
      setUser(result?.data!); 
      navigate("/employee");
    }

  }

  const handleSignOut = async () => {
    await localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <div>
      <Navbar user={user!} handleSignOut={handleSignOut} />
      <div className='mt-5 pt-4 bg-light'>
       <Outlet context={handleSignIn}/>
      </div>
    </div>
  )
}

export default Layout