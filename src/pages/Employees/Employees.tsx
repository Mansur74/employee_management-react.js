import React from 'react'
import Employee from '../Employee/Employee'

type Props = {}

const Home = (props: Props) => {
  return (
    <div className="container">

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

        <Employee/>
        
      </div>
    </div>
  )
}

export default Home