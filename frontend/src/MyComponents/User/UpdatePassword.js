import Loading from "../layout/Loader/Loader.js"
import React, { Fragment ,  useState, useEffect } from "react";
import "./UpdatePassword.css";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useContext } from "react";
import noteContext from "../../context/notes/noteContext.js";
import { useNavigate  } from "react-router-dom";

const UpdatePassword = () => {
  let history = useNavigate()
//   const dispatch = useDispatch();
//   const alert = useAlert();
//   const { error, isUpdated, loading } = useSelector((state) => state.profile);

const context = useContext(noteContext);
const { user, isUpdated , setIsUpdated , updateUserPassword , loading } = context
 

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    updateUserPassword(myForm);
  };

  useEffect(() => {
    // console.log(isUpdated);
    if (isUpdated) {
    //   alert.success("Profile Updated Successfully");

      history("/account");
      setIsUpdated(false)

    }
  }, [ isUpdated]);

  return (
  
       <Fragment>
       {loading?(<Loading/>):(     <>
          <MetaData title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Password</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </>)}
      </Fragment>
   
   
  );
};

export default UpdatePassword;
