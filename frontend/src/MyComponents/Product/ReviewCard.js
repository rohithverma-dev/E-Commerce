import React from 'react'
import profilePng from "../../images/Profile.png";
import Stars from '../../CustomComponents/StarRating/Stars';



function ReviewCard({ review }) {

  const options = {
    edit: false,
    totalStars: 5,
    size: window.innerWidth < 600 ? 5.5 : 7,
    value: review.rating || 0,
  }

  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <h1>{review.name}</h1>
      <Stars options={options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  )
}

export default ReviewCard