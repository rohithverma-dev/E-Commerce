import React, { Fragment, useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import noteContext from "../../context/notes/noteContext.js"
import Loading from "../layout/Loader/Loader.js"

// const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
//     const context = useContext(noteContext);
//   const { loading, isAuthenticated, user } = context

//   return (
//     <Fragment>
//       {/* {loading === false && ( */}
//       <Routes>
//         <Route
//           {...rest}
//           render={(props) => {
//             if (isAuthenticated === false) {
//               return <Navigate to="/login" />;
//             }

//             if (isAdmin === true && user.role !== "admin") {
//               return <Navigate to="/login" />;
//             }

//             return <Component {...props} />;
//           }}
//         />
//       {/* )} */}
//       </Routes>
//     </Fragment>
//   );
// };

// export default ProtectedRoute;


const Protected = ({ isAdmin, children }) => {
  const context = useContext(noteContext);
  const { loading, isAuthenticated, user } = context

  useEffect(() => {
  
  
  }, [])
  
  //   if (!isLoggedIn) {
  //      return <Navigate to="/" replace />;
  //   }
   if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  if (isAdmin === true && user.role !== "admin") {
    return <Navigate to="/login" />;
  }
  return children;
};
export default Protected;