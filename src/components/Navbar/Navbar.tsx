import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User } from '../../db';
import { getAccessToken, getMe, getRefreshToken } from '../../services/AuthorizationService';
import { CiSettings, CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

interface Props {
  isSignIn: boolean,
  setIsSignIn: (data: boolean) => void
}
const Navbar = ({ isSignIn, setIsSignIn }: Props) => {
  const [user, setUser] = useState<User | null>();
  const navigate = useNavigate();

  useEffect(() => {
    if (getRefreshToken()) {
      setIsSignIn(true);
      getUser();
    }
    else {
      setIsSignIn(false);
      setUser(null);
    }
  }, [isSignIn]);

  const getUser = async () => {
    const refreshToken = getRefreshToken()!;
    const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
    const user = (await getMe(accessToken)).data.data;
    setUser(user);
  }

  const signOut = async () => {
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("refreshToken");
    setUser(null);
    setIsSignIn(false);
    navigate("/sign-in")
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <Link className="me-2" to={`/employee?page=${0}`}><img src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="30" height="25" /></Link>
        <a className="navbar-brand" href={`/employee?page=${0}`}>Employee Management</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          {
            isSignIn &&
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" href={`/employee?page=${0}`}>Employees</a>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Others
                </a>
                <ul className="dropdown-menu">
                  <Link className="dropdown-item" to="/employee/create">Create Employee</Link>
                  {user?.roles?.find(role => role.name === "ADMIN") ? <Link className="dropdown-item" to="/countries">Countries</Link> : ""}
                </ul>
              </li>

            </ul>
          }

          {
            isSignIn ?
              <ul className="navbar-nav ms-auto">
                <li className="nav-item dropdown">
                  <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle avatar-sm img-thumbnail" alt="profile-image" />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <Link className="dropdown-item" to="/user/profile"><CgProfile/> Profile</Link>
                    <Link className="dropdown-item" to="/user/profile"><CiSettings/> Settings</Link>
                    <button type='button' className="dropdown-item" onClick={signOut}><CiLogout/> Logout</button>
                  </ul>
                </li>

              </ul> :
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link active" to="/sign-in">Sign In</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/sign-up">Sign Up</Link>
                </li>
              </ul>
          }

        </div>
      </div>
    </nav>
  )
}

export default Navbar