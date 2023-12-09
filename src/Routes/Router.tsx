import {createBrowserRouter} from 'react-router-dom'
import EmployeesPage from '../pages/EmployeesPage/EmployeesPage';
import Layout from '../components/Layout/Layout';
import EmployeePage from '../pages/EmployeePage/EmployeePage';
import EmployeeProfile from '../components/EmployeeProfie/EmployeeProfile';
import PassportProfile from '../components/PassportProfile/PassportProfile';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      { 
        path: "employee", 
        element: <EmployeesPage/>
      },
      { 
        path: "/employee/:employeeId", 
        element: <EmployeePage/>,
        children: [
          {
            path: "",
            element: <EmployeeProfile/>
          },
          {
            path: "passport/:passportId",
            element: <PassportProfile/>
          }
        ]
      },

      
    ]
  },

  
]);