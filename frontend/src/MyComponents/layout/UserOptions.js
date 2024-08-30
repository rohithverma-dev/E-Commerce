import React, { Fragment, useContext, useState } from "react";


import { IoReorderFourOutline } from "react-icons/io5";
import { FaCartArrowDown } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { HiOutlineLogout } from "react-icons/hi";
import { BiSolidDashboard } from "react-icons/bi";


import { useNavigate } from "react-router-dom";
import noteContext from "../../context/notes/noteContext.js";
import Loading from "../layout/Loader/Loader.js"
import BackDrop from "../../CustomComponents/BackDrop/BackDrop.js";


const UserOptions = ({ user }) => {
  const context = useContext(noteContext);

  let { LogOut, cartItems, loading } = context;

  const AvatarUrl = user.avatar.url ? user.avatar.url : "/Profile.png"

  const options = [
    { icon: <CgProfile />, name: "Profile", func: account },
    { icon: <IoReorderFourOutline />, name: "Orders", func: orders },
    { icon: (<FaCartArrowDown style={{ color: cartItems.length > 0 ? "tomato" : "unset" }} />), name: `Cart(${cartItems.length})`, func: cart },
    { icon: <HiOutlineLogout />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({ icon: < BiSolidDashboard />, name: "Dashboard", func: dashboard, });
  }

  let history = useNavigate()


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
      {loading ? (<Loading />) : (
        <>
          <BackDrop AvatarUrl={AvatarUrl} options={options} />
        </>
      )}
    </Fragment>


  );
};

export default UserOptions;
