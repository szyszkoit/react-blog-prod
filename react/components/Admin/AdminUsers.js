// ./components/Home.jsx
import React, { Component } from 'react';
import {Link} from "react-router-dom";

class AdminUsers extends Component {
  render(){
    return (
      <div>
        <h1>Admin users page</h1>
        <div className="post-container">
          Users
        </div>
      </div>
    );
  }
}

export default AdminUsers;