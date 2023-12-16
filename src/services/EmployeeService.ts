import axios from "axios"
import { Employee } from "../db"

export const getAllEmployees = async () => {
  try {
    const data = await axios.get<Employee[]>("http://localhost:8080/api/employee");
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