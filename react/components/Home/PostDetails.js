// ./src/car/car-detail.component.jsx
import React, { Component, PureComponent } from 'react';
import {Link} from 'react-router-dom';
import AddCommentForm from '../Comments/AddCommentForm';
import CommentList from "../Comments/CommentList";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col
} from 'react-bootstrap';
class PostDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            post: []
        };
        this.commentsHandler = this.commentsHandler.bind(this);
    }
    componentDidMount() {

      if(this.props.posts.length > 0) {
        var comments = [];
        var self = this;
        $.ajax({
          type: 'POST',
          url: '/getpostcomments',
          data: {
            _postID: self.state.post[0].id,
          },
          success: function (data) {
            self.setState({
              comments: JSON.parse(data)
            });
            // return JSON.parse(data);
          },
          error: function (error) {
            if (error.responseJSON) {
              console.log(error.responseJSON);
            }
          }
        });
      }
    };
    componentWillMount() {
      if(this.props.posts.length > 0) {
        var parts = window.location.href.split('/');
        var answer = parts[parts.length - 1];

        const posts = this.props.posts;
        // Car Id from param
        const slug = answer;
        // Filter car with ID
        var post = posts.filter(post => {
          if (post.slug == slug) {
            return post;
          }
        });
        this.setState({
          post: post
        })
      }
    };
    commentsHandler(username, text) {
      console.log(this.state);
      console.log(username);
      var comment = {comment: text, userLogin: username}
      this.setState({ comments: [...this.state.comments, comment] })
    };

    render(){

        if(this.props.posts.length == 0){
            return(
                <div></div>
            );
        }else {
            return (

                <div>
                    <h1>{this.state.post[0].title}</h1>
                    <Row>
                        <Col sm={6} md={4}>
                            <div className="thumbnail">
                                <img src={this.state.post[0].image} alt={this.state.post[0].title}/>
                            </div>
                        </Col>
                      <Col sm={6} md={4}>
                        {this.state.post[0].body}
                      </Col>
                    </Row>
                    <Row className="commentListRow">
                      <Col sm={8}>
                        <h3>Komentarze</h3>
                      </Col>
                        <CommentList comments={this.state.comments}/>
                    </Row>
                    <Row className="addCommentRow">
                        <AddCommentForm postID={this.state.post[0].id} commentsHandler = {this.commentsHandler}/>
                    </Row>
                    <Row>
                      <Col sm={8}>
                          <Link to="/">
                              <button className="btn btn-default">Wróć</button>
                          </Link>

                      </Col>
                    </Row>
                </div>

            )
        }
    }
}

export default PostDetails