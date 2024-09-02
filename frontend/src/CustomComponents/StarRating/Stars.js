import React, { useEffect, useState } from 'react'
import "./star.css"

const Stars = ({ onChange = false, options }) => {    

    
    const [ele_hover_index, setEle_hover_index] = useState(0)
    const [ele_index, setEle_index] = useState(options.value)
    const handleHover = (stars) => {
        setEle_hover_index(stars)
    };

    // console.log(onChange );
    const handleClick = (stars) => {
        setEle_index(stars)
        if (onChange) {
            onChange({ target: { value: stars } })
        }
    };

    return (
        <div className="all_stars">
            {Array.from(Array(options.totalStars)).map((_, index) => {
                return (
                    <div
                        style={{ '--size': `${options?.size}px`, margin: `0px ${"3px"}` }}
                        className={` star ${(index+1) <= (ele_hover_index || ele_index) ? 'color-star' : ''} `}
                        key={index}
                        onMouseEnter={() => options?.edit && handleHover(index+1)}
                        onMouseLeave={() => options?.edit && handleHover(0)}
                        onClick={() => options?.edit && handleClick(index+1)}  >
                    </div>
                );
            })}
        </div>
    )
}

export default Stars