import React, {  useState, useEffect , useContext, Fragment } from "react";
import "./UpdateProfile.css";
import { IoMdMail } from "react-icons/io";

import { MdOutlineFace } from "react-icons/md";

import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { useNavigate  } from "react-router-dom";
import noteContext from "../../context/notes/noteContext.js";
import Loading from "../layout/Loader/Loader.js"

const UpdateProfile = () => {
  const context = useContext(noteContext);
	const { user, isUpdated , setIsUpdated , updateUserProfile  , loading } = context;

	let history = useNavigate()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
  };


  
  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    updateUserProfile(myForm);
  };
  
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
      // {user.avatar.url ? user.avatar.url : "/Profile.png"}
    }

    if (isUpdated) {
      history("/account");
      console.log("rooooo");
      setIsUpdated(false)
    }
  }, [ history, user, isUpdated]);
  
  return (
    <Fragment>
      {loading?(<Loading/>):( <>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form className="updateProfileForm" encType="multipart/form-data" onSubmit={updateProfileSubmit} >
                <div className="updateProfileName">
                  <MdOutlineFace />
                  <input type="text"  placeholder="Name"  required  name="name"  value={name}  onChange={(e) => setName(e.target.value)}  />
                </div>
                <div className="updateProfileEmail">
                  <IoMdMail />
                  <input  type="email"  placeholder="Email"  required  name="email"  value={email}  onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input  type="file"  name="avatar"  accept="image/*"  onChange={updateProfileDataChange}  />
                </div>
                <input type="submit" value="Update" className="updateProfileBtn" />
              </form>
            </div>
          </div>
        </>)}
    </Fragment>
       
  );
};

export default UpdateProfile;
