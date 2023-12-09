import React, { useEffect, useState } from 'react'
import EmployeeCard from '../../components/Cards/EmployeeCard/EmployeeCard'
import Footer from '../../components/Footer/Footer'
import { getAllEmployees } from '../../services/EmployeeService'
import { Employee } from "../../db"

type Props = {}

const EmployeesPage = (props: Props) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [serverError, setServerError] = useState<String | null>(null);

  useEffect(() => {
    const getEmployees = async () => {
      const result = await getAllEmployees();
      if(typeof result === "string" )
        setServerError(result);
      else if(Array.isArray(result.data))
        setEmployees(result.data);
      
    }
    getEmployees()
  }, []);


  return (
    <div className="container">

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mt-5 pt-3">
        {
          employees.length > 0 ? (
            employees.map((employee) => {
              return <EmployeeCard employee={employee} />
            })
          ) : ("Empty")
        }
      
      </div>
      <Footer/>
    </div>
  )
}

export default EmployeesPage