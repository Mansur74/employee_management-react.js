import React, { useEffect, useState } from 'react'
import { User, UserDetail } from '../../db';
import { useNavigate } from 'react-router';
import { getAccessToken, getRefreshToken } from '../../services/AuthorizationService';
import { updateMyUserDetail } from '../../services/UserDetailService';
import Footer from '../../components/Footer/Footer';
import { getMe, updateMe } from '../../services/UserService';
import CardSpinner from '../../components/Spinner/CardSpinner/CardSpinner';

type Props = {}

const ProfileEdit = (props: Props) => {

	const [user, setUser] = useState<User>();
	const navigate = useNavigate();

	const getUser = async () => {
		const refreshToken: string = getRefreshToken()!;
		const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
		const result = await getMe(accessToken);
		setUser(result.data.data);
	}

	const handleEditProfile = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData(e.target as HTMLFormElement);
		const userForm: User = {
			firstName: data.get("firstName") as string,
			lastName: data.get("lastName") as string,
		}

		const userDetailForm: UserDetail = {
			gender: data.get("gender") as string,
			birthdate: data.get("birthDate") as string,
			location: data.get("location") as string,
			phoneNumber: parseInt(data.get("phoneNumber") as string) as number,
			description: data.get("description") as string,
			imgURL: data.get("imgURL") as string
		}
		const refreshToken: string = getRefreshToken()!;
		let accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
		let result = await updateMe(userForm, accessToken);

		accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
		result = await updateMyUserDetail(user?.userDetail?.id!, userDetailForm, accessToken);

		navigate("/user/profile");

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
			<div className="container-xl px-4 mt-4">
				<div className="row">
					<div className="col-xl-4">
						<div className="card mb-4 mb-xl-0">
							<div className="card-header">Profile Picture</div>
							<div className="card-body text-center mx-auto" style={{ width: "300px", height: "300px" }}>

								{
									user?.userDetail?.imgURL
										?

										<img src={user?.userDetail?.imgURL ? user?.userDetail?.imgURL : "https://bootdey.com/img/Content/avatar/avatar1.png"} className="w-100 h-100 rounded-circle object-fit-cover mx-auto" alt="" />

										: <CardSpinner />
								}

							</div>
						</div>
					</div>
					<div className="col-xl-8">

						<div className="card mb-4">
							<div className="card-header">Account Details</div>
							<div className="card-body">
								<form onSubmit={handleEditProfile}>

									<div className="mb-3">
										<label className="small mb-1" htmlFor="inputUsername">Username (how your name will appear to other users on the site)</label>
										<input className="form-control" disabled id="inputUsername" type="text" placeholder="Enter your username" defaultValue={user?.userName} />
									</div>

									<div className="row gx-3 mb-3">

										<div className="col-md-6">
											<label className="small mb-1" htmlFor="inputFirstName">First name</label>
											<input className="form-control" name='firstName' id="inputFirstName" type="text" placeholder="Enter your first name" defaultValue={user?.firstName} />
										</div>

										<div className="col-md-6">
											<label className="small mb-1" htmlFor="inputLastName">Last name</label>
											<input className="form-control" name='lastName' id="inputLastName" type="text" placeholder="Enter your last name" defaultValue={user?.lastName} />
										</div>
									</div>

									<div className="row gx-3 mb-3">

										<div className="col-md-6">
											<label className="small mb-1" htmlFor="gender">Gender</label>
											<select className="form-select" name='gender' aria-label="Default select example" defaultValue={user?.userDetail?.gender}>
												<option value="male">Male</option>
												<option value="female">Female</option>
											</select>
										</div>

										<div className="col-md-6">
											<label className="small mb-1" htmlFor="location">Location</label>
											<select className="form-select" name='location' aria-label="Default select example" defaultValue={user?.userDetail?.location}>
												<option value="TR">TR</option>
												<option value="USA">USA</option>
											</select>
										</div>
									</div>

									<div className="mb-3">
										<label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
										<input className="form-control" disabled id="inputEmailAddress" type="email" placeholder="Enter your email address" defaultValue={user?.email} />
									</div>

									<div className="row gx-3 mb-3">

										<div className="col-md-6">
											<label className="small mb-1" htmlFor="phoneNumber">Phone number</label>
											<input className="form-control" name='phoneNumber' id="phoneNumber" type="tel" placeholder="Enter your phone number" defaultValue={user?.userDetail?.phoneNumber} />
										</div>

										<div className="col-md-6">
											<label htmlFor="birthDate" className="form-label">Birth Date</label>
											<input type="datetime-local" name='birthDate' className="form-control" id="birthDate" aria-describedby="birthDate" defaultValue={user?.userDetail?.birthdate} />
										</div>
									</div>

									<div className="mb-3">
										<label className="small mb-1" htmlFor="description">Description</label>
										<textarea className="form-control" style={{ resize: "none" }} name='description' id="description" placeholder="Enter your description" defaultValue={user?.userDetail?.description} ></textarea>
									</div>

									<div className="mb-3">
										<label className="small mb-1" htmlFor="imgURL">Image Url</label>
										<input className="form-control" name='imgURL' id="imgURL" type="text" placeholder="Enter your image URL" defaultValue={user?.userDetail?.imgURL} />
									</div>

									<button className="btn btn-primary" type="submit">Save changes</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default ProfileEdit