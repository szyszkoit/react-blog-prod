// ./components/Home.jsx
import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {
    Table,
    Grid,
    Row,
    Col
} from "react-bootstrap";
import EditPost from "./EditPost";


class AdminPosts extends Component {
  constructor() {
    super();
    this.deletePost = this.deletePost.bind(this);
  }
  deletePost(id) {
    const self = this;
    $.ajax({
      type: 'POST',
      url: '/deletepost',
      data: {
        _postId: id,
      },
      success: function(data){
          console.log(data);
        self.props.deletePost(id);
      },
      error: function(error){
        // console.log(error);
        if(error.responseJSON) {
          console.log(error.responseJSON);
        }
      }
    });
  }

  render(){

    // Get data from route props
    const posts = this.props.posts;
    console.log(posts);

    const postNode = posts.map((post) => {
      return (
        <tr>
          <td>{post.id}</td>
          <td>{post.title}</td>
          <td>
              <Link
                  to={"/admin/edit-post/"+post.slug}
                    key={post.slug}
              >
                <button className="btn btn-info">Edit</button>
              </Link>
            <span></span>
            <button className="btn btn-danger" onClick={() => { this.deletePost(post.id) }}>x</button></td>
        </tr>
      )
    });

    return (
        <Grid>
          <Row>
              <Col xs={12}>
                <Link to="/admin/add-post" >
                    <button className="btn btn-default">Add post</button>
                </Link>
              </Col>
          </Row>
            <Row>
                <Col xs={12}>
                  <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {postNode}
                    </tbody>
                  </Table>
                </Col>
            </Row>
        </Grid>
    );
  }
}

export default AdminPosts;