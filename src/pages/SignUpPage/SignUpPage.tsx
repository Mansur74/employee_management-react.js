import React, { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import { signUp } from '../../services/UserService';
import Spinner from '../../components/Spinner/Spinner';

type Props = {}

const SignUpPage = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
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

  return (
    <>
      {
        isLoading ?
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}>
            <Spinner />
          </div> :
          <>
            <div className="form-signin w-100 m-auto">
              <form onSubmit={handleSignUp}>
                <img className="mb-4" src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
                <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

                <div className="form-floating">
                  <input type="firstName" name='firstName' className="form-control" id="firstName" placeholder="Firstname" />
                  <label htmlFor="firstName">Firstname</label>
                </div>
                <div className="form-floating">
                  <input type="lastName" name='lastName' className="form-control" id="lastName" placeholder="Lastname" />
                  <label htmlFor="lastName">Lastname</label>
                </div>
                <div className="form-floating">
                  <input type="userName" name='userName' className="form-control" id="userName" placeholder="Username" />
                  <label htmlFor="userName">Username</label>
                </div>
                <div className="form-floating">
                  <input type="email" name='email' className="form-control" id="email" placeholder="name@example.com" />
                  <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating">
                  <input type="password" name='password' className="form-control" id="password" placeholder="Password" />
                  <label htmlFor="password">Password</label>
                </div>

                <div className="form-check text-start my-3">
                  <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    Remember me
                  </label>
                </div>
                <button className="btn btn-primary w-100 py-2 mb-3" type="submit">Sign Up</button>
                <span className="mt-3">Do you have an account? <Link to="/sign-in">Sign In</Link></span>
                <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
              </form>
            </div>
            <Footer />
          </>
      }
    </>

  )
}

export default SignUpPage