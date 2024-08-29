import React, { Fragment ,  useContext, useState } from "react";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./UserOptions.css"
import { useNavigate } from "react-router-dom";
import noteContext from "../../context/notes/noteContext.js";
import Loading from "../layout/Loader/Loader.js"


const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const context = useContext(noteContext);
  let { LogOut , cartItems , loading } = context;
  let history = useNavigate() 

  const options = [
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: (<ShoppingCartIcon style={{ color: cartItems.length == 0 ? "tomato" : "unset" }}  />  ),  name: `Cart(${cartItems.length})`,  func: cart},
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  

  if (user.role === "admin") {
    options.unshift({ icon: <DashboardIcon />, name: "Dashboard", func: dashboard, });
  }

  function dashboard() {
    history("/admin/dashboard");
  }

  function orders() {
    history("/orders");
  }
  function account() {
    history("/account");
  }
  function cart() {
    history("/cart");
  }
  function logoutUser() {
    LogOut()
    console.log("LogOut Successfully");
  }

  return (
 
    <Fragment>
    {loading?(<Loading/>):(  
        <>
      <Backdrop open={open} style={{ zIndex: "1" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        className="speedDial"
        direction="down"
        icon={<img className="speedDialIcon" src={user.avatar.url ? user.avatar.url : "/Profile.png"} alt="Profile" />}
      >
        {options.map((item) => (
          <SpeedDialAction  key={item.name}  icon={item.icon}  tooltipTitle={item.name}  onClick={item.func} 
          tooltipOpen={window.innerWidth <= 600 ? true : false} />
        ))}
      </SpeedDial>
    </>
    )}
   </Fragment>
   

  );
};

export default UserOptions;
