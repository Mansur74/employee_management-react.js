import React, { SyntheticEvent, useEffect, useState } from 'react'
import { getEmployeeById, updateEmployeeById } from '../../services/EmployeeService';
import { useParams } from 'react-router';
import { Employee } from '../../db';

type Props = {}

const EmployeeEdit = (props: Props) => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState<Employee>({});

  useEffect(() => {
    const getEmployee = async () => {
      const result = await getEmployeeById(employeeId!);
      setEmployee(result?.data!);
    }
    getEmployee();
  }, []);

  const updateEmployee = async () => {
    await updateEmployeeById(employeeId!, employee!);
  }
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
  
    setEmployee(prevEmployee => ({
      ...prevEmployee,
      [name]: name === 'age' || name === 'salary' ? parseInt(value) : value,
    }));
  };

  return (
    <div className='container ps-5 pe-5'>
      <form onSubmit={updateEmployee}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">Firstname</label>
          <input type="text" name='firstName' defaultValue={employee?.firstName} onChange={handleChange} className="form-control" id="firstName" aria-describedby="firstName" />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Lastname</label>
          <input type="text" name='lastName' defaultValue={employee?.lastName} onChange={handleChange} className="form-control" id="lastName" aria-describedby="lastName" />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input type="text" name='age' defaultValue={employee?.age} onChange={handleChange} className="form-control" id="age" aria-describedby="age" />
        </div>
        <div className="mb-3">
          <label htmlFor="hiringDate" className="form-label">Hiring Date</label>
          <input type="text" name='hiringDate' defaultValue={employee?.hiringDate} onChange={handleChange} className="form-control" id="hiringDate" aria-describedby="hiringDate" />
        </div>
        <div className="mb-3">
          <label htmlFor="department" className="form-label">Department</label>
          <input type="text" name='department' defaultValue={employee?.department} onChange={handleChange} className="form-control" id="department" aria-describedby="department" />
        </div>
        <div className="mb-3">
          <label htmlFor="salary" className="form-label">Salary</label>
          <input type="text" name='salary' defaultValue={employee?.salary} onChange={handleChange} className="form-control" id="salary" aria-describedby="salary" />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" name='description' defaultValue={employee?.description} onChange={handleChange} className="form-control" id="description" aria-describedby="description" />
        </div>
        <div className="mb-3">
          <label htmlFor="imgURL" className="form-label">Image URL</label>
          <input type="text" name='imgURL' defaultValue={employee?.imgURL} onChange={handleChange} className="form-control" id="imgURL" aria-describedby="imgURL" />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default EmployeeEdit