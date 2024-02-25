import {createBrowserRouter} from 'react-router-dom'
import EmployeesPage from '../pages/EmployeesPage/EmployeesPage';
import Layout from '../components/Layout/Layout';
import EmployeeProfile from '../pages/EmployeeProfie/EmployeeProfile';
import PassportProfile from '../pages/PassportProfile/PassportProfile';
import EmployeeEdit from '../pages/EmployeeEdit/EmployeeEdit';
import EmployeeCreate from '../pages/EmployeeCreate/EmployeeCreate';
import PassportCreate from '../pages/PassportCreate/PassportCreate';
import PassportEdit from '../pages/PassportEdit/PassportEdit';
import DashBoard from '../components/DashBoard/DashBoard';
import CountriesPage from '../pages/CountriesPage/CountriesPage';
import SignInPage from '../pages/SignInPage/SignInPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import ProfileEdit from '../pages/ProfileEdit/ProfileEdit';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "*",
        element: <ErrorPage/>
      },
      { 
        path: "", 
        element: <EmployeesPage/>
      },
      { 
        path: "/user/profile", 
        element: <ProfilePage/>
      },
      { 
        path: "/user/profile-edit", 
        element: <ProfileEdit/>
      },
      { 
        path: "employee", 
        element: <EmployeesPage/>
      },
      { 
        path: "employee/:employeeId", 
        element: <DashBoard/>,
        children: [
          {
            path: "",
            element: <EmployeeProfile/>
          },
          {
            path: "passport",
            element: <PassportProfile/>
          },
          {
            path: "passport-create",
            element: <PassportCreate/>
          },
          {
            path: "employee-edit",
            element: <EmployeeEdit/>
          },
          {
            path: "passport-edit",
            element: <PassportEdit/>
          }
        ]
      },
      { 
        path: "employee/create", 
        element: <EmployeeCreate/>
      },
      { 
        path: "countries", 
        element: <CountriesPage/>
      },
      { 
        path: "sign-in", 
        element: <SignInPage/>
      },
      { 
        path: "sign-up", 
        element: <SignUpPage/>
      },
      
    ]
  },

  
]);