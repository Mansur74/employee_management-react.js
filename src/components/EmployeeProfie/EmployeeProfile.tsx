import React, { useEffect, useState } from 'react'
import { getAllEmployees, getEmployeeById } from '../../services/EmployeeService';
import { Employee } from '../../db';
import Footer from '../Footer/Footer';
import EmployeeCard from '../Cards/EmployeeCard/EmployeeCard';
import { FaFacebook, FaLinkedin, FaPinterest, FaTwitter } from 'react-icons/fa';
import './EmployeeProfile.css'
import { useParams } from 'react-router';

type Props = {}

const EmployeeProfile = (props: Props) => {
  const {employeeId} = useParams();
  const [employee, setEmployee] = useState<Employee>();
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    const getEmployee = async () => {
      const result = await getEmployeeById(employeeId!);
      setEmployee(result?.data); 
      setDate(new Date(result?.data.hiringDate!));
    }
    getEmployee();
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5">
          <div className="project-info-box mt-0">
            <h5>{employee?.firstName} {employee?.lastName}</h5>
            <p className="mb-0">{employee?.description}</p>
          </div>

          <div className="project-info-box">
            <p><b>Age</b> {employee?.age} </p>
            <p><b>Hiring Date:</b> {date?.toLocaleDateString()}</p>
            <p><b>Department:</b> {employee?.department}</p>
            <p><b>Gender:</b> Gender</p>
            <p className="mb-0"><b>Salary:</b> {employee?.salary}₺</p>
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
          <img src={employee?.imgURL} className="" height="434px" alt="..."/>
 
        </div>
      </div>
    </div>
  )
} 

export default EmployeeProfile