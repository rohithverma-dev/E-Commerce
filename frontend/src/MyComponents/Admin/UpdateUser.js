import React, { Fragment, useEffect, useState, useContext } from "react";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SideBar from "./Sidebar";
import {  useParams} from "react-router-dom";
import { Link , useNavigate } from "react-router-dom";
import noteContext from "../../context/notes/noteContext.js"
import Loading from "../layout/Loader/Loader.js"


const UpdateUser = () => {
    const { id } = useParams();
    let history = useNavigate();
  
    const context = useContext(noteContext);
    const { Admin_updateUser , Admin_get_Par_User , admin_Par_User , isUpdated , setIsUpdated , loading } = context;
  

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = id;

  useEffect(() => {
   
    if ((admin_Par_User && admin_Par_User._id) !== userId) {
        console.log("Admin_get_Par_User Function");
      Admin_get_Par_User(userId);
    } else {
      setName(admin_Par_User.name);
      setEmail(admin_Par_User.email);  
      setRole(admin_Par_User.role);
    }

    if (isUpdated) {
      Admin_get_Par_User(userId);
     console.log(` alert.success("User Updated Successfully");`);
     setIsUpdated(false)
      history("/admin/users");
    }
  }, [ isUpdated , admin_Par_User]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    Admin_updateUser(userId, myForm);
  };

  return (
    // <Fragment>
    //   {loading? (<Loading/>): ( 
      <Fragment>
      <MetaData title="Update User" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
       {loading? (<Loading/>):(   
             <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  loading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
            )}
    
        </div>
      </div>
    {/* </Fragment>) } */}
    </Fragment>

   
  );
};

export default UpdateUser;
