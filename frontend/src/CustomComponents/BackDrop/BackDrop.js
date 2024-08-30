import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./backdrop.css"


const BackDrop = ({ AvatarUrl , options}) => {

    const [showOptions, setShowOptions] = useState(false)
    const [tooltipContent, setTooltipContent] = useState("")

    useEffect(() => {
        const links = document.querySelectorAll('.route_link .Link');
        links.forEach(link => link.setAttribute('data-tooltip', tooltipContent));
    }, [tooltipContent])

    return (
        <div className='users_options' >
            <div style={{ opacity: showOptions ? '1' : '0', transition: '0.5s', transitionDelay: showOptions ? '0s' : '0s' }} className="overlay_routes"></div>
            <div className="route_options">
                <img
                    onClick={() => setShowOptions(!showOptions)}
                    onMouseEnter={() => setShowOptions(true)}
                    onMouseLeave={() => setShowOptions(false)}
                    className="avatar"
                    src={AvatarUrl} alt=""
                />

                <div style={{ transform: `scale(${showOptions ? 1 : 0}) `, transitionDelay: `${showOptions ? '0s' : '1s'}`  }} >

                    {options.map((item, index) => {
                        return <div
                            key={index}
                            style={{ transform: `scale(${showOptions ? 1 : 0}) rotate(${showOptions ? 360 : 0}deg) `, transition: `1s`, transitionDelay: `${showOptions ? '0s' : '0.5s'}` }}
                            onMouseEnter={() => { setShowOptions(true); setTooltipContent(item.name) }}
                            onMouseLeave={() => { setShowOptions(false); setTooltipContent("") }}
                            className="route_link"
                        >
                            <span className='Link' onClick={item.func} >  {item.icon} </span>
                        </div>
                    })}
                </div>


            </div>
        </div>
    )
}

export default BackDrop
