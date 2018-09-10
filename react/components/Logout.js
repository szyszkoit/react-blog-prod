// ./components/Home.jsx
import React, { Component } from 'react';

// import {withRouter} from "react-router-dom";
// import fakeAuth from './Common/fakeAuth';



class Login extends Component {
  constructor() {
    super();
    this.state = {
      redirectToReferrer: false
    };
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin(event) {
    event.preventDefault();
    const self = this;
    const data = new FormData(event.target);
    $.ajax({
      type: 'POST',
      url: setData,
      dataType:'json',
      data: {
        _username: data.get('username'),
        _password: data.get('password')
      },
      success: function(data){
        console.log(data);
        console.log(data.errors)
      },
      error: function(error){
        console.log(error);
      }
    });

  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <form onSubmit={this.handleLogin}>
          <label htmlFor="username">Enter username</label>
          <input id="username" name="username" type="text" />
          <label htmlFor="password">Enter your password</label>
          <input id="password" name="password" type="password" />
          <button type="submit">Log in</button>
        </form>
      </div>
    );
  }
}

export default Login