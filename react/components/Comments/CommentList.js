// ./components/Home.jsx
import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {
    ListGroup,
    ListGroupItem,
    Row,
    Col
} from 'react-bootstrap';

class CommentList extends Component {
    render(){
        if(this.props.comments.length == 0){
          return(
            <Col sm={8}>
              <p>Brak komentarzy</p>
            </Col>
          )
        }else {
          const comments = this.props.comments;
          //Map through cars and return linked cars
          const commentNode = comments.map((comment) => {
            return (

                  <ListGroup>
                    <ListGroupItem header={comment.userLogin}>{comment.comment}</ListGroupItem>
                  </ListGroup>

            );
          });
          return (
            <Col sm={8}>
              {commentNode}
            </Col>
          );
        }
    }
}

export default CommentList;