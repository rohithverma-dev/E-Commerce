import React from "react";
import "./aboutSection.css";
import { BsGithub } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";


const About = () => {
  const visitGitHub = () => {
    window.location = "https://github.com/rohithverma-dev";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <h1>About Me</h1>
        <div>
          <div>
            <img
              style={{ width: "12vmax",  borderRadius:'50%'  , height: "12vmax", margin: "2vmax 0" }}
              src="https://media.licdn.com/dms/image/v2/D4D35AQENDyD1yrhO0Q/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1720353677714?e=1725566400&v=beta&t=gixwiOWT1EExu6GGHtAgf6uaA0LSIvdmJBN-P4qWAZo"
              alt="Founder"
            />
            <p>Rohit Verma</p>
            <button onClick={visitGitHub} style={{color:'darkblue' , outline:"none" , backgroundColor:'transparent' , border:'none' , cursor:'pointer' ,   }} >
              <h3 style={{fontWeight:'100'}} > Visit GitHub</h3>
            </button>
            <span>
              This is an ECommerce wesbite made by @meRohitVerma. Only with the
              purpose to learn MERN Stack. 
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <h2 className="our_brands" component="h2">Our Brands</h2>

            <a href="https://github.com/rohithverma-dev" target="blank">
              <BsGithub className="githubSvgIcon" />
            </a>
            <br />
            <a
              href="https://www.linkedin.com/in/rohit-fullstack-dev/"
              target="blank"
            >
              <BsLinkedin className="linkedinSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
