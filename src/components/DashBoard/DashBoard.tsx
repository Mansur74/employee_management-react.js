import React from 'react'
import './DashBoard.css'
import { Outlet } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie, faPassport } from '@fortawesome/free-solid-svg-icons';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';

type Props = {}

const DashBoard = (props: Props) => {
  return (
    <div className="container-fluid">
      
      <div className="row">
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
          <div className="position-sticky pt-3 sidebar-sticky">
            <ul className="nav flex-column">
             
              <li className="nav-item">
                <Link className="nav-link" to="employee-detail">
                <FontAwesomeIcon icon={faUserTie} /> Employee
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="passport/1/passport-detail">
                <FontAwesomeIcon icon={faPassport} /> Passport
                </Link>
              </li>
              
            </ul>

            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
              <span>Saved reports</span>
              <a className="link-secondary" href="#" aria-label="Add a new report">
                <span data-feather="plus-circle" className="align-text-bottom"></span>
              </a>
            </h6>
            <ul className="nav flex-column mb-2">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <span data-feather="file-text" className="align-text-bottom"></span>
                  Current month
                </a>
              </li>
              
            </ul>
          </div>
        </nav>

        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4 bg-light mt-5 pt-3">
          <Outlet/>
          <Footer/>
        </div>
      </div>
    </div>
    

  )
}

export default DashBoard