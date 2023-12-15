import React from 'react'
import { useOutletContext } from 'react-router';

type Props = {}

interface OuterContext {
  handleSignIn: (e: React.FormEvent<HTMLFormElement>) => void,
  handleSignUp: (e: React.FormEvent<HTMLFormElement>) => void,
}

const SignUpPage = (props: Props) => {
  const {handleSignUp}: OuterContext = useOutletContext();
  return (
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
        <button className="btn btn-primary w-100 py-2" type="submit">Sign Up</button>
        <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
      </form>
    </div>
  )
}

export default SignUpPage