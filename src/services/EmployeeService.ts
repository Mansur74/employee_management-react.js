import axios from "axios"
import { DataResult, Employee, EmployeePage, Result } from "../db"
import { getAccessToken } from "./AuthorizationService";

export const getAllEmployees = async (page: number, size: number, accessToken: string) => {
  const result = await axios.get<DataResult<EmployeePage>>(`http://localhost:8080/api/employees?page=${page}&&size=${size}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}

export const getEmployeeById = async (id: string, accessToken: string) => {
  const result = await axios.get<DataResult<Employee>>(`http://localhost:8080/api/employee/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;

}

export const createEmployee = async (employee: Employee, accessToken: string) => {
  const result = await axios.post<DataResult<Employee>>(`http://localhost:8080/api/employee`, employee, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}

export const updateEmployeeById = async (id: string, employee: Employee, accessToken: string) => {
  const result = await axios.patch<DataResult<Employee>>(`http://localhost:8080/api/employee/${id}`, employee, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}

export const deleteEmployeeById = async (id: string, accessToken: string) => {
  const result = await axios.delete<Result>(`http://localhost:8080/api/employee/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}