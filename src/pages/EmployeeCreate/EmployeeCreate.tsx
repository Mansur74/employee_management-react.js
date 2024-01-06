import React from 'react'
import { Employee } from '../../db';
import { createEmployee } from '../../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';

type Props = {}

const CreateEmployeePage = (props: Props) => {
  const navigate = useNavigate();
  const handleCreateEmployee = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const body : Employee = {
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

    await createEmployee(body);
    navigate(`/employee?page=${0}`);
  }

  return (
    <div className='container ps-5 pe-5'>
      <form onSubmit={handleCreateEmployee}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">Firstname</label>
          <input type="text" name='firstName' className="form-control" id="firstName" aria-describedby="firstName" />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Lastname</label>
          <input type="text" name='lastName' className="form-control" id="lastName" aria-describedby="lastName" />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender</label>
          <input type="text" name='gender' className="form-control" id="gender" aria-describedby="gender" />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input type="text" name='age' className="form-control" id="age" aria-describedby="age" />
        </div>
        <div className="mb-3">
          <label htmlFor="hiringDate" className="form-label">Hiring Date</label>
          <input type="datetime-local" name='hiringDate' className="form-control" id="hiringDate" aria-describedby="hiringDate" />
        </div>
        <div className="mb-3">
          <label htmlFor="department" className="form-label">Department</label>
          <input type="text" name='department' className="form-control" id="department" aria-describedby="department" />
        </div>
        <div className="mb-3">
          <label htmlFor="salary" className="form-label">Salary</label>
          <input type="text" name='salary' className="form-control" id="salary" aria-describedby="salary" />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" name='description' className="form-control" id="description" aria-describedby="description" />
        </div>
        <div className="mb-3">
          <label htmlFor="imgURL" className="form-label">Image URL</label>
          <input type="text" name='imgURL' className="form-control" id="imgURL" aria-describedby="imgURL" />
        </div>

        <button type="submit" className="btn btn-secondary">Submit</button>
      </form>
      <Footer/>
    </div>
  )
}

export default CreateEmployeePage