//./components/About.js
import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Link} from "react-router-dom";
import AdminPosts from './AdminPosts';
import AddPost from './AddPost';
import EditPost from './EditPost';
import {
  Grid,
  Row,
  Col,
  Nav,
  NavItem,
} from 'react-bootstrap';
class Admin extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        };
        this.deletePost = this.deletePost.bind(this);
    }


    componentDidMount(){
        {
            var self = this;
            $.ajax({
                type: 'POST',
                url: getPosts,
                // data: {
                //   _username: data.get('username'),
                //   _password: data.get('password')
                // },
                success: function (data) {
                    //console.log(JSON.parse(data));
                    self.setState({
                        posts: JSON.parse(data)
                    })
                },
                error: function (error) {
                    // console.log(error);
                    if (error.responseJSON) {
                        console.log(error.responseJSON);
                    }
                }
            });
        }
    }

    deletePost(id) {
        var array = this.state.posts;
        for(var i=0; i < array.length; i++) {
            if(array[i].id == id)
            {
                array.splice(i,1);
            }
        }

        this.setState({array});
    };
  render(){
      const MyEditPostPage = (props) => {
          return (
              <EditPost
                  posts={this.props.posts}
                  {...props}
              />
          );
      };
    const MyAdminPostsPage = (props) => {
      return (
        <AdminPosts
          posts={this.state.posts}
          deletePost={this.deletePost}
          {...props}
        />
      );
    };
    return(
      <Router>
        <Grid>
          <Row>
            <Col sm={12}>
              <Nav>
                  <Link to="/admin/posts">
                    <NavItem eventKey={1} href="#">
                      Posts
                    </NavItem>
                  </Link>
              </Nav>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Route path="/admin/posts" component={MyAdminPostsPage}/>
              <Route path="/admin/add-post" component={AddPost}/>
              <Route path="/admin/edit-post/:slug" component={MyEditPostPage}/>
            </Col>
          </Row>
          {/*<PrivateRoute path="/protected" component={Protected} />*/}
        </Grid>
      </Router>
    )
  }
}

export default Admin