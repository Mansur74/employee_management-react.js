import axios from "axios"
import { Employee, EmployeePage } from "../db"

export const getAllEmployees = async (page: number, size: number) => {
  try {
    const data = await axios.get<EmployeePage>(`http://localhost:8080/api/employee?page=${page}&&size=${size}`);
    return data;
  }
  catch (error) {
    if (axios.isAxiosError(error))
      return error.message;

    else
      return "Anexpected Error!";

  }

}

export const getEmployeeById = async (id: string) => {
  try {
    const data = await axios.get<Employee>(`http://localhost:8080/api/employee/${id}`);
    return data;
  }
  catch (error: any) {
    console.log(error)
  }

}

export const createEmployee = async (employee: Employee) => {
  try {
    const data = await axios.post<Employee>(`http://localhost:8080/api/employee`, employee);
    return data;
  }
  catch (error: any) {
    console.log(error)
  }

}

export const updateEmployeeById = async (id: string, employee: Employee) => {
  try {
    const data = await axios.patch<Employee>(`http://localhost:8080/api/employee/${id}`, employee);
    return data;
  }
  catch (error: any) {
    console.log(error)
  }

}

export const deleteEmployeeById = async (id: string) => {
  try {
    const data = await axios.delete<Employee>(`http://localhost:8080/api/employee/${id}`);
    return data;
  }
  catch (error: any) {
    console.log(error)
  }

}