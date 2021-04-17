import {Link} from 'react-router-dom';
import React, { useState,useEffect } from 'react';
import axios from 'axios';

const Otpverify = (props) => {

    useEffect(()=>{
        document.title="Otp Verification";
    },[]);

    const [record,setrecord] = useState({}); 
    const [loader,setloader] = useState(true);
    const Otp = (e) => {
        e.preventDefault();
        console.log(record)
        setrecord(record)
        postdatatoserver()
    }

    const postdatatoserver = () => {
        axios.post(`http://localhost:8081/otpverify`,record).then(
            (response) => {
                console.log(response.data);
                document.getElementById('otp').value = ''
                setloader(true)
                if(response.data.data ==="otp successfully verify"){
                    props.history.push('/Login')
                }else if(response.data.data === "Otp is incorrect"){
                        alert('Otp is incorrect')
                }
            },
            (Error) => {
                console.log(Error);
            }
        )
    }

    return (
        <>
            <div className="bg-gray-900">
                <div className="login container mx-auto w-full max-w-xs items-center pt-12 h-screen">
                    <form  method="GET" className="bg-white shadow-md rounded px-8 pt-8 pb-8 m-4">
                        <label className="block text-lg font-bold mb-4 py-2 text-center bg-gray-800 rounded text-white">Otp Verification</label>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Otp : </label>
                            <label className="incorrect-user text-red-500"></label>
                            <input  onChange={(e) => setrecord({...record,otpDto:e.target.value})}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="otp" type="text" placeholder="Enter Otp here..." />
                        </div>
                        <button id="login" onClick={Otp}
                            className="btn-primary rounded-full text-white font-bold py-2 px-4 mx-16 rounded focus:outline-none focus:shadow-outline place-self-center"
                            type="button">
                            Register</button>
                    </form>
                    
                </div>
            </div>
        </>
    )


}

export default Otpverify;