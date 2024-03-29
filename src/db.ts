export interface Employee {
  id?: number,
  firstName?: string,
  lastName?: string,
  gender?: string,
  age?: number,
  hiringDate?: string,
  department?: string,
  salary?: number
  description?: string,
  imgURL?: string,
  passport?: Passport | null,

}

export interface Passport {
  id?: number,
  passportNumber?: number,
  validDate?: string,
  countries?: Country[]
}

export interface Country {
  id?: number,
  countryName?: string,
  capitalCity?: string,
  population?: number,
  imgURL?: string
}

export interface User {
  id?: number,
  firstName?: string,
  lastName?: string,
  userName?: string,
  email?: string,
  password?: string,
  roles?: Role[]
  userDetail?: UserDetail
}

export interface UserDetail {
  id?: number,
  gender?: string,
  birthdate?: string,
  location?: string,
  phoneNumber?: number,
  description?: string,
  imgURL?: string
}

export interface AuthRequest {
  email?: string,
  password?: string
}

export interface Role {
  id?: number,
  name?: string
}

export interface EmployeePage {
  pageNo: number,
  pageSize: number,
  totalPages: number,
  rows: Employee[]
}

export interface DataResult<T>{
  success: boolean,
  data: T,
  message: string,
}

export interface Result{
  success: boolean,
  message: string,
}

export interface AuthResponse {
  accessToken: string,
  refreshToken: string
}

export interface RefreshToken {
  refreshToken: string
}

export interface AccessToken {
  accessToken: string
}