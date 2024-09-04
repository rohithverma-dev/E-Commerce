import React, { useEffect, useRef, useState } from 'react'
import "./doubleslider.css"

const DoubleSlider = ({min , max , diff , price , setPrice  }) => {
  const progressBar = useRef(null)
  const [minValue, setMinValue] = useState(price[0])
  const [maxValue, setMaxValue] = useState(price[1])

  useEffect(() => {
    progressBar.current.style.left = ((minValue/max) * 100) + "%"
  }, [minValue])
  useEffect(() => {
    progressBar.current.style.right = (( (max - maxValue)/max) * 100) + "%"
  }, [maxValue])  
  
  useEffect(() => {
    setPrice([minValue , maxValue])
  }, [minValue , maxValue])
  
  

  
  
  return (
    <div className='wrapper'>
      <div className="price-input">
        <div className="field">
          <span>Min</span>
          <input type="number" className='input-min' value={minValue} onChange={ (e)=> setMinValue(e.target.value)} />
        </div>
        <div className="separator">-</div>
        <div className="field">
          <span>Max</span>
          <input type="number" className='input-max' value={maxValue} onChange={ (e)=> setMaxValue(e.target.value)} />
        </div>
      </div>
      <div className="slider">
        <div ref={progressBar} className="progress"></div>
      </div>
      <div className="range-input">
        <input type="range" className='range-min' min={min} max={max} value={minValue} onChange={(e)=>{setMinValue(  (maxValue - e.target.value) <= diff ? minValue : e.target.value   )}} />
        <input type="range" className='range-max' min={min} max={max} value={maxValue} onChange={(e)=>{setMaxValue(  (e.target.value - minValue) <= diff ? maxValue : e.target.value   )}} />
      </div>
    </div>
  )
}

export default DoubleSlider
