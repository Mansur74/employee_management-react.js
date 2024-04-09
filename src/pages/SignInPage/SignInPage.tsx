import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import './SignInPage.css'
import { useNavigate, useOutletContext } from 'react-router'
import { AuthRequest, AuthResponse, Result, User } from '../../db';
import { useState } from 'react';
import CardSpinner from '../../components/Spinner/CardSpinner/CardSpinner';
import { getAccessToken, getRefreshToken, signIn } from '../../services/AuthorizationService';
import axios from 'axios';

interface OuterContext {
  setIsSignIn: (data: boolean) => void
}
type Props = {}

const SignInPage = (props: Props) => {
  const { setIsSignIn }: OuterContext = useOutletContext();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [serverError, setServerError] = useState<string>();
  const [isRemember, setIsRemember] = useState<boolean>() ;
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = new FormData(e.target as HTMLFormElement);

    const authRequest: AuthRequest = {
      email: form.get("email") as string,
      password: form.get("password") as string
    }

    try {
      const result = (await signIn(authRequest)).data.data;
      const refreshToken: string = result.refreshToken;
      isRemember ? localStorage.setItem("refreshToken", refreshToken) : sessionStorage.setItem("refreshToken", refreshToken);
      setIsSignIn(true);
      navigate(`/employee?page=${0}`);
    }
    catch (error: any) {
      if(axios.isAxiosError(error)){
        const result: Result = error.response?.data;
        setServerError(result.message);
      }   

    }

    setIsLoading(false);

  }

  return (
    <>
      {
        isLoading ?

          <CardSpinner/>
          :
          <>
            <div className="form-signin w-100 m-auto">
              <form onSubmit={handleSignIn}>
                <img className="mb-4" src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating">
                  <input type="email" name='email' className="form-control" id="email" placeholder="name@example.com" />
                  <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating">
                  <input type="password" name='password' className="form-control" id="password" placeholder="Password" />
                  <label htmlFor="password">Password</label>
                </div>
                {
                  serverError && <span className="mt-3 text-danger">{serverError}</span>
                }

                <div className="form-check text-start my-3">
                  <input className="form-check-input" type="checkbox" checked={isRemember} onChange={(event) => setIsRemember(event.target.checked)} id="flexCheckDefault" />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    Remember me
                  </label>
                </div>
                <button className="btn btn-primary w-100 py-2 mb-3" type="submit">Sign in</button>
                <span className="mt-3">Do you don't have an account? <Link to="/sign-up">Sign Up</Link></span>
                <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2024</p>
              </form>
            </div>
            <Footer />
          </>
      }
    </>
  )
}

export default SignInPage