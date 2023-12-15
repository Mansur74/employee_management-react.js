import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet, useNavigate } from 'react-router'
import { signIn, signUp } from '../../services/UserService'
import { User } from '../../db'
import Spinner from '../Spinner/Spinner'

type Props = {}

const Layout = (props: Props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    const getUser = async () => {
      const result = await localStorage.getItem("user");
      setUser(JSON.parse(result!));
    }
    getUser();
  }, [])

  const handleSignIn = async(e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
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
    setIsLoading(false);

  }

  const handleSignUp = async(e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = new FormData(e.target as HTMLFormElement);

    const body = {
      
      firstName: form.get("firstName") as string,
      lastName: form.get("lastName") as string,
      userName: form.get("userName") as string,
      email: form.get("email") as string,
      password: form.get("password") as string,
    }

    const result = await signUp(body);

    navigate("/sign-in");

    setIsLoading(false);

  }

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
            <Spinner/>
        </div>: 
        <Outlet context={{handleSignIn, handleSignUp}}/>
       }
      </div>
    </div>
  )
}

export default Layout