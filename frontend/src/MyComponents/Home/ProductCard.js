import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Loading from "../layout/Loader/Loader.js"
import Stars from '../../CustomComponents/StarRating/Stars.js'


function ProductCard({ product }) {
  // https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60


  const options = {
    edit: false,
    totalStars: 5,
    size: window.innerWidth < 600 ? 5.5 : 7,
    value: product.ratings || 0,
  }

  return (
    <div>
      <Link className='productCard' to={`http://localhost:3000/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div>
          <Stars options={options} />
          <span>{product.Num_of_reviews} Reviews</span>
        </div>
        <span>&#8377;{product.price}</span>
      </Link>
    </div>
  )
}

export default ProductCard   