import { useEffect, useState } from 'react'
import './DashBoard.css'
import { Outlet, useNavigate, useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie, faPassport } from '@fortawesome/free-solid-svg-icons';
import { FaUserEdit, FaEdit } from 'react-icons/fa';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import { Employee, User } from '../../db';
import { getEmployeeById } from '../../services/EmployeeService';
import CardSpinner from '../Spinner/CardSpinner/CardSpinner';

interface Props {

}

const DashBoard = (props: Props) => {
  const { employeeId } = useParams();
  const [employee, setPassport] = useState<Employee>();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getEmployee = async () => {
      const user: User = JSON.parse(await localStorage.getItem("user")!);
      setUser(user)
      if (user) {
        const result = await getEmployeeById(employeeId!);
        setPassport(result?.data.data);
      }
      else
        navigate("/sign-in");
    }
    getEmployee();
  }, []);
  return (
    <>
      {
        user ? 
        <div className="container-fluid">
          <div className="row">
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
              <div className="position-sticky pt-3 sidebar-sticky">
                <ul className="nav flex-column">
                  <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mb-1 text-muted text-uppercase">
                    <span>Informations</span>
                  </h6>

                  <li className="nav-item">
                    <Link className="nav-link" to={`/employee/${employee?.id}`}>
                      <FontAwesomeIcon icon={faUserTie} /> Employee
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to={employee?.passport ? `/employee/${employee?.id}/passport` : `/employee/${employee?.id}/passport-create`}>
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
                    <Link className="nav-link" to={`/employee/${employee?.id}/employee-edit`}>
                      <FaUserEdit /> Edit Employee
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to={employee?.passport ? `/employee/${employee?.id}/passport-edit` : `/employee/${employee?.id}/passport-create`}>
                      <FaEdit /> Edit Passport
                    </Link>

                  </li>

                </ul>
              </div>
            </nav>

            <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4 bg-light">
              <Outlet />
              <Footer />
            </div>
          </div>
        </div> :
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
          }}>
            <CardSpinner />
        </div>

      }
    </>


  )
}

export default DashBoard