import { useEffect, useState } from "react";
import "./imageCarousel.css";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


function ImageCoursel( {  allImages ,   interval_Time=1500} ) {
    const [imageIndex, setImageIndex] = useState(0);   

    useEffect(() => {
        
        const animation_Intervals = setInterval(() => {
            setImageIndex(prev => (prev >= (allImages.length - 1)) ? 0 : prev + 1)
        }, interval_Time);
    
      return () => {
        clearInterval(animation_Intervals)
      }
    }, [allImages])


    return  <>
            <div style={{position:'relative' , height:'100%' , width:'100%' }} >
                {allImages.map((item, index) => {
                    return (
                        imageIndex == Number(index) && (
                            <img style={{ width: '100%', height: '100%' }} key={index} src={item.url} alt="image-loading" />
                        )
                    );
                })}

                <div className="small-buttons">
                    {allImages.map((item, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => { setImageIndex(Number(index)) }}
                                className={` button ${imageIndex == index ? "active" : ""} `}
                            ></div>
                        );
                    })}
                </div>


                <button onClick={() => setImageIndex(prev => (prev <= 0) ? 0 : prev - 1)} className="left arrow"><FaArrowLeft /></button>
                <button onClick={() => setImageIndex(prev => (prev >= (allImages.length - 1)) ? allImages.length - 1 : prev + 1)} className="right arrow"><FaArrowRight /></button>

            </div>

        </>
    
}

export default ImageCoursel;
