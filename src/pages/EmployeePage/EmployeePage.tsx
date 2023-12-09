import React, { useEffect, useState } from 'react'
import './EmployeePage.css'
import { FaFacebook} from 'react-icons/fa';
import { FaTwitter} from 'react-icons/fa';
import { FaPinterest} from 'react-icons/fa';
import { FaLinkedin} from 'react-icons/fa';
import DashBoard from '../../components/DashBoard/DashBoard';
import { Employee } from '../../db';
import { getEmployeeById } from '../../services/EmployeeService';

type Props = {}

const EmployeePage = (props: Props) => {

  return (
    <DashBoard/>
  )
}

export default EmployeePage