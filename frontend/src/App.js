import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Link
} from "react-router-dom";
import './App.css';
import { Fragment, useContext, useEffect, useState } from 'react';
import Home from "./MyComponents/Home/Home.js"

import Navbar from "./MyComponents/Navbar/Navbar.js"

import ProductDetails from "./MyComponents/Product/ProductDetails.js"
import Products from "./MyComponents/Product/Products.js"
import Search from './MyComponents/Product/Search';
import LoginSignUp from './MyComponents/User/LoginSignUp';
// import NoteState from './context/notes/NoteState';
import noteContext from "./context/notes/noteContext.js";
import UserOptions from "./MyComponents/layout/UserOptions.js";
import Profile from "./MyComponents/User/Profile.js";
import UpdateProfile from "./MyComponents/User/UpdateProfile.js";
import UpdatePassword from "./MyComponents/User/UpdatePassword.js";
import ForgotPassword from "./MyComponents/User/ForgotPassword.js";
import ResetPassword from "./MyComponents/User/ResetPassword.js";
import Cart from "./MyComponents/Cart/Cart.js";
import Shipping from "./MyComponents/Cart/Shipping.js";
import ConfirmOrder from "./MyComponents/Cart/ConfirmOrder.js";
import Payment from "./MyComponents/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./MyComponents/Cart/OrderSuccess.js";
import MyOrders from "./MyComponents/Order/MyOrders.js";
import OrderDetails from "./MyComponents/Order/OrderDetails.js";
import Dashboard from "./MyComponents/Admin/Dashboard.js";
import ProductList from "./MyComponents/Admin/ProductList.js";
import NewProduct from "./MyComponents/Admin/NewProduct.js";
import UpdateProduct from "./MyComponents/Admin/UpdateProduct.js";
import OrderList from "./MyComponents/Admin/OrderList.js";
import ProcessOrder from "./MyComponents/Admin/ProcessOrder.js";
import UsersList from "./MyComponents/Admin/UsersList.js";
import UpdateUser from "./MyComponents/Admin/UpdateUser.js";
import ProductReviews from "./MyComponents/Admin/ProductReviews.js";

import ProtectedRoute from "./MyComponents/Route/ProtectedRoute.js";
import Loading from "./MyComponents/layout/Loader/Loader"
import NotFound from "./MyComponents/layout/Not Found/NotFound.js";

import Contact from "./MyComponents/layout/Contact/Contact.js";
import About from "./MyComponents/layout/About/About";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {STRIPE_API_KEY_URL} from "./AllUrls.js"


