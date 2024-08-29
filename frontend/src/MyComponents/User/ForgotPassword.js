import React, {Fragment ,  useState, useEffect,useContext } from "react";
import "./ForgotPassword.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import Loading from "../layout/Loader/Loader.js"
import noteContext from "../../context/notes/noteContext.js";
import MetaData from "../layout/MetaData";

const ForgotPassword = () => {
    const context = useContext(noteContext);
    const { UserForgotPassword  , loading } = context
  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("email", email);
    UserForgotPassword(myForm);
  }

  useEffect(() => {
    
  }, [ ])

  return (
       <Fragment>
       {loading?(<Loading/>):( <>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form  className="forgotPasswordForm"  onSubmit={forgotPasswordSubmit}  >
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input  type="email"  placeholder="Email"  required  name="email"  value={email}  onChange={(e) => setEmail(e.target.value)} />
                </div>
                <input  type="submit"  value="Send"  className="forgotPasswordBtn" />
              </form>
            </div>
          </div>
        </>)}
        </Fragment>
       
  );
};

export default ForgotPassword;
