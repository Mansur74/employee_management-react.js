import axios from "axios"
import { DataResult, Employee, EmployeePage, Result } from "../db"
import { getAccessToken } from "./AuthorizationService";

export const getAllEmployees = async (page: number, size: number, accessToken: string) => {
  const result = await axios.get<DataResult<EmployeePage>>(`http://localhost:8080/api/my/employees?page=${page}&&size=${size}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}

export const getMyEmployees = async (page: number, size: number, accessToken: string) => {
  const result = await axios.get<DataResult<EmployeePage>>(`http://localhost:8080/api/my/employees?page=${page}&&size=${size}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}

export const getMyEmployeeById = async (id: string, accessToken: string) => {
  const result = await axios.get<DataResult<Employee>>(`http://localhost:8080/api/my/employee/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;

}

export const createMyEmployee = async (employee: Employee, accessToken: string) => {
  const result = await axios.post<DataResult<Employee>>(`http://localhost:8080/api/my/employee`, employee, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}

export const updateMyEmployeeById = async (id: string, employee: Employee, accessToken: string) => {
  const result = await axios.put<DataResult<Employee>>(`http://localhost:8080/api/my/employee/${id}`, employee, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}

export const deleteMyEmployeeById = async (id: string, accessToken: string) => {
  const result = await axios.delete<Result>(`http://localhost:8080/api/my/employee/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}