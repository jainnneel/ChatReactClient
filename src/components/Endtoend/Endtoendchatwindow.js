import React, { useState,useEffect } from 'react';
import axios from 'axios'
import SockJsClient from "react-stomp"
import { createSignalProtocolManager, SignalServerStore } from "../../signal/SignalGateway"
import Messageboxe2ee from './Messageboxe2ee'
import ContactlistE2ee from  './ContactlistE2ee'
const Endtoendchatwindow = (props) => {

    const [users,setusers] = useState(props.location.state.users); 
    const [messageToUser,setmessageToUser] = useState(true);
    const [chats,setchats] = useState({}); 
    const [clientConnected,setclientConnected] = useState({}); 
    const [dummySignalServer,setdummySignalServer] = useState(new SignalServerStore()); 
    const [signalProtocolManagerUser,setsignalProtocolManagerUser] = useState(undefined);
    const [clientRef,setclientRef] = useState(undefined); 
    const [current , setCurrent] = useState(props.location.state.user)

    useEffect(()=>{
        // Initializing signal server here
        console.log(window.libsignal)
       createSignalProtocolManager(current.id, current.mobile, dummySignalServer)
           .then(signalProtocolManagerUser1 => {
            setsignalProtocolManagerUser(signalProtocolManagerUser1)
           })
          
   },[]);
    
    const sendMessage1 = async (msg) => {
        let data = {
            fromLogin: current.mobile,
            message: msg.message,
            date:msg.date,
            chatId:Date.now()*6747,
            toUser:messageToUser.mobile,

        }
        try{
            debugger
            let encryptedMessage = await signalProtocolManagerUser.encryptMessageAsync(messageToUser.id, data.message);
            data.message =  encryptedMessage;
        }catch(err){
            console.log(err);
        }
        clientRef.sendMessage("/app/chat/etoee/"+messageToUser.mobile, JSON.stringify(data));

    }

    const getSelectedUser = (user) => {
        setmessageToUser(user)
    }

    const setmessages = () => {

    }

    const onMessageReceive = (msg) => {
        console.log(msg)
    }


    return(
        <>
        <div className="container flex mx-auto m-2 rounded h-screen bg-white border border-blue-800 bg-gray-100">
                {<ContactlistE2ee
                    users={users}
                    selectedUser={getSelectedUser}
                    chats={chats}
                    curuser={current}
                />}
                
                {messageToUser && <Messageboxe2ee
                    selectedUser={messageToUser}
                    // loggedInUserDP={props.location.state.data.img}
                    setNewMsgObj={sendMessage1}
                    messages={chats}
                    setmessages = {setmessages}
                    curuser={current}
                />}
               <SockJsClient url="http://localhost:8081/chat" topics={["/topic/e2eemessages/"+current.mobile]}
                    onMessage={ onMessageReceive } 
                    ref={ (client) => {     
                        setclientRef(client) 
                    }  
                    }
                    onConnect={ () => { console.log("connected")} }
                    onDisconnect={ () => { console.log("disconnected") } }
                    debug={ false }/>
                    
            </div>


        </>

    )

}
export default Endtoendchatwindow;