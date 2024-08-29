import React, { Fragment , useEffect } from "react";
import Loading from "../layout/Loader/Loader.js"
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import noteContext from "../../context/notes/noteContext.js";
import "./Profile.css";
import { useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
	const context = useContext(noteContext);
	const { user, isAuthenticated ,
	        Error_message , setError_message , message , setMessage , loading } = context
	let history = useNavigate()

	useEffect(() => {
		if (isAuthenticated === false) {
			history("/login");
		}

	}, [history, isAuthenticated  ]);
	return (
	
				    <Fragment>
		  {loading?(<Loading/>):(	<>
			<MetaData title={`${user.name}'s Profile`} />
			<div className="profileContainer">
				<div>
					<h1>My Profile</h1>
					<img src={user.avatar.url} alt={user.name} />
					<Link to="/me/update">Edit Profile</Link>
				</div>
				<div>
					<div>
						<h4>Full Name</h4>
						<p>{user.name}</p>
					</div>
					<div>
						<h4>Email</h4>
						<p>{user.email}</p>
					</div>
					<div>
						<h4>Joined On</h4>
						<p>{String(user.createdAt).substr(0, 10)}</p>
					</div>

					<div>
						<Link to="/orders">My Orders</Link>
						<Link to="/password/update">Change Password</Link>
					</div>
				</div>
			</div>

		</>)}
	

		</Fragment>
	
	
	)
}

export default Profile;