function App() {
  const context = useContext(noteContext);
  let { Token_User, isAuthenticated, user , message , Error_message , setMessage ,setError_message , loading } = context;
  const [stripeApiKey, setStripeApiKey] = useState("");

  const getStripeApiKey = async () => {
    const response = await fetch(STRIPE_API_KEY_URL, {
      method: "GET",
      credentials: 'include', // Don't forget to specify this if you need cookies for chrome or other browser
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json()
    // console.log("stripeApikey", data);
    setStripeApiKey(data.stripeApiKey);
  }

  if (isAuthenticated !== true) {
    Token_User()
    
  }
  
  useEffect(() => {
    if (isAuthenticated !== true) {
      Token_User()
      
    }
    // console.log("issss");
    if (isAuthenticated) {
      getStripeApiKey()
    }
	if (message) {
      toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
			setMessage(undefined)
		}
		if (Error_message) {
      toast.error(Error_message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
			setError_message(undefined)
		}
    

  }, [isAuthenticated, message , Error_message ])

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <>
      {/* <NoteState> */}
      <Router>
        <Navbar  /> 
        <ToastContainer/>

        {isAuthenticated && <UserOptions user={user} />}
        <Routes>

          <Route exact path="/" element={<Home />} ></Route>
          <Route exact path="/product/:id" element={<ProductDetails />}></Route>
          <Route exact path="/products" element={<Products />}></Route>
          <Route path="/products/:keyword" element={<Products />}></Route>
          <Route exact path="/search" element={<Search />}></Route>
          <Route exact path="/contact" element={<Contact/>} />
           <Route exact path="/about" element={<About/>} />
          <Route exact path="/login" element={<LoginSignUp />}></Route>



           {isAuthenticated &&      <Route path="/account"  element={
          <ProtectedRoute  >
            <Profile  />
          </ProtectedRoute>
         }/>   }

           {isAuthenticated &&      <Route path="/me/update"  element={
          <ProtectedRoute  >
            <UpdateProfile  />
          </ProtectedRoute>
         }/>   }

          {isAuthenticated &&       <Route path="/password/update"  element={
          <ProtectedRoute  >
            <UpdatePassword  />
          </ProtectedRoute>
         }/>   }
          
          <Route exact path="/password/forgot" element={<ForgotPassword />} ></Route>
          <Route exact path="/password/reset/:token" element={<ResetPassword />} ></Route>
          <Route exact path="/cart" element={<Cart />} ></Route>
          
          {isAuthenticated &&      <Route path="/shipping"  element={
          <ProtectedRoute  >
            <Shipping  />
          </ProtectedRoute>
         }/>   }

          {isAuthenticated &&      <Route path="/order/confirm"  element={
          <ProtectedRoute  >
            <ConfirmOrder  />
          </ProtectedRoute>
         }/>   }

          {stripeApiKey && isAuthenticated && (
            <Route path="/process/payment" element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>} />
          )}

            {isAuthenticated &&    <Route path="/success"  element={
          <ProtectedRoute  >
            <OrderSuccess  />
          </ProtectedRoute>
         }/>   }

            {isAuthenticated &&       <Route path="/orders"  element={
          <ProtectedRoute  >
            <MyOrders  />
          </ProtectedRoute>
         }/>   }

           {isAuthenticated &&     <Route path="/order/:id"  element={
          <ProtectedRoute  >
            <OrderDetails  />
          </ProtectedRoute>
         }/>   }

        {isAuthenticated &&     <Route path="/admin/dashboard"  element={
          <ProtectedRoute isAdmin={true} >
            <Dashboard  />
          </ProtectedRoute>
         }/>    }

            {isAuthenticated &&    <Route path="/admin/products"  element={
          <ProtectedRoute isAdmin={true} >
            <ProductList  />
          </ProtectedRoute>
         }/>    }

          {isAuthenticated &&     <Route path="/admin/product/new"  element={
          <ProtectedRoute isAdmin={true} >
            <NewProduct  />
          </ProtectedRoute>
         }/>   }

          {isAuthenticated &&          <Route path="/admin/product/:id"  element={
          <ProtectedRoute isAdmin={true} >
            <UpdateProduct  />
          </ProtectedRoute>
         }/>   }

          {isAuthenticated &&     <Route path="/admin/orders"  element={
          <ProtectedRoute isAdmin={true} >
            <OrderList  />
          </ProtectedRoute>
         }/>   }
          
           {isAuthenticated &&     <Route path="/admin/order/:id"  element={
          <ProtectedRoute isAdmin={true} >
            <ProcessOrder  />
          </ProtectedRoute>
         }/>   }
          
           {isAuthenticated &&     <Route path="/admin/users"  element={
          <ProtectedRoute isAdmin={true} >
            <UsersList  />
          </ProtectedRoute>
         }/>   }
     
          {isAuthenticated &&      <Route path="/admin/user/:id"  element={
          <ProtectedRoute isAdmin={true} >
            <UpdateUser  />
          </ProtectedRoute>
         }/>  }
     
          {isAuthenticated &&     <Route path="/admin/reviews"  element={
          <ProtectedRoute isAdmin={true} >
            <ProductReviews  />
          </ProtectedRoute>
         }/>  }



        <Route path="/*"
          element={
             <NotFound/>
          }
        ></Route>
            <Route
          component={
            window.location.pathname === "/process/payment" ? null : <NotFound/>
          }
        />
          {/* <Route exact path="/cart" element={<Cart />} ></Route> */}


        </Routes>
      </Router>
      {/* </NoteState> */}
    </>
  )
}

export default App;
