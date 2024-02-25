import React, { useEffect, useState } from 'react'
import { User } from '../../db';
import { useNavigate } from 'react-router';
import { getAccessToken, getMe, getRefreshToken } from '../../services/AuthorizationService';

type Props = {}

const ProfileEdit = (props: Props) => {

	const [user, setUser] = useState<User>();
	const navigate = useNavigate();

	const getUser = async() => {
		const refreshToken: string = getRefreshToken()!;
    const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
		const result = await getMe(accessToken);
		setUser(result.data.data);
	}

	useEffect(() => {
		if (!getRefreshToken())
			navigate(`http://localhost:8080/api/authorization/sign-in`)
		else {
			getUser();
		}
	}, []);


	return (
		<div className="container-xl px-4 mt-4">
			<div className="row">
				<div className="col-xl-4">

					<div className="card mb-4 mb-xl-0">
						<div className="card-header">Profile Picture</div>
						<div className="card-body text-center">

							<img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />

							<div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>

							<button className="btn btn-primary" type="button">Upload new image</button>
						</div>
					</div>
				</div>
				<div className="col-xl-8">

					<div className="card mb-4">
						<div className="card-header">Account Details</div>
						<div className="card-body">
							<form>

								<div className="mb-3">
									<label className="small mb-1" htmlFor="inputUsername">Username (how your name will appear to other users on the site)</label>
									<input className="form-control" id="inputUsername" type="text" placeholder="Enter your username" defaultValue={user?.userName} />
								</div>

								<div className="row gx-3 mb-3">

									<div className="col-md-6">
										<label className="small mb-1" htmlFor="inputFirstName">First name</label>
										<input className="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" defaultValue={user?.firstName} />
									</div>

									<div className="col-md-6">
										<label className="small mb-1" htmlFor="inputLastName">Last name</label>
										<input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" defaultValue={user?.lastName} />
									</div>
								</div>

								<div className="row gx-3 mb-3">

									<div className="col-md-6">
										<label className="small mb-1" htmlFor="inputOrgName">Organization name</label>
										<input className="form-control" id="inputOrgName" type="text" placeholder="Enter your organization name" />
									</div>

									<div className="col-md-6">
										<label className="small mb-1" htmlFor="inputLocation">Location</label>
										<input className="form-control" id="inputLocation" type="text" placeholder="Enter your location" />
									</div>
								</div>

								<div className="mb-3">
									<label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
									<input className="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" defaultValue={user?.email} />
								</div>

								<div className="row gx-3 mb-3">

									<div className="col-md-6">
										<label className="small mb-1" htmlFor="inputPhone">Phone number</label>
										<input className="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" />
									</div>

									<div className="col-md-6">
										<label className="small mb-1" htmlFor="inputBirthday">Birthday</label>
										<input className="form-control" id="inputBirthday" type="text" name="birthday" placeholder="Enter your birthday" />
									</div>
								</div>
								<button className="btn btn-primary" type="button">Save changes</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProfileEdit