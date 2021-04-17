import React, { Component } from 'react'
import Login from './components/login/login'
import ChatWindow from "./components/chatWindow/chatWindow";
import { createSignalProtocolManager, SignalServerStore } from "./signal/SignalGateway"
import Register from './components/Register/Register'
import Otpverify from './components/Register/Otpverify'
import Endtoendchatwindow from './components/Endtoend/Endtoendchatwindow'
import RegisterE2ee from './components/E2ee/Register'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import './App.css';
export default class ChatApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      loggedInUserObj: {},
      dummySignalServer: new SignalServerStore(),
      signalProtocolManagerUser: undefined
    }
    this.setLoggedinUser = this.setLoggedinUser.bind(this)
  }

  setLoggedinUser(loggedInUserObj) {
    this.setState({ isLoggedIn: true, loggedInUserObj: { ...loggedInUserObj } }, () => {
      // Initializing signal server here
      // createSignalProtocolManager(loggedInUserObj._id, loggedInUserObj.name, this.state.dummySignalServer)
      //   .then(signalProtocolManagerUser => {
      //     this.setState({ signalProtocolManagerUser: signalProtocolManagerUser })
      //   })
    })
  }
  
  render() {
    
    return (
      <Router>
           <Route path="/Register" component={Register} exact/>
           <Route path="/RegisterE2ee" component={RegisterE2ee} exact/>
           <Route path="/Login" component={Login}  exact/>
           <Route path="/Otpverify" component={Otpverify} exact/>
           <Route path="/ChatWindow" component={ChatWindow} exact/>
           <Route path="/e2ee/chatwindow" component={Endtoendchatwindow} exact/>
      <div className="App">
        {/* { !this.state.isLoggedIn && <Login setLoggedinUser={this.setLoggedinUser} />} */}

        {/* { this.state.isLoggedIn && <ChatWindow
          loggedInUserObj={this.state.loggedInUserObj}
          signalProtocolManagerUser={this.state.signalProtocolManagerUser}
        />} */}
      </div>
      </Router>
    )
      
   
  }
}
