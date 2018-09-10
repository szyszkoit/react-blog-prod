// ./components/Home.jsx
import React, { Component } from 'react';
import {
  Grid,
  Button,
  Row,
  Col,
  Panel,
  Form,
  FormControl,
  ControlLabel,
  Navbar,
  Nav,
  NavItem,
  MenuItem,
  NavDropdown
} from 'react-bootstrap';
// import {withRouter} from "react-router-dom";
// import fakeAuth from './Common/fakeAuth';



class Login extends Component {
    constructor() {
        super();
        this.state = {
            redirectToReferrer: false
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.userLogged = this.userLogged.bind(this);
    }




    userLogged(event){
      this.props.onLogin(event)
    }

    handleLogin(event) {
        //event.preventDefault();
        const self = this;
        const data = new FormData(event.target);
        $.ajax({
            type: 'POST',
            url: loginPath,
            data: {
                _username: data.get('username'),
                _password: data.get('password')
            },
            success: function(data){
                console.log(data);
                sessionStorage.setItem('api_token', data);
                self.userLogged(true);
            },
            error: function(error){
               // console.log(error);
              if(error.responseJSON) {
                console.log(error.responseJSON);
              }
            }
        });

    };

    render() {
        return (
              <Row>
                <Col sm={3}></Col>
                <Col sm={6}>
              <Panel>
                <Panel.Heading>Zaloguj się</Panel.Heading>
                <Panel.Body>
                  <Form onSubmit={e => {
                    e.preventDefault();
                    this.handleLogin(e);}}
                  >
                    <ControlLabel>Login</ControlLabel>
                    <FormControl
                      id="username"
                      name="username"
                      type="text"
                      placeholder=""
                    />
                    <ControlLabel>Hasło</ControlLabel>
                    <FormControl
                      id="password"
                      name="password"
                      type="password"
                      placeholder=""
                    />
                    <Col className="text-center" xs={12}>
                      <Button type="submit">Zaloguj</Button>
                    </Col>
                  </Form>

                </Panel.Body>
              </Panel>
                  </Col>
                <Col sm={3}></Col>
              </Row>
        );
    }
}

 export default Login