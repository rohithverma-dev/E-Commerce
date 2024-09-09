import { useState } from 'react';
import NoteContext from './noteContext';
import { BACKEND_URL } from '../../AllUrls';


const NoteState = (props) => {
  const host = BACKEND_URL

 // set message and error message and loading
 const [loading, setLoading] = useState(false)
 const [message, setMessage] = useState()
 const [Error_message, setError_message] = useState()

  // for Products and Product Details
  const [products, setProducts] = useState([])
  const [Count, setProductsCount] = useState(0)
  const [PerPage, setResultPerPage] = useState(0)
  const [product, setProductDetails] = useState({})
  const [filteredProducts, setfilteredProductsCount] = useState(0)

  // for Login/Register and user ::
  const [isAuthenticated, setisAuthenticated] = useState(false)
  const [user, setUser] = useState("")

  // for user Update Profile
  const [isUpdated, setIsUpdated] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)

  // for cart items
  const [cartItems, setCartItems] = useState([])    
  const [shippingInfo, setShippingInfo] = useState([])

  // for myorders
  const [myorders, setMyorders] = useState()
  const [myorder, setMyorder] = useState()

  // admin - getallorders
  const [admin_allorders, setAdmin_allorders] = useState([])
  const [admin_allusers, setAdmin_allusers] = useState([])
  const [admin_allproducts, setAdmin_allproducts] = useState([])
  const [admin_allreviews, setAdmin_allreviews] = useState([])

  // admin - for users
  const [admin_Par_User, setAdmin_Par_User] = useState()

  // --------------------------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------------------------




  // ***************************************************************************************************
  // ***************************************************************************************************
  //  Get all products for Home page
  const getAllProducts = async (keyword = "", currentPage = 1, price = [0, 70000], category, ratings = 0) => {
    let link = `${host}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
    if (category) {
      link = `${host}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    }
    // setLoading(true)      
    const response = await fetch(link, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json()
    if (data.Error_message) {
      setError_message(data.Error_message)
    }

    
    if (data.message) {
      // setMessage(data.message)
      let allproducts = await data.products
      let productsCount = await data.productsCount
      let resultPerPage = await data.resultPerPage
      let allfilteredProductsCount = await data.filteredProductsCount
      setProducts([...allproducts])
      setProductsCount(productsCount)
      setResultPerPage(resultPerPage)
      setfilteredProductsCount(allfilteredProductsCount)
    }
    // setLoading(false)
  }



// get Product Details
 const getProductDetails = async (id) => {
    setLoading(true)
    const response = await fetch(`${host}/api/v1/product/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json()
    if (data.Error_message) {
      setError_message(data.Error_message)
    }
    if (data.message) {
      // setMessage(data.message)
      setProductDetails(data.product);
    }
    setLoading(false)
  }
  // ***************************************************************************************************
  // ***************************************************************************************************




    // ***************************************************************************************************
  // ***************************************************************************************************
  // register
  const Register = async (UserData) => {
    setLoading(true)
    const response = await fetch(`${host}/api/v1/register`, {
      method: "POST",
      credentials: 'include', // Don't forget to specify this if you need cookies for chrome or other browser
      // headers: {
      //   "Content-Type": "multipart/form-data ",   
      // },
      body: UserData,
    });
    const data = await response.json()
    if (data.Error_message) {
      setError_message(data.Error_message)
    }
    if (data.message) {
      setMessage(data.message)
      setisAuthenticated(data.success);
      setUser(data.user)

    }
    setLoading(false)
  }

  // login
  const Login = async (email, password) => {
    setLoading(true)
    const response = await fetch(`${host}/api/v1/login`, {
      method: "POST",
      credentials: 'include', // Don't forget to specify this if you need cookies for chrome or other browser
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json()
    if (data.Error_message) {
      setError_message(data.Error_message)
    }
    if (data.message) {
      setMessage(data.message)
      setisAuthenticated(data.success);
      setUser(data.user)

    }
    setLoading(false)
  }

  // authentication - token 
  const Token_User = async () => {
    // console.log("token_User");
    // setLoading(true)
    const response = await fetch(`${host}/api/v1/me`, {
      method: "GET",
      credentials: 'include', // Don't forget to specify this if you need cookies for chrome or other browser
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer" + Cookies.get("token"),
        // "x-auth-token": cookies.get("token"),
      },
    });
    const data = await response.json()
    if (data.Error_message) {
 
      setisAuthenticated(data.success);
      setUser(data.user)
      
    }
    if (data.message) {
      // setMessage(data.message)
      setisAuthenticated(data.success);
      setUser(data.user)
    }
    // setLoading(false)

  }

  // authentication - token 
  const LogOut = async () => {
    setLoading(true)
    const response = await fetch(`${host}/api/v1/logout`, {
      method: "GET",
      credentials: 'include', // Don't forget to specify this if you need cookies for chrome or other browser
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer" + Cookies.get("token"),
        // "x-auth-token": cookies.get("token"),
      },
    });
    const data = await response.json()
    if (data.Error_message) {
      setError_message(data.Error_message)
    }
    if (data.message) {
      setMessage(data.message)
      setisAuthenticated(data.success);
      setUser(data.user)

      
    }
    setLoading(false)

  }

   // update User profile
   const updateUserProfile = async (UpdateData) => {
     // try{
      setLoading(true)
      const response = await fetch(`${host}/api/v1/me-profile/change-update`, {
        method: "PUT",
        credentials: 'include', // Don't forget to specify this if you need cookies for chrome or other browser
        // headers: {
          //   "Content-Type": "multipart/form-data ",   
          // },
          body: UpdateData, 
        });
      const data = await response.json()
      // console.log("data",data);
      if(data.success === true){
        setisAuthenticated(data.success);
        setIsUpdated(data.success)
        setUser(data.user)
      }
      // else{
      //   alert(data.Error_message);  
      // }
      if (data.Error_message) {
        console.log(data.Error_message);
        setError_message(data.Error_message)
      }
      if (data.message) {
        setMessage(data.message)

      }

    setLoading(false)

    // }
    // catch(ex){
    //   alert(ex.message);
    // }
  }

  // change/update password
  const updateUserPassword = async (passwords) => {
    setLoading(true)
    const response = await fetch(`${host}/api/v1/password/change-update`, {
      method: "PUT",
      credentials: 'include', // Don't forget to specify this if you need cookies for chrome or other browser
      // headers: {
      //   "Content-Type": "multipart/form-data",
      //   },
        body: passwords, 
      });
    const data = await response.json()
    if (data.Error_message) {
      setError_message(data.Error_message)
    }
    if (data.message) {
      setMessage(data.message)
      console.log("data", data)
      setisAuthenticated(data.success)
      setIsUpdated(data.success)
      setUser(data.user)
    }
    setLoading(false)
  }

  // forgot password
  const UserForgotPassword = async (forgotpass) => {
    setLoading(true)
    const response = await fetch(`${host}/api/v1/password/forgot`, {
      method: "POST",
      // credentials: 'include', // Don't forget to specify this if you need cookies for chrome or other browser
      // headers: {
      //   "Content-Type": "application/json",
      //   },
        body: forgotpass, 
      });
    const data = await response.json()
    // console.log("data", data);
    if (data.Error_message) {
      setError_message(data.Error_message)
    }
    if (data.message) {
      setMessage(data.message)
    }
    setLoading(false)
  }

  // user reset password 
  const UserResetPassword = async (ttokken , Mailform ) => {
    setLoading(true)
    const response = await fetch(`${host}/api/v1/password/reset/${ttokken}`, {
      method: "PUT",
      credentials: 'include', // Don't forget to specify this if you need cookies for chrome or other browser
      // headers: {
      //   "Content-Type": "application/json",
      //   },
        body:Mailform , 
      });
    const data = await response.json()
    if (data.Error_message) {
      setError_message(data.Error_message)
    }
    if (data.message) {
      setMessage(data.message)
      console.log("data", data);
      setIsUpdated(data.success)
      setUser(data.user)
      setisAuthenticated(data.success)
    }
    setLoading(false)
  }
 

  // *************************************************************************************************
  // *************************************************************************************************




  // *************************************************************************************************
  // *************************************************************************************************
  // cart item 
  const addItemsToCart = async (id , quantity ) => {
    setLoading(true)
    const response = await fetch(`${host}/api/v1/product/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        },
      });
    const data = await response.json()
    if (data.Error_message) {
      setError_message(data.Error_message)
    }
    if (data.message) {
      console.log(data.message , "message");
      setMessage("Item Added To Cart")
      let payload ={
        product:data.product._id,
        name:data.product.name,
        price:data.product.price,
        image:data.product.images[0].url,
        stock:data.product.Stock,
        quantity
      }
      
      const isItemExist = cartItems.find(
        (i)=> i.product === payload.product
        )
        if (isItemExist) {
          setCartItems(cartItems.map((i)=> i.product === isItemExist.product ? payload:i ))
        }
        else{
          setCartItems([...cartItems , payload])
        }
        setIsUpdated(data.success)
      }
  
    setLoading(false)
  }  

   // remove cart item 
   const removeItemsFromCart = async (id  ) => {
    setLoading(true)
    setCartItems(cartItems.filter((i)=> i.product !== id ))
    setIsUpdated(true)

    setLoading(false)
  }  
// *******************************************************************************************************
// *******************************************************************************************************



// *******************************************************************************************************
// *******************************************************************************************************
// add shiping info
const saveShippingInfo = async ( data_shipping ) => {
  setLoading(true)
 
  setShippingInfo(data_shipping)

  setIsUpdated(true)

  setLoading(false)
}  
// *******************************************************************************************************
// *******************************************************************************************************



// *******************************************************************************************************
// *******************************************************************************************************
// new order
const createOrder = async ( place_Order ) => {
  setLoading(true)

  const response = await fetch(`${host}/api/v1/order/new`, {
    method: "POST",
    credentials:"include",
    headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(place_Order)
    });
    const data = await response.json()
    if (data.Error_message) {
      setError_message(data.Error_message)
    }
    if (data.message) {
      setMessage(data.message)
    }
    setLoading(false)
}  

// my orders
const f_myOrders = async (  ) => {
    setLoading(true)
    const response = await fetch(`${host}/api/v1/orders/me`, {
    method: "GET",
    credentials:"include",
    headers: {
      "Content-Type": "application/json",
      },
    });
    const data = await response.json()
    if (data.Error_message) {
      setError_message(data.Error_message)
    }
    if (data.message) {
      // setMessage(data.message)
      setMyorders(data.orders)
    }
    setLoading(false)
}  

// getOrderDetails
const getOrderDetails = async ( id ) => {
    setLoading(true)
    const response = await fetch(`${host}/api/v1/order/${id}`, {
    method: "GET",
    credentials:"include",
    headers: {
      "Content-Type": "application/json",
      },
    });
    const data = await response.json()
    if (data.Error_message) {
      setError_message(data.Error_message)
    }
    if (data.message) {
      // setMessage(data.message)
      setMyorder(data.order)
      console.log( "order user name" , data.order.user);
    }
    setLoading(false)
} 
// ******************************************************************************************************
// ******************************************************************************************************


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// new review
const newReview = async ( newReviewForm ) => {
    setLoading(true)
    const response = await fetch(`${host}/api/v1/product/create-update-review`, {
    method: "PUT",
    credentials:"include",
    // headers: {
    //   "Content-Type": "application/json",
    //   },
      body: newReviewForm
    });
    const data = await response.json()
    if (data.Error_message) {
      setError_message(data.Error_message)
      setLoading(false)
    }
    if (data.message) {
      setMessage(data.message)
      setIsUpdated(data.success)
      setIsUpdated(true)
      setLoading(false)
    }

} 

// ***********************************************************************************************************
// ***********************************************************************************************************


// ***********************************************************************************************************
// ***********************************************************************************************************

// Admin_getAllProducts

const Admin_getAllProducts = async ( ) => {
    setLoading(true)
    const response = await fetch(`${host}/api/v1/admin/products`, {
    method: "GET",
    credentials:"include",
    headers: {
      "Content-Type": "application/json",
      },
    });
    const data = await response.json()
    // setIsUpdated(data.success)
    if (data.Error_message) {
      setError_message(data.Error_message)
    }
    if (data.message) {
      // setMessage(data.message)
      setAdmin_allproducts(data.products)
    }
    setLoading(false)
  } 
  
  // Admin_updateProduct
  const Admin_updateProduct = async (id , updateProductForm) => {
    setLoading(true)
    const response = await fetch(`${host}/api/v1/admin/product/${id}`, {
      method: "PUT",
      credentials:"include",
      // headers: {
      //   "Content-Type": "multipart/form-data ",   
      //   },
        body:updateProductForm
      });
      const data = await response.json()
      if (data.Error_message) {
        setError_message(data.Error_message)
      }
      if (data.message) {
        setMessage(data.message)
        setIsUpdated(data.success)
      }
      setLoading(false)
    } 
  
  // Admin_deleteProduct
  const Admin_deleteProduct = async ( id) => {
    setLoading(true)
    const response = await fetch(`${host}/api/v1/admin/product/${id}`, {
      method: "DELETE",
      credentials:"include",
      headers: {
        "Content-Type": "application/json",
        },
      });
      const data = await response.json()
      if (data.Error_message) {
        setError_message(data.Error_message)
      }
      if (data.message) {
        setMessage(data.message)
        setIsDeleted(data.success)
      }
    setLoading(false)
  } 
    
    // Admin_createProduct
    const Admin_createProduct = async ( createProductForm) => {
    setLoading(true)
    const response = await fetch(`${host}/api/v1/admin/product/new`, {
        method: "POST",
        credentials:"include",
        // headers: {
        //   "Content-Type": "application/json",
        //   "Content-Type": "multipart/form-data ",   
        //   },
          body:createProductForm
        });
        const data = await response.json()
        if (data.Error_message) {
          setError_message(data.Error_message)
        }
        if (data.message) {
          setMessage(data.message)
          setIsUpdated(data.success)
        }
    setLoading(false)
  } 

    //  REVIEWS : ------------------------------ REVIEWS : ------------
// admin get all reviews
const Admin_getAllReviews = async (id ) => {
    setLoading(true)
    const response = await fetch(`${host}/api/v1/get-product-reviews?id=${id}`, {
    method: "GET",
    credentials:"include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json()
  // setIsUpdated(data.success)
  if (data.Error_message) {
    setError_message(data.Error_message)
  }
  if (data.message) {
    // setMessage(data.message)
    setAdmin_allreviews(data.reviews)
  }
  setLoading(false)
} 

  // Admin_deleteProduct
  const Admin_deleteReview = async ( reviewId , productId) => {
    setLoading(true)
    const response = await fetch(`${host}/api/v1/delete-product-review?id=${reviewId}&productId=${productId}`, {
      method: "DELETE",
      credentials:"include",
      headers: {
        "Content-Type": "application/json",
        },
      });
      const data = await response.json()
      console.log("review-data" , data);
      if (data.Error_message) {
        setError_message(data.Error_message)
      }
      if (data.message) {
        setMessage(data.message)
        setIsDeleted(data.success)
      }
    setLoading(false)
  } 

    //  REVIEWS : ------------------------------ REVIEWS : ------------
    
    // --------------ALL Orders ---------------------------------------------------------------
// admin get all orders
const Admin_getAllOrders = async ( ) => {
    setLoading(true)
    const response = await fetch(`${host}/api/v1/admin/orders`, {
    method: "GET",
    credentials:"include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json()
  // setIsUpdated(data.success)
  if (data.Error_message) {
    setError_message(data.Error_message)
  }
  if (data.message) {
    // setMessage(data.message)
    setAdmin_allorders(data.orders)
  }
  setLoading(false)
} 

// Admin_updateOrder
const Admin_updateOrder = async (id , updateOrderForm) => {
    setLoading(true)
    const response = await fetch(`${host}/api/v1/admin/order/${id}`, {
    method: "PUT",
    credentials:"include",
    // headers: {
    //   "Content-Type": "multipart/form-data ",   
    //   },
      body:updateOrderForm
    });
    const data = await response.json()
    if (data.Error_message) {
      setError_message(data.Error_message)
    }
    if (data.message) {
      setMessage(data.message) 
      setIsUpdated(data.success)
    }
    setLoading(false)
} 

// Admin_deleteOrder
const Admin_deleteOrder = async ( id) => {
    setLoading(true)
    const response = await fetch(`${host}/api/v1/admin/order/${id}`, {
    method: "DELETE",
    credentials:"include",
    headers: {
      "Content-Type": "application/json",
      },
    });
    const data = await response.json()
    if (data.Error_message) {
      setError_message(data.Error_message)
    }
    if (data.message) {
      setMessage(data.message)
      setIsDeleted(data.success)
    }
    setLoading(false)
} 

// --------------ALL Users ---------------------------------------------------------------
// admin get all users
const Admin_getAllUsers = async ( ) => {
    setLoading(true)
    const response = await fetch(`${host}/api/v1/admin/users`, {
    method: "GET",
    credentials:"include",
    headers: {
      "Content-Type": "application/json",
      },
    });
    const data = await response.json()
    // setIsUpdated(data.success)
    if (data.Error_message) {
      setError_message(data.Error_message)
    }
    if (data.message) {
      // setMessage(data.message)
      setAdmin_allusers(data.users)
    }
    setLoading(false)
  } 
  
  // Admin_updateUser
  const Admin_updateUser = async (id , updateUserForm) => {
    setLoading(true)
    const response = await fetch(`${host}/api/v1/admin/user/${id}`, {
      method: "PUT",
      credentials:"include",
      // headers: {
      //   "Content-Type": "multipart/form-data ",   
      //   },
        body:updateUserForm
      });
      const data = await response.json()
      if (data.Error_message) {
        setError_message(data.Error_message)
      }
      if (data.message) {
        setMessage(data.message)
        setIsUpdated(data.success)
      }
      setLoading(false)
    } 
  
// Admin_deleteUser
const Admin_deleteUser = async ( id) => {
    setLoading(true)
    const response = await fetch(`${host}/api/v1/admin/user/${id}`, {
    method: "DELETE",
    credentials:"include",
    headers: {
      "Content-Type": "application/json",
      },
    });
    const data = await response.json()
    if (data.Error_message) {
      setError_message(data.Error_message)
    }
    if (data.message) {
      setMessage(data.message)
      setIsDeleted(data.success)
    }
    setLoading(false)
} 

// Admin_get_Par_User
const Admin_get_Par_User = async ( id) => {
    setLoading(true)
    const response = await fetch(`${host}/api/v1/admin/user/${id}`, {
    method: "GET",
    credentials:"include",
    headers: {
      "Content-Type": "application/json",
      },
    });
    const data = await response.json()
    if (data.Error_message) {
      setError_message(data.Error_message)
    }
    if (data.message) {
      // setMessage(data.message)
      setAdmin_Par_User(data.user)
    }

    setLoading(false)
} 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  return (
    <NoteContext.Provider value={{
       products, filteredProducts, Count, PerPage, getAllProducts, product, getProductDetails, setProducts,

     Token_User, Login, isAuthenticated, Register, user , LogOut , isUpdated , setIsUpdated ,updateUserProfile ,updateUserPassword , UserForgotPassword ,UserResetPassword 
    
     , addItemsToCart ,setCartItems , cartItems , removeItemsFromCart
     
     , shippingInfo  , setShippingInfo , saveShippingInfo 

      , createOrder , myorders , f_myOrders ,  myorder ,  getOrderDetails , 
      newReview , 
      
      Admin_getAllProducts , admin_allproducts ,  Admin_deleteProduct , Admin_updateProduct ,Admin_createProduct ,
      Admin_getAllOrders , admin_allorders ,  Admin_deleteOrder , Admin_updateOrder ,
      Admin_getAllUsers , admin_allusers , Admin_deleteUser , Admin_updateUser , Admin_get_Par_User , admin_Par_User ,
      Admin_getAllReviews , admin_allreviews , Admin_deleteReview ,
       setIsDeleted , isDeleted ,

       Error_message , message , setMessage , setError_message , loading , setLoading
      }} >
      {props.children}    
    </NoteContext.Provider>   
  )
}

export default NoteState;