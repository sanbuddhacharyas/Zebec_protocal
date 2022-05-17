import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [radiovalue, setRadiovalue]   = useState('Trans: Not selected');
  const [connectWallet, setConnectWallet] = useState('Not Connected');

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
    date: "invalid date"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass, date } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);
    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } 
      else {
        if (date.value !== '2054'){
          setErrorMessages({ name: "date", message: errors.date });
        }

        else {
        setIsSubmitted(true);
      }
      }
      
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const handleChange = e => {
    // this.setState({radio_value:e.target.value})
    // alert("Selected radio value is :"+e.target.value)
    // console.log(e.target.value)
    setRadiovalue(e.target.value)
    
  };

  function ConnectWallet(e){
    // console.log(e.target.value)
    setConnectWallet('Connected')
    
  }
  // JSX code for login form
  const renderForm = (
    <div className="form">
      <div className="button-container">
          <input type="button"  value='Connect Wallet' onClick={ConnectWallet}/>
      </div>

        <h1>
        {connectWallet}
        </h1>

      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Receiver-key </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>

        <div className="input-container">
          <label>Amount ($) </label>
          <input type="text" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        
        <div onChange={handleChange}>
          <input type="radio" value = "Transfer"  name='transaction' /> Transfer
          <input type="radio" value = "Withdraw"  name='transaction' /> Withdraw
        </div>

        <div className="button-container">
          <input type="submit"  value='Send'/>
        </div>

        <h1>
        {radiovalue}
        </h1>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Zebec Protocal</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default App;