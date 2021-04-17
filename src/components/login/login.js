import API from '../../services/api'

import React, { useState,useEffect } from 'react';

import axios from 'axios';
import  { Redirect,useHistory } from 'react-router-dom'
// const NodeRSA = require('node-rsa');

const Login = (props) => {
    const history = useHistory();
    useEffect(()=>{
        document.title="Login";
    },[]);
    const [record,setrecord] = useState({}); 
    const [loader,setloader] = useState(true);
   
    const login = (e) => {
        e.preventDefault();
        console.log(record)
        setrecord(record)
        postdatatoserver()
    }

    const postdatatoserver = () => {

        var form_data = new FormData();
         form_data.set('username',record.username)
         form_data.set('password',record.password)
        axios.post(`http://localhost:8081/loginrequest`,form_data).then(
            (response) => {
                console.log(response.data);
                // document.getElementById('mobile').value = ''
                // document.getElementById('pass').value = ''
                setloader(true)

                if(response.data.status === "success" && response.data.httpStatus === "OK"){
                    console.log(props)
                    localStorage.setItem('userId',response.data.data.id);
                    localStorage.setItem('token',response.data.token);
                    // console.log(setLoggedinUser)
                    // props.setLoggedinUser(response.data.data)
                    console.log(response.data.data)
                    history.push({pathname:'/ChatWindow',state:{data : response.data.data}})
                }else if(response.data.data === "Wrong username or password"){
                        alert('Wrong username or password')
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
                    <form action="chat.html" method="GET" className="bg-white shadow-md rounded px-8 pt-8 pb-8 m-4">
                        <label className="block text-lg font-bold mb-4 py-2 text-center bg-gray-800 rounded text-white">Login</label>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Mobile :</label>
                            <label className="incorrect-user text-red-500"></label>
                            <input onChange={(e) => setrecord({...record,username:e.target.value})}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username" type="text" placeholder="Enter Username here..." />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Password :</label>
                            <label className="incorrect-user text-red-500"></label>
                            <input onChange={(e) => setrecord({...record,password:e.target.value})}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password" type="password" placeholder="Enter Password here..." />
                        </div>
                        <button id="login" onClick={login}
                            className="btn-primary rounded-full text-white font-bold py-2 px-4 mx-16 rounded focus:outline-none focus:shadow-outline place-self-center"
                            type="button">
                            Login</button>
                    </form>
                    
                </div>
            </div>

        </>

    )
}
export default Login;

// export default class Login extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             username: "",
//             password: ""
//         }
//     }

//     onLoginComplete = (loggedInUserObj) => {
//         this.props.loginProp(loggedInUserObj)
//         console.log(this.props)
//     }

//     login = async () => {
//         // Call Login API to get user ID if the user exists in DB
//         try {
//             let loginResult = await API.logIn(this.state.username)
//             this.onLoginComplete(loginResult.data)
//         } catch (error) {
//             let element = document.querySelector(".incorrect-user")
//             element.innerText = "Some Error Occurred."
//         }
//     }

//     handleUser = e => {
//         this.setState({ username: e.target.value })
//     }
//     render() {
//         return (
//             <div className="bg-gray-900">
//                 <div className="login container mx-auto w-full max-w-xs items-center pt-12 h-screen">
//                     <form action="chat.html" method="GET" className="bg-white shadow-md rounded px-8 pt-8 pb-8 m-4">
//                         <label className="block text-lg font-bold mb-4 py-2 text-center bg-gray-800 rounded text-white">Login</label>
//                         <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-bold mb-2">
//                                 Username</label>
//                             <label className="incorrect-user text-red-500"></label>
//                             <input value={this.state.username} onChange={(e) => this.handleUser(e)}
//                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 id="username" type="text" placeholder="Enter Username here..." />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-bold mb-2">
//                                 Password</label>
//                             <label className="incorrect-user text-red-500"></label>
//                             <input value={this.state.username} onChange={(e) => this.handleUser(e)}
//                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 id="username" type="text" placeholder="Enter Username here..." />
//                         </div>
//                         <button id="login" onClick={() => this.login()}
//                             className="btn-primary rounded-full text-white font-bold py-2 px-4 mx-16 rounded focus:outline-none focus:shadow-outline place-self-center"
//                             type="button">
//                             Login</button>
//                             <Link  tag="a" to="/Register" action>new user register hear...</Link>
//                     </form>
                    
//                 </div>
//             </div>
//         )
//     }
// }