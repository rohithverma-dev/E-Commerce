import React, { useState } from 'react';
import Stars from "../StarRating/Stars.js"
import "./modal.css";


const Modal = ({ options ,  modal , setModal, handleSubmit , setRating , comment , setComment }) => {

    // const options = {
    //     edit: true,
    //     totalStars: 5,
    //     size: window.innerWidth < 600 ? 5.5 : 7,
    //     value: 0,
    // }

    return (
        modal && <>
            <div onClick={() => setModal(!modal)} className="overlay_modal"></div>
            <div className="modal_content">
                <form onSubmit={(e) => { e.preventDefault(); setModal(!modal); handleSubmit() }}>
                    <h4>Submit Review</h4>
                    <div style={{padding:"0 10px" , marginBottom:'10px' }} className="startsContainer">
                        <Stars onChange={(e)=>setRating(e.target.value)} options={options} />
                    </div>
            
            <textarea value={comment} onChange={(e) => setComment(e.target.value)}  style={{ width: '100%', height: '100%' }} name="" id=""></textarea>
                    <div className="buttons">
                        <div onClick={() => setModal(!modal)} className=" btn cancel">CANCEL</div>
                        <button className="btn submit" style={{ outline: 'none', border: 'none' }} type="submit" >SUBMIT</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Modal
