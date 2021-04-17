import {Link} from 'react-router-dom';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import  { Redirect } from 'react-router-dom'


const Register = (props) => {

    useEffect(()=>{
        document.title="Register";
    },[]);

    const [record,setrecord] = useState({}); 
    const [loader,setloader] = useState(true);
    const register = (e) => {
        e.preventDefault();
        console.log(record)
        setrecord(record)
        postdatatoserver()
    }

    const postdatatoserver = () => {
        axios.post(`http://localhost:8081/register`,record).then(
            (response) => {
                console.log(response.data);
                document.getElementById('username').value = ''
                document.getElementById('mobile').value = ''
                document.getElementById('pass').value = ''
                setloader(true)

                if((response.data.status === "otp send" && response.data.httpStatus === "OK") || response.data.data ==="user mobile not verified !! otp send plz verify"){
                       props.history.push('/Otpverify')
                }else if(response.data.status === "invalid data"){
                        alert('Data is not in required format')
                }else if(response.data.data === "user already exist"){
                        alert('User Already Exist')
                }

            },
            (Error) => {
                console.log(Error);
            }
        )
    }



    return (
        <>
        {/* <h1>Registration</h1>     */}
        <div className="bg-gray-900">
                <div className="login container mx-auto w-full max-w-xs items-center pt-12 h-screen">
                    <form  method="GET" className="bg-white shadow-md rounded px-8 pt-8 pb-8 m-4">
                        <label className="block text-lg font-bold mb-4 py-2 text-center bg-gray-800 rounded text-white">Registration</label>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Username : </label>
                            <label className="incorrect-user text-red-500"></label>
                            <input  onChange={(e) => setrecord({...record,username:e.target.value})}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username" type="text" placeholder="Enter Username here..." />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Mobile : </label>
                            <label className="incorrect-user text-red-500"></label>
                            <input  onChange={(e) => setrecord({...record,mobile:e.target.value})}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="mobile" type="text" placeholder="Enter Username here..." />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Password</label>
                            <label className="incorrect-user text-red-500"></label>
                            <input  onChange={(e) => setrecord({...record,pass:e.target.value})}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="pass" type="password" />
                        </div>
                        <button id="login" onClick={register}
                            className="btn-primary rounded-full text-white font-bold py-2 px-4 mx-16 rounded focus:outline-none focus:shadow-outline place-self-center"
                            type="button">
                            Register</button>
                    </form>
                    
                </div>
            </div>
        </>
    )

}

export default Register; 
