import Login from './Login';
import Home from "./Home/Home";
import Admin from "./Admin/Admin";
import About from "./About/About";
import Contact from "./Contact/Contact";
import PostDetails from "./Home/PostDetails";
import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Redirect, Route, Link} from "react-router-dom";
import {
  Grid,
  Button,
  Row,
  Col,
  Navbar,
  Nav,
  NavItem,
  MenuItem,
  NavDropdown
} from 'react-bootstrap';
import AdminPosts from './Admin/AdminPosts'
class Header extends Component {
  constructor(){
    super();
    this.state = {
      authenticated: sessionStorage.getItem('api_token')? true : false

    };
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  };

  onLogin (loginStatus){
    this.setState({authenticated: loginStatus});
    window.location.href="/";
  }
  onLogout (){
    sessionStorage.removeItem('api_token');
    this.setState({authenticated: false});
    window.location.href="/logout";
  }
  render(){

    const MyPostPage = (props) => {
      return (
        <PostDetails
          posts={this.props.posts}
          {...props}
        />
      );
    };
    const MyAdminPage = (props) => {
      return (
        <Admin
          posts={this.props.posts}
          {...props}
        />
      );
    };
    const MyLoginPage = (props) => {
      return (
        <Login
          onLogin={this.onLogin}
          {...props}
        />
      );
    };
    return(
    <Router>
      <Grid>
        <Row>
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">Brand</Link>
              </Navbar.Brand>
              <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="#">
                  <Link to="/about">About</Link>
                </NavItem>
                <NavItem eventKey={2} href="#">
                  <Link to="/contact">Contact</Link>
                </NavItem>
              </Nav>
              <Nav pullRight>
                <NavItem eventKey={1} href="#">
                  <Link to="/admin">Admin</Link>
                </NavItem>
                <NavItem eventKey={2} href="#">
                  {this.state.authenticated ? <Link to="/logout" onClick={this.onLogout}>Logout</Link> : <Link to="/login">Login</Link>}
                  {/*<Link to="/login">Login</Link>*/}
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Row>
        <Route exact path="/" render={() => (
          <Home posts={this.props.posts}/>
        )}/>
        <Route path="/post/:slug" component={MyPostPage}/>
        <Route path="/about" component={About}/>
        <Route path="/login" component={MyLoginPage}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/admin" component={MyAdminPage}/>
        {/*<PrivateRoute path="/protected" component={Protected} />*/}
      </Grid>
    </Router>
    )
  }
}
export default Header;