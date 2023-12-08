import React from 'react'
import './EmployeePage.css'
import { FaFacebook} from 'react-icons/fa';
import { FaTwitter} from 'react-icons/fa';
import { FaPinterest} from 'react-icons/fa';
import { FaLinkedin} from 'react-icons/fa';

type Props = {}

const EmployeePage = (props: Props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5">
          <div className="project-info-box mt-0">
            <h5>PROJECT DETAILS</h5>
            <p className="mb-0">Vivamus pellentesque, felis in aliquam ullamcorper, lorem tortor porttitor erat, hendrerit porta nunc tellus eu lectus. Ut vel imperdiet est. Pellentesque condimentum, dui et blandit laoreet, quam nisi tincidunt tortor.</p>
          </div>

          <div className="project-info-box">
            <p><b>Client:</b> CUPCAKE CO</p>
            <p><b>Date:</b> 14.02.2020</p>
            <p><b>Designer:</b> James Doe</p>
            <p><b>Tools:</b> Illustrator</p>
            <p className="mb-0"><b>Budget:</b> $500</p>
          </div>

          <div className="project-info-box mt-0 mb-0">
            <p className="mb-0">
              <span className="fw-bold mr-10 va-middle hide-mobile">Share:</span>
              <a href="#x" className="btn btn-xs btn-facebook btn-circle btn-icon mr-5 mb-0"><FaFacebook/></a>
              <a href="#x" className="btn btn-xs btn-twitter btn-circle btn-icon mr-5 mb-0"><FaTwitter/></a>
              <a href="#x" className="btn btn-xs btn-pinterest btn-circle btn-icon mr-5 mb-0"><FaPinterest/></a>
              <a href="#x" className="btn btn-xs btn-linkedin btn-circle btn-icon mr-5 mb-0"><FaLinkedin/></a>
            </p>
          </div>
        </div>

        <div className="col-md-7">
          <img src="https://www.bootdey.com/image/400x300/FFB6C1/000000" alt="project-image" className="rounded" id='profileImg' />
          <div className="project-info-box">
            <p><b>Categories:</b> Design, Illustration</p>
            <p><b>Skills:</b> Illustrator</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeePage