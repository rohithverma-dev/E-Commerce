// import React from "react";
import "./sidebar.css";





import { BiSolidDashboard } from "react-icons/bi";
import { FaPlus, FaUsers } from "react-icons/fa";
import { LuArrowUpDown } from "react-icons/lu";
import { MdRateReview } from "react-icons/md";
import { RxBorderWidth } from "react-icons/rx";
import { TiThSmall } from "react-icons/ti";

import logo from "../../images/logo.png";
import TreeView from "../../CustomComponents/TreeView/TreeView.js"

import { Link } from "react-router-dom";



const Sidebar = () => {

  const slidermenus = [
    {
      label: "Dashboard",
      to: "/admin/dashboard",
      icon: <BiSolidDashboard />
    },
    {
      label: "Products",
      icon: <LuArrowUpDown />,
      children: [
        {
          label: "All",
          to: "/admin/products",
          icon: <TiThSmall />
        },
        {
          label: "Create",
          to: "/admin/product/new",
          icon: <FaPlus />
        },
      ],
    },
    {
      label: "Orders",
      to: "/admin/orders",
      icon: <RxBorderWidth />
    },
    {
      label: "Users",
      to: "/admin/users",
      icon: <FaUsers />
    },
    {
      label: "Reviews",
      to: "/admin/reviews",
      icon: <MdRateReview />
    },
  ];


  return (
    // <div className="sidebar">
    //   <Link to="/">
    //     <img src={logo} alt="Ecommerce" />
    //   </Link>
    //   <Link to="/admin/dashboard">
    //     <p>
    //       <DashboardIcon /> Dashboard
    //     </p>
    //   </Link>
    //   <Link>
    //     <TreeView
    //       defaultCollapseIcon={<ExpandMoreIcon />}
    //       defaultExpandIcon={<ImportExportIcon />}
    //     >
    //       <TreeItem nodeId="1" label="Products">
    //         <Link to="/admin/products">
    //           <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
    //         </Link>
    //         <Link to="/admin/product/new">
    //           <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
    //         </Link>
    //       </TreeItem>
    //     </TreeView>
    //   </Link>
    //   <Link to="/admin/orders">
    //     <p>
    //       <ListAltIcon />
    //       Orders
    //     </p>
    //   </Link>
    //   <Link to="/admin/users">
    //     <p>
    //       <PeopleIcon /> Users
    //     </p>
    //   </Link>
    //   <Link to="/admin/reviews">
    //     <p>
    //       <RateReviewIcon />
    //       Reviews
    //     </p>
    //   </Link>
    // </div>

    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Ecommerce" />
      </Link>
      <TreeView menus={slidermenus} />
    </div>



  );
};

export default Sidebar;
