import {createBrowserRouter} from 'react-router-dom'
import App from '../App';
import Employees from '../pages/Employees/Employees';
import Footer from '../components/Footer/Footer';
import DashBoard from '../components/DashBoard/DashBoard';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      { 
        path: "/employee", 
        element: <Employees/>
        
      },
      { 
        path: "/employee/1", 
        element: <DashBoard/>
        
      },
    ]
  },
  
]);