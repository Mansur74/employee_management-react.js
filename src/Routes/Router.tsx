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
        element: <DashBoard/>,
        children: [
          {
            path: "",
            element: <EmployeeProfile/>
          },
          {
            path: "passport/:passportId",
            element: <PassportProfile/>
          },
          {
            path: "employee-edit",
            element: <EmployeeEdit/>
          },

          {
            path: "passport",
            element: <PassportCreate/>
          },
          {
            path: "passport/:passportId/passport-edit",
            element: <PassportEdit/>
          }
        ]
      },
      { 
        path: "employee/create", 
        element: <EmployeeCreate/>
      },

      
    ]
  },

  
]);