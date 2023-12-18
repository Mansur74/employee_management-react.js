import { useEffect, useState } from 'react'
import EmployeeCard from '../../components/Cards/EmployeeCard/EmployeeCard'
import Footer from '../../components/Footer/Footer'
import { getAllEmployees } from '../../services/EmployeeService'
import { Employee, User } from "../../db"
import { useLocation, useNavigate } from 'react-router'
import CardSpinner from '../../components/Spinner/CardSpinner/CardSpinner'
import { Link } from 'react-router-dom'

type Props = {}

const EmployeesPage = (props: Props) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [serverError, setServerError] = useState<String | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [totalSize, setTotalSize] = useState<number>(0);
  const [page, setPage] = useState<number>(parseInt(params.get("page")!));
  const [size, setSize] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getEmployees = async () => {
    setIsLoading(true);
    const user: User = JSON.parse(await localStorage.getItem("user")!);
    setUser(user);

    if (user) {
      const result = await getAllEmployees(page, size);
      if (typeof result === "string")
        setServerError(result);
      else if (Array.isArray(result.data.rows)) {
        setEmployees(result.data.rows);
        setTotalSize(result.data.count);
      }
      setIsLoading(false);

    }
    else
      navigate("/sign-in");
  }

  useEffect(() => {
    getEmployees();
  }, [page]);

  const handlePage = async (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const page = parseInt(target.value) - 1;
    setPage(page);
    navigate(`/employee?page=${page}`)
  }

  const handlePreviousPage = async (e: React.MouseEvent<HTMLInputElement>) => {
    if (page > 0) {
      const previousPage = page - 1;
      setPage(previousPage)
      navigate(`/employee?page=${previousPage}`)
    }
    else
      return;
  }

  const handleNextPage = async (e: React.MouseEvent<HTMLInputElement>) => {
    if (page < totalSize - 1) {
      const nextPage = page + 1;
      setPage(nextPage)
      navigate(`/employee?page=${nextPage}`)
    }
    else
      return
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
          {
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mb-3">
              {
                employees.length > 0 ? (
                  employees.map((employee) => {
                    return <EmployeeCard key={employee.id} employee={employee} isLoading={isLoading} /> 
                  })
                ) : ("Empty")
              }

            </div>
          }

          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <input type='button' defaultValue="&laquo;" className="page-link" onClick={handlePreviousPage} aria-label="Previous" />

              </li>
              {Array.from({ length: totalSize }, (_, index) => (
                <li key={index} className="page-item"><input type='button' onClick={handlePage} defaultValue={index + 1} className={page === index ? "page-link bg-primary text-white" : "page-link"} /></li>
              ))}
              <li className="page-item">
                <input type='button' defaultValue="&raquo;" className="page-link" onClick={handleNextPage} aria-label="Next" />
              </li>
            </ul>
          </nav>
          <Footer />
        </div>
      </> :
      <CardSpinner/>
  )
}

export default EmployeesPage