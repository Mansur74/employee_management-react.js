import React, { useEffect, useState } from 'react'
import { deleteMyEmployeeById, getMyEmployeeById } from '../../services/EmployeeService';
import { Employee } from '../../db';
import { FaFacebook, FaLinkedin, FaPinterest, FaTwitter } from 'react-icons/fa';
import './EmployeeProfile.css'
import { useNavigate, useParams } from 'react-router';
import { getAccessToken, getRefreshToken } from '../../services/AuthorizationService';

type Props = {}

const EmployeeProfile = (props: Props) => {
  const navigate = useNavigate();
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState<Employee>();
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    if (!getRefreshToken())
      navigate(`/sign-in`)
    else {
      getEmployees();
    }
  }, []);

  const getEmployees = async () => {
    const refreshToken: string = getRefreshToken()!;
    const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
    const result = await getMyEmployeeById(employeeId!, accessToken);
    setEmployee(result?.data.data);
    setDate(new Date(result?.data.data.hiringDate!));
  }

  const deleteEmployee = async () =>{
    const refreshToken: string = getRefreshToken()!;
    const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
    await deleteMyEmployeeById(employeeId!, accessToken); 
    navigate("/employee");
  }

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
            <p><b>Gender:</b> {employee?.gender}</p>
            <p className="mb-0"><b>Salary:</b> {employee?.salary}₺</p>
          </div>

          <div className="d-flex justify-content-between project-info-box mt-0 mb-0">
            <div>
              <p className="mb-0">
                <span className="fw-bold mr-10 va-middle hide-mobile">Share: </span>
                <a href="#x" className="btn btn-xs btn-facebook btn-circle btn-icon mr-5 mb-0"><FaFacebook /></a>
                <a href="#x" className="btn btn-xs btn-twitter btn-circle btn-icon mr-5 mb-0"><FaTwitter /></a>
                <a href="#x" className="btn btn-xs btn-pinterest btn-circle btn-icon mr-5 mb-0"><FaPinterest /></a>
                <a href="#x" className="btn btn-xs btn-linkedin btn-circle btn-icon mr-5 mb-0"><FaLinkedin /></a>
              </p>
            </div>
            <input value="Delete Value" onClick={deleteEmployee} type="button" className="btn btn-outline-danger"/>
          </div>
        </div>

        <div className="col-md-7">
          <img src={employee?.imgURL} className="" height="434px" alt="..." />

        </div>
      </div>
    </div>
  )
}

export default EmployeeProfile