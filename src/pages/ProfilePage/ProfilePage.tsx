import React, { useEffect, useState } from 'react'
import { User } from '../../db';
import './ProfilePage.css'
import { FaFacebook, FaLinkedin, FaPinterest, FaTwitter } from 'react-icons/fa';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import CardSpinner from '../../components/Spinner/CardSpinner/CardSpinner';
import { getAccessToken, getRefreshToken, logout } from '../../services/AuthorizationService';
import Footer from '../../components/Footer/Footer';
import { deleteMe, getMe } from '../../services/UserService';

interface OuterContext {
  setIsSignIn: (data: boolean) => void
}
type Props = {}


const ProfilePage = (props: Props) => {
  const { setIsSignIn }: OuterContext = useOutletContext();
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  const getUser = async () => {
    const user: User = (await getMe()).data.data;
    setUser(user!);
  }

  const deleteUser = async () => {
    await deleteMe();
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("refreshToken");
    setIsSignIn(false);
    navigate("/sign-in")
  }

  useEffect(() => {
    if (!getRefreshToken())
      navigate(`/sign-in`)
    else {
      getUser();
    }
  }, []);

  return (
    <>
      {
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

                    <button className="dropdown-item" onClick={deleteUser}>Delete</button>

                  </div>
                </div>
                <div className="d-flex align-items-start">
                  <div className='d-flex flex-column justify-content-end align-items-center'>
                    <img src={user?.userDetail?.imgURL ? user?.userDetail?.imgURL : "https://bootdey.com/img/Content/avatar/avatar1.png"} className="rounded-circle avatar-md img-thumbnail object-fit-cover" alt="profile-image" />

                    <ul className="social-list list-inline mt-3 mb-0 d-flex flex-column">
                      <li className="list-inline-item mb-1">
                        <a href='#' className="social-list-item text-center border-primary text-primary"><FaFacebook /></a>
                      </li>
                      <li className="list-inline-item mb-1">
                        <a href='#' className="social-list-item text-center border-primary text-primary"><FaLinkedin /></a>
                      </li>
                      <li className="list-inline-item mb-1">
                        <a href='#' className="social-list-item text-center border-danger text-danger"><FaPinterest /></a>
                      </li>
                      <li className="list-inline-item mb-1">
                        <a href='#' className="social-list-item text-center border-info text-info"><FaTwitter /></a>
                      </li>
                    </ul>
                  </div>

                  <div className="w-100 ms-3">
                    <h4 className="my-0">{user?.firstName} {user?.lastName} {user?.roles?.find(role => role.name === "ADMIN") ? "(#Admin)" : ""}</h4>
                    <a href='/user/profile' className='text-decoration-none d-inline'><p className="text-muted d-inline">@{user?.userName}</p></a>
                    <br />
                    <div className="mt-3">
                      <h4 className="font-13 text-uppercase">About Me :</h4>
                      <p className="text-muted font-13 mb-3">
                        Hello, I'm {user?.firstName} {user?.lastName} <br />
                        {user.userDetail?.description}
                      </p>
                      <p className="text-muted mb-2 font-13"><strong>Full Name :</strong><span className="ms-2">{user?.firstName} {user?.lastName}</span></p>

                      <p className="text-muted mb-2 font-13"><strong>Mobile :</strong><span className="ms-2">{user.userDetail?.phoneNumber}</span></p>

                      <p className="text-muted mb-2 font-13"><strong>Email :</strong><span className="ms-2">{user?.email}</span></p>

                      <p className="text-muted mb-1 font-13"><strong>Location :</strong><span className="ms-2">{user?.userDetail?.location}</span></p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div> :
       
          <CardSpinner />
         
      }
      <Footer />
    </>
  )
}

export default ProfilePage