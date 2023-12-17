import { useEffect, useState } from 'react'
import EmployeeCard from '../../components/Cards/EmployeeCard/EmployeeCard'
import Footer from '../../components/Footer/Footer'
import { getAllEmployees } from '../../services/EmployeeService'
import { Employee, User } from "../../db"
import { useNavigate } from 'react-router'
import Spinner from '../../components/Spinner/Spinner'

type Props = {}

const EmployeesPage = (props: Props) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [serverError, setServerError] = useState<String | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(1);
  const [totalSize, setTotalSize] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getEmployees = async () => {
      const user: User = JSON.parse(await localStorage.getItem("user")!);
      setUser(user);
      console.log(user);

      if (user) {
        const result = await getAllEmployees(page, size);
        if (typeof result === "string")
          setServerError(result);
        else if (Array.isArray(result.data.rows)) {
          setEmployees(result.data.rows);
          setTotalSize(result.data.count);
        }

      }
      else
        navigate("/sign-in");
    }
    getEmployees();
  }, []);

  const handlePage = async (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const page = parseInt(target.value)-1;
    const result = await getAllEmployees(page, size);
    if (typeof result === "string")
      setServerError(result);
    else if (Array.isArray(result.data.rows)) {
      setEmployees(result.data.rows);
      setTotalSize(result.data.count);
    }
  }


  return (
    user ?
      <>
        <div className="mb-5">
          <div className="p-5 text-center bg-dark bg-gradient">
            <div className="container py-5">
              <h1 className="text-white">Employees</h1>
              <p className="col-lg-8 mx-auto lead">
                This takes the basic jumbotron above and makes its background edge-to-edge with a <code>.container</code> inside to align content. Similar to above, it's been recreated with built-in grid and utility classes.
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mb-3">
            {
              employees.length > 0 ? (
                employees.map((employee) => {
                  return <EmployeeCard key={employee.id} employee={employee} />
                })
              ) : ("Empty")
            }

          </div>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {Array.from({ length: totalSize }, (_, index) => (
                <li key={index} className="page-item"><input type='button' onClick={handlePage} value={index + 1} className="page-link" /></li>
              ))}
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
          <Footer />
        </div>
      </> :
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}>
        <Spinner />
      </div>
  )
}

export default EmployeesPage