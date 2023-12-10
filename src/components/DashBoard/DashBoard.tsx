import React, { useEffect, useState } from 'react'
import './DashBoard.css'
import { Outlet, useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie, faPassport } from '@fortawesome/free-solid-svg-icons';
import { FaUserEdit, FaEdit } from 'react-icons/fa';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import { Employee } from '../../db';
import { getPassportById } from '../../services/PassportService';
import { getEmployeeById } from '../../services/EmployeeService';

interface Props {

}

const DashBoard = (props: Props) => {
  const { employeeId } = useParams();
  const [employee, setPassport] = useState<Employee>();

  useEffect(() => {
    const getEmployee = async () => {
      const result = await getEmployeeById(employeeId!);
      setPassport(result?.data);
    }
    getEmployee();
  }, []);
  return (
    <div className="container-fluid">

      <div className="row">
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
          <div className="position-sticky pt-3 sidebar-sticky">
            <ul className="nav flex-column">
              <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mb-1 text-muted text-uppercase">
                <span>Informations</span>
              </h6>

              <li className="nav-item">
                <Link className="nav-link" to="">
                  <FontAwesomeIcon icon={faUserTie} /> Employee
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={`passport/${employee?.passport?.id}`}>
                  <FontAwesomeIcon icon={faPassport} /> Passport
                </Link>
              </li>

            </ul>

            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
              <span>Settings</span>
              <a className="link-secondary" href="#" aria-label="Add a new report">
                <span data-feather="plus-circle" className="align-text-bottom"></span>
              </a>
            </h6>
            <ul className="nav flex-column mb-2">
              <li className="nav-item">
                <Link className="nav-link" to="employee-edit">
                  <FaUserEdit/> Edit Employee
                </Link>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">
                  <FaEdit/> Edit Passport
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">
                  <FaEdit/> Create New Passport
                </a>
              </li>

            </ul>
          </div>
        </nav>

        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4 bg-light">
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>


  )
}

export default DashBoard