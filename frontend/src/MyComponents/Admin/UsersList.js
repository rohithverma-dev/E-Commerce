import React, { Fragment, useContext, useEffect } from "react";
import "./productList.css";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import Loading from "../layout/Loader/Loader.js"
import noteContext from "../../context/notes/noteContext.js"
import ColumnRow from "../../CustomComponents/ColumnRowTable/ColumnRow.js";


const UsersList = () => {
  let history = useNavigate();
  const context = useContext(noteContext);
  const { admin_allusers, Admin_getAllUsers, Admin_deleteUser, isDeleted, setIsDeleted, loading } = context;

  const deleteUserHandler = (id) => {
    console.log("react+h delete admin user ");
    Admin_deleteUser(id);
  };

  useEffect(() => {
    Admin_getAllUsers()
    if (isDeleted) {
      console.log(`alert.success(message);`);
      setIsDeleted(false)
      history("/admin/dashboard");
    }

  }, [isDeleted]);



  const columns = [
    { field: "id", headerName: "User ID", flex: 2 },
    { field: "email", headerName: "Email", flex: 1.5, },
    { field: "name", headerName: "Name", flex: 1, },
    { field: "role", headerName: "Role", flex: 1, },
    {
      field: "actions",
      flex: 1.2,
      headerName: "Actions",
      actions: [{ type: 'edit', link: '/admin/user' }, { type: 'delete' }]
    },
  ];



  const rows = [];

  admin_allusers &&
    admin_allusers.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });



  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <div style={{ width: '1600px' }}  >
            <ColumnRow handleAction={deleteUserHandler} columns={columns} rows={rows} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
