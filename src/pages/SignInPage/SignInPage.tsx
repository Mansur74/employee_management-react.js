import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import './SignInPage.css'
import { useNavigate, useOutletContext } from 'react-router'
import { User } from '../../db';
import { useState } from 'react';
import { signIn } from '../../services/UserService';
import CardSpinner from '../../components/Spinner/CardSpinner/CardSpinner';

type Props = {}

interface OuterContext {
  setUser: (user: User) => void,
}

const SignInPage = (props: Props) => {
  const { setUser }: OuterContext = useOutletContext();
  const [isLoading, setIsLoading] = useState<boolean>();
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = new FormData(e.target as HTMLFormElement);

    const body = {
      email: form.get("email") as string,
      password: form.get("password") as string
    }

    const result = await signIn(body);

    if (typeof result?.data !== "string") {
      await localStorage.setItem("user", JSON.stringify(result?.data!));
      setUser(result?.data!);
      navigate(`/employee?page=${0}`);
    }
    setIsLoading(false);

  }

  return (
    <>
      {
        isLoading ?

            <div style={{height: 500}}>
              <CardSpinner />
            </div>
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

                <div className="form-check text-start my-3">
                  <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    Remember me
                  </label>
                </div>
                <button className="btn btn-primary w-100 py-2 mb-3" type="submit">Sign in</button>
                <span className="mt-3">Do you don't have an account? <Link to="/sign-up">Sign Up</Link></span>
                <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
              </form>
            </div>
            <Footer />
          </>
      }
    </>
  )
}

export default SignInPage