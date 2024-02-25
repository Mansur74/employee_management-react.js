import React, { useEffect, useState } from 'react'
import { User } from '../../db';
import './ProfilePage.css'
import { FaFacebook, FaLinkedin, FaPinterest, FaTwitter } from 'react-icons/fa';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import CardSpinner from '../../components/Spinner/CardSpinner/CardSpinner';
import { getAccessToken, getMe, getRefreshToken } from '../../services/AuthorizationService';

type Props = {}

interface OuterContext {
  user: User | null,
  setUser: (user: User) => void
}

const ProfilePage = (props: Props) => {
  const { user, setUser }: OuterContext = useOutletContext();
  const navigate = useNavigate();

  const getUser = async () => {
    const user: User | null = JSON.parse(localStorage.getItem("user")!);
    setUser(user!);
    if (user)
    {
      try {
        const refreshToken: string = getRefreshToken()!;
        const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
        const result = await getMe(accessToken);
        setUser(result.data.data);
      } catch (error: any) {

      }
    }
    else
      navigate("/sign-in")

  }

  useEffect(() => {
    if (!getRefreshToken())
      navigate(`http://localhost:8080/api/authorization/sign-in`)
    else {
      getUser();
    }
  }, []);

  return (
    user ? 
    <div className='container'>
      <div className="card">
        <div className="card-body">
          <div className="dropdown float-end">
            <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="mdi mdi-dots-vertical"></i>
            </a>
            <div className="dropdown-menu dropdown-menu-end">

              <Link to={`/user/profile-edit`} className="dropdown-item">Edit</Link>

              <a href="#" className="dropdown-item">Delete</a>

            </div>
          </div>
          <div className="d-flex align-items-start">
            <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle avatar-lg img-thumbnail" alt="profile-image" />
            <div className="w-100 ms-3">
              <h4 className="my-0">{user?.firstName} {user?.lastName} {user?.roles?.find(role => role.name === "ADMIN") ? "(#Admin)": ""}</h4>
              <a href='/user/profile' className='text-decoration-none d-inline'><p className="text-muted d-inline">@{user?.userName}</p></a>
              <br/>
              <button type="button" className="mt-1 btn btn-primary btn-xs waves-effect mb-2 waves-light">Follow</button>
            </div>
          </div>

          <div className="mt-3">
            <h4 className="font-13 text-uppercase">About Me :</h4>
            <p className="text-muted font-13 mb-3">
              Hi I'm {user?.firstName} {user?.lastName}, has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.
            </p>
            <p className="text-muted mb-2 font-13"><strong>Full Name :</strong><span className="ms-2">{user?.firstName} {user?.lastName}</span></p>

            <p className="text-muted mb-2 font-13"><strong>Mobile :</strong><span className="ms-2">(123) 123 1234</span></p>

            <p className="text-muted mb-2 font-13"><strong>Email :</strong><span className="ms-2">{user?.email}</span></p>

            <p className="text-muted mb-1 font-13"><strong>Location :</strong><span className="ms-2">USA</span></p>
          </div>

          <ul className="social-list list-inline mt-3 mb-0">
            <li className="list-inline-item">
              <a href='#' className="social-list-item text-center border-primary text-primary"><FaFacebook/></a>
            </li>
            <li className="list-inline-item">
              <a href='#' className="social-list-item text-center border-primary text-primary"><FaLinkedin/></a>
            </li>
            <li className="list-inline-item">
              <a href='#' className="social-list-item text-center border-danger text-danger"><FaPinterest/></a>
            </li>
            <li className="list-inline-item">
              <a href='#' className="social-list-item text-center border-info text-info"><FaTwitter/></a>
            </li>
          </ul>
        </div>
      </div>
    </div>:
    <div style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    }}>
      <CardSpinner />
    </div>
  )
}

export default ProfilePage