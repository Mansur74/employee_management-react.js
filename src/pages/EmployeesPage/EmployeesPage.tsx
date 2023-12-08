import React from 'react'
import EmployeeCard from '../../components/Cards/EmployeeCard/EmployeeCard'
import Footer from '../../components/Footer/Footer'

type Props = {}

const EmployeesPage = (props: Props) => {
  return (
    <div className="container">

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

        <EmployeeCard/>
      </div>
      <Footer/>
    </div>
  )
}

export default EmployeesPage