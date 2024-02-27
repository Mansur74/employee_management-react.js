import React, { SyntheticEvent, useEffect, useState } from 'react'
import { getMyEmployeeById, updateMyEmployeeById } from '../../services/EmployeeService';
import { useParams } from 'react-router';
import { Employee } from '../../db';
import { useNavigate } from 'react-router-dom';
import { getAccessToken, getRefreshToken } from '../../services/AuthorizationService';

type Props = {}

const EmployeeEdit = (props: Props) => {
  const navigate = useNavigate();
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState<Employee>();

  useEffect(() => {
    if (!getRefreshToken())
      navigate(`/sign-in`)
    else {
      getEmployee();
    }
  }, []);

  const getEmployee = async () => {
    const refreshToken: string = getRefreshToken()!;
    const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
    const result = await getMyEmployeeById(employeeId!, accessToken);
    setEmployee(result?.data.data!);
  }

  const handleUpdateEmployee = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const body: Employee = {
      firstName: data.get("firstName") as string,
      lastName: data.get("lastName") as string,
      gender: data.get("gender") as string,
      age: parseInt(data.get("age") as string) as number,
      hiringDate: data.get("hiringDate") as string,
      department: data.get("department") as string,
      salary: parseInt(data.get("salary") as string) as number,
      description: data.get("description") as string,
      imgURL: data.get("imgURL") as string
    }

    const refreshToken: string = getRefreshToken()!;
    const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
    await updateMyEmployeeById(employeeId!, body, accessToken);
    navigate(`/employee/${employeeId}`);
  }


  return (
    <div className='container ps-5 pe-5'>
      <form onSubmit={handleUpdateEmployee}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">Firstname</label>
          <input type="text" name='firstName' defaultValue={employee?.firstName} className="form-control" id="firstName" aria-describedby="firstName" />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Lastname</label>
          <input type="text" name='lastName' defaultValue={employee?.lastName} className="form-control" id="lastName" aria-describedby="lastName" />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender</label>
          <input type="text" name='gender' defaultValue={employee?.gender} className="form-control" id="gender" aria-describedby="gender" />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input type="text" name='age' defaultValue={employee?.age} className="form-control" id="age" aria-describedby="age" />
        </div>
        <div className="mb-3">
          <label htmlFor="hiringDate" className="form-label">Hiring Date</label>
          <input type="datetime-local" name='hiringDate' defaultValue={employee?.hiringDate} className="form-control" id="hiringDate" aria-describedby="hiringDate" />
        </div>
        <div className="mb-3">
          <label htmlFor="department" className="form-label">Department</label>
          <input type="text" name='department' defaultValue={employee?.department} className="form-control" id="department" aria-describedby="department" />
        </div>
        <div className="mb-3">
          <label htmlFor="salary" className="form-label">Salary</label>
          <input type="text" name='salary' defaultValue={employee?.salary} className="form-control" id="salary" aria-describedby="salary" />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" name='description' defaultValue={employee?.description} className="form-control" id="description" aria-describedby="description" />
        </div>
        <div className="mb-3">
          <label htmlFor="imgURL" className="form-label">Image URL</label>
          <input type="text" name='imgURL' defaultValue={employee?.imgURL} className="form-control" id="imgURL" aria-describedby="imgURL" />
        </div>

        <button type="submit" className="btn btn-secondary">Submit</button>
      </form>
    </div>
  )
}

export default EmployeeEdit