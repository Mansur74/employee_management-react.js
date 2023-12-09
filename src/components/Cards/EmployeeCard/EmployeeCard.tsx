import React from 'react'
import { Link } from 'react-router-dom'
import { Employee } from '../../../db'

interface Props {
  employee: Employee
}

const EmployeeCard = ({employee}: Props) => {
  return (
    <div className="col">
      <div className="card shadow-sm">
        <img src={employee.imgURL} className="card-img-top" alt="..."/>
        <div className="card-body">
          <p className="card-text">{employee.firstName} {employee.lastName}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <Link to={`${employee.id}`} className='btn btn-sm btn-outline-secondary'>
                View
              </Link>
              <Link to="" className='btn btn-sm btn-outline-secondary'>
                Edit
              </Link>
            </div>
            <small className="text-muted">9 mins</small>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeCard