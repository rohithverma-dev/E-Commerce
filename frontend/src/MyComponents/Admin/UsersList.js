import React, { Fragment, useContext , useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { Link , useNavigate} from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import Loading from "../layout/Loader/Loader.js"
import noteContext from "../../context/notes/noteContext.js"


const UsersList = () => {
    let history = useNavigate();
    const context = useContext(noteContext);
    const {   admin_allusers  , Admin_getAllUsers , Admin_deleteUser ,isDeleted , setIsDeleted  , loading   } = context;
  
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
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
  
<Fragment>
{loading?(<Loading/>):(  <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>)}
</Fragment>

        
        );
      },
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

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
