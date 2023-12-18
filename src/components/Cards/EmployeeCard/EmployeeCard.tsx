import React from 'react'
import { Link } from 'react-router-dom'
import { Employee } from '../../../db'
import CardSpinner from '../../Spinner/CardSpinner/CardSpinner'

interface Props {
  employee: Employee
  isLoading: boolean
}

const EmployeeCard = ({ employee, isLoading }: Props) => {
  return (
    <div className="col">
      <div className="card shadow-sm">
        {
          !isLoading
            ?
            <img src={employee.imgURL} className="card-img-top" style={{ objectFit: "cover" }} height={250} alt="..." />
            :
            <div style={{ height: 250 }}>
              <CardSpinner />
            </div>
        }


        <div className="card-body">
          <p className="card-text">{employee.firstName} {employee.lastName}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">

              {
                !isLoading ?
                  <>
                    <Link to={`${employee.id}`} className='btn btn-sm btn-outline-secondary'>
                      View
                    </Link>
                    <Link to={`${employee.id}/employee-edit`} className='btn btn-sm btn-outline-secondary'>
                      Edit
                    </Link>
                  </>
                  :
                  <>
                    <button className='btn btn-sm btn-outline-secondary'>
                      View
                    </button>
                    <button className='btn btn-sm btn-outline-secondary'>
                      Edit
                    </button>
                  </>
              }

            </div>
            <small className="text-muted">9 mins</small>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeCard