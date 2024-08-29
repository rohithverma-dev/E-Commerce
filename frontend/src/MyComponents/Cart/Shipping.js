import React, { Fragment, useContext, useEffect, useState } from "react";
import "./Shipping.css";
import MetaData from "../layout/MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import CheckoutSteps from "../Cart/CheckoutSteps.js";
import { useNavigate } from "react-router-dom";
import Loading from "../layout/Loader/Loader.js"
import noteContext from "../../context/notes/noteContext.js"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Shipping = () => {
  let history = useNavigate(); 

  const context = useContext(noteContext);
  const { shippingInfo , saveShippingInfo , isUpdated , setIsUpdated , setShippingInfo , loading , setLoading} = context;


  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  

  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      toast.info("Phone No. should 10 digit long", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      // alert.error("Phone digit should 10 digit long")
      
      return;
    }
    saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    // history("/order/confirm");
  };
  useEffect(() => {
    setShippingInfo( localStorage.getItem("shippingInfo")  ? JSON.parse( localStorage.getItem("shippingInfo")):[] )

    if (isUpdated) {
    localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo))
    setIsUpdated(false)
    history("/order/confirm");
    }

  }, [isUpdated ]);
  return (

    <Fragment>
      {loading ? (<Loading/>): (  <Fragment>
      <MetaData title="Shipping Details" />

      <CheckoutSteps activeStep={0} />

      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form  className="shippingForm"  encType="multipart/form-data"  onSubmit={shippingSubmit}  >
            <div>
              <HomeIcon />
              <input type="text" placeholder="Address"  required  value={address}  onChange={(e) => setAddress(e.target.value)} />
            </div>

            <div>
              <LocationCityIcon />
              <input  type="text"  placeholder="City"  required  value={city}  onChange={(e) => setCity(e.target.value)}  />
            </div>

            <div>
              <PinDropIcon />
              <input  type="number" placeholder="Pin Code"  required  value={pinCode}  onChange={(e) => setPinCode(e.target.value)}  />
            </div>

            <div>
              <PhoneIcon />
              <input  type="number"  placeholder="Phone Number"  required  value={phoneNo}  onChange={(e) => setPhoneNo(e.target.value)}   size="10"  />
            </div>

            <div>
              <PublicIcon />
              <select  required  value={country}  onChange={(e) => setCountry(e.target.value)}  >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
  
            {country && (
              <div>
                <TransferWithinAStationIcon />

                <select  required  value={state}  onChange={(e) => setState(e.target.value)}   >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input   disabled={
                  loading ? true : false 
                }  type="submit"  value="Continue"  className="shippingBtn"  />
          </form>
        </div>
      </div>
    </Fragment>)}
    </Fragment>

  
  );                 
};

export default Shipping;
