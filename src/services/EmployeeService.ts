import axios from "axios"
import { Employee } from "../db"

export const getAllEmployees = async () => {
 try {
   const data = await axios.get<Employee[]>("http://localhost:3005/api/employee");
   return data;
 } 
 catch (error) {
  if(axios.isAxiosError(error))
    return error.message;
  
  else
    return "Anexpected Error!";

 }

}

export const getEmployeeById = async (id: string) => {
  try {
    const data = await axios.get<Employee>(`http://localhost:3005/api/employee/${id}`);
    console.log(data);  
    return data;
  } 
  catch (error: any) {
    console.log(error)
  }
 
 }