import React, { useEffect, useRef, useState } from 'react'
import "./singleslider.css"

const SingleSlider = ({ min, max, rating, setRating }) => {
    const slider_thumb = useRef(null)
    const tooltip = useRef(null)

    useEffect(() => {
        const val = (rating / max) * 100;
        tooltip.current.innerHTML = rating;
        slider_thumb.current.style.left = `${val}%`;
    }, [rating]);

    return (
        <>
            <div className="range-slider">
                <input type="range" onChange={(e) => setRating(e.target.value)} min={min} max={max} value={rating} className="slider" />
                <div ref={slider_thumb} className="slider-thumb">
                    <div ref={tooltip} className="tooltip maintooltip"></div>
                </div>
            </div>
            <input style={{width:'30px'}} className='input_range' type="number" value={rating} onChange={(e) => setRating((e.target.value <= 5 && e.target.value >= 0)  ? e.target.value : 0)} />
        </>
    )
}

export default SingleSlider
