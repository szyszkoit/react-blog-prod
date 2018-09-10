import React, { Component } from 'react';
import { render } from 'react-dom';
import Header from "./components/Header";

class App extends React.Component {

  constructor() {
    super();
    this.state = {
        posts: []
    }
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
        render() {
          return (
            <Header posts={this.state.posts}/>
          )
        }
}
render(<App/>, document.getElementById('app'));
// render((
//     <Router history={browserHistory}>
//         <Route component={App} path="app">
//             <IndexRoute component={Home}/>
//             <Route path="/" component={Home}/>
//             <Route path="/cars" component={Car} data={data}/>
//             <Route path="/cars/:id" component={CarDetails} data={data}/>
//             <Route path="/about" component={About}/>
//             <Route path="/login" component={Login} />
//         </Route>
//     </Router>
// ),document.getElementById('app'));


