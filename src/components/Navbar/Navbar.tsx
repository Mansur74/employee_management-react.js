import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { User } from '../../db';

interface Props {
 user: User,
 handleSignOut: () => void
}
const Navbar = ({user, handleSignOut}: Props) => {


  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/employee">Employee Management</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/employee">Employees</Link>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Others
              </a>
              <ul className="dropdown-menu">
                <Link className="dropdown-item" to="/employee/create">Create Employee</Link>
                <Link className="dropdown-item" to="/countries">Countries</Link>
              </ul>
            </li>

            {
              user ?
                <li className="nav-item">
                  <input type='button' value="Sign Out" onClick={handleSignOut} className="nav-link active" />
                </li> :
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/sign-in">Sign In</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/sign-up">Sign Up</Link>
                  </li>
                </>
            }

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar