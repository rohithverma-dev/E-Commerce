import React, {  Fragment ,  useState, useEffect , useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate  } from "react-router-dom";
import "./ResetPassword.css";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import Loading from "../layout/Loader/Loader.js"
import noteContext from "../../context/notes/noteContext.js";

const ResetPassword = () => {

    const context = useContext(noteContext);
	const {setIsUpdated, UserResetPassword , isUpdated , loading } = context
	let history = useNavigate()
    const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    UserResetPassword(token, myForm);
    setIsUpdated(false)
  }

  useEffect(() => {
    if (isUpdated) {
      console.log("Password Updated Successfully");
      history("/login");
    }
  }, [ history ,  isUpdated]);

  return (
 
     <Fragment>
     {loading?(<Loading/>):(    <>
          <MetaData title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>
              <form className="resetPasswordForm" onSubmit={resetPasswordSubmit}  >
                <div>
                  <LockOpenIcon />
                  <input  type="password"  placeholder="New Password"  required  value={password}  onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input  type="password"  placeholder="Confirm Password"  required  value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value)}  />
                </div>
                <input type="submit"  value="Update"  className="resetPasswordBtn" />
              </form>
            </div>
          </div>
        </>
)}
    </Fragment>
    
  );
};

export default ResetPassword;
