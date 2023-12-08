import {createBrowserRouter} from 'react-router-dom'
import App from '../App';
import DashBoard from '../components/DashBoard/DashBoard';
import Employees from '../pages/EmployeesPage/EmployeesPage';
import Layout from '../components/Layout/Layout';
import EmployeePage from '../pages/EmployeePage/EmployeePage';
import PassportPage from '../pages/PassportPage/PassportPage';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      { 
        path: "employee", 
        element: <Employees/>
        
      },
      { 
        path: "/employee/:id", 
        element: <DashBoard/>,
        children: [
          {
            path: "employee-detail",
            element: <EmployeePage/>
          },
          {
            path: "passport/:id/passport-detail",
            element: <PassportPage/>
          }
        ]
      },

      
    ]
  },

  
]);