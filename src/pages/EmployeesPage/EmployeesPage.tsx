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
  const navigate = useNavigate();

  useEffect(() => {
    const getEmployees = async () => {
      const user: User = JSON.parse(await localStorage.getItem("user")!);
      setUser(user);
      console.log(user);

      if (user) {
        const result = await getAllEmployees();
        if (typeof result === "string")
          setServerError(result);
        else if (Array.isArray(result.data))
          setEmployees(result.data);
      }
      else
        navigate("/sign-in");
    }
    getEmployees();
  }, []);


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
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {
              employees.length > 0 ? (
                employees.map((employee) => {
                  return <EmployeeCard key={employee.id} employee={employee} />
                })
              ) : ("Empty")
            }

          </div>
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