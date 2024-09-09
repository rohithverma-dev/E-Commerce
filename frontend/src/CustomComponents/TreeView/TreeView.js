import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./mytreeview.css";


const TreeView = ({ menus, level = 0 }) => {
  const [abs_index, setAbs_index] = useState(null);
  return (
    <div className="treeview_container_outer"  style={{ marginLeft: `${level * 20}px` }} >
      {menus?.map((menu, index) => {
        return <div className="treeview_container" >
          <Link style={{color: (abs_index===index) ? 'tomato' : 'black'  }} to={menu?.to ? menu?.to :"#"} onClick={() => setAbs_index(prev => prev == index ? null : index)} > { menu?.icon ? menu?.icon : '' } {menu.label}</Link>

          {/* {menu?.children &&
            // <span> {(abs_index === index) ? '-' : '+'} </span>
            <span> {(abs_index === index) ? <FaMinus/> : <FaPlus/> } </span>
          } */}  

          {(abs_index === index) &&
            (<TreeView menus={menu?.children} level={level + 1} />)
          }
        </div>
      })}
    </div>
  );
};

export default TreeView;

