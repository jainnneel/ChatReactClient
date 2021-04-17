import React, { useState,useEffect } from 'react';
import remove from '../../images/remove.png'


const Notify = (props) => {
    useEffect(()=>{
        // console.log(props)
    },[]);

   if(props.notify.type === "req"){
        return(
            <>
                <div id={props.notify.nid} className={
                    "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                    (props.color === "white" ? " text-blueGray-700" : "text-white")
                }>{props.notify.message}
                <button onClick={() => props.acceptRequest(props.notify.fromMobile)} className="bg-transparent hover:bg-blue-500 text-xs font-semibold hover:text-white py-1 px-1  mx-1 border border-blue-500 hover:border-transparent rounded">
                    Accept
                    </button>
                <button onClick={() => props.deleteNotification(props.notify.nid)} className="bg-transparent hover:bg-blue-500 text-xs font-semibold hover:text-white py-1 px-1 mx-1 border border-blue-500 hover:border-transparent rounded">
                    Reject
                </button> 
                </div>
                <hr></hr>
            </>
        )
   }else{
        // props.getuser();
        return(
        <>
            <div id={props.notify.nid} className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
            (props.color === "white" ? " text-blueGray-700" : "text-white")
            }>{props.notify.message}
            <div><img className="py-1" onClick={() => props.deleteNotification(props.notify.nid)} src={remove} alt="" height="20" width="20"></img></div>
            </div>
            <hr></hr>
            
        </>
    )
   } 

    


}

export default Notify;