import { useEffect, useState } from 'react'
import EmployeeCard from '../../components/Cards/EmployeeCard/EmployeeCard'
import Footer from '../../components/Footer/Footer'
import { getAllEmployees } from '../../services/EmployeeService'
import { Employee, User } from "../../db"
import { useLocation, useNavigate } from 'react-router'
import CardSpinner from '../../components/Spinner/CardSpinner/CardSpinner'

type Props = {}

const EmployeesPage = (props: Props) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFiteredEmployees] = useState<Employee[]>([]);
  const [serverError, setServerError] = useState<String | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(parseInt(params.get("page")!));
  const [size, setSize] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getEmployees = async () => {
    setIsLoading(true);
    const user: User = JSON.parse(await localStorage.getItem("user")!);
    setUser(user);

    if (user) {

      try {
        const result = await getAllEmployees(page, size);
        setEmployees(result.data.data.rows);
        setFiteredEmployees(result.data.data.rows);
        setTotalPages(result.data.data.totalPages);
      } catch (error: any) {
        setServerError(error.message);
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
    if (page < totalPages - 1) {
      const nextPage = page + 1;
      setPage(nextPage)
      navigate(`/employee?page=${nextPage}`)
    }
    else
      return
  }

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const result = employees.filter(employee => employee.firstName?.toLowerCase().includes(value.toLowerCase()) 
    || employee.lastName?.toLowerCase().includes(value.toLowerCase()))
    setFiteredEmployees(result);
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

        <div className='container-fluid mb-5'>
          <form className="d-flex justify-content-center">
            <input className="form-control w-25" type="search" placeholder="Filter the page" aria-label="Search" onChange={handleFilter} />
          </form>
        </div>

        <div className="container">
          {
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mb-3">
              {
                filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => {
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
              {Array.from({ length: totalPages }, (_, index) => (
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
      <CardSpinner />
  )
}

export default EmployeesPage