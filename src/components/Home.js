import React, { Component } from 'react';
import axios from 'axios';
import SignUp from './SignUp';
import LogIn from './LogIn';

export default class Home extends Component {

  state = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    isLoggedIn: "",
    user: "",
    todos: []
  }

  componentDidMount() {
    if (localStorage.token) {
      axios({
        method: "get",
        url: `https://cors-anywhere.herokuapp.com/https://ancient-anchorage-15013.herokuapp.com/users/`,
        headers: { authorization: `Bearer ${localStorage.token}` }
      })
        .then(response => {
          console.log('App successfully recieves a response', response)
          this.setState({
            isLoggedIn: true,
            user: response.data
          });
        })
        .catch(err => console.log(err))
      this.getTodos();
    } else {
      this.setState({
        isLoggedIn: false
      })
    }
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  getTodos = () => {
    axios({
      type: 'get',
      url: 'https://cors-anywhere.herokuapp.com/https://ancient-anchorage-15013.herokuapp.com/tasks'
    }).then((res) => {
      console.log(res);
      this.setState({
        todos: res.data
      })
    })
  }

  handleLogin = event => {
    event.preventDefault();
    axios
      .post("https://cors-anywhere.herokuapp.com/https://ancient-anchorage-15013.herokuapp.com/users/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        let user = res.data.user
        localStorage.token = res.data.signedJwt;
        this.setState({
          isLoggedIn: true,
          redirect: true,
          user
        });
        console.log(this.state.user);
      })
      .catch(err => console.log(err));
  };

  handleSignUp = event => {
    event.preventDefault();
    axios
      .post("https://cors-anywhere.herokuapp.com/https://ancient-anchorage-15013.herokuapp.com/users/signup", {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        redirect: true,
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        localStorage.token = response.data.signedJwt;

        this.setState({
          isLoggedIn: true,
          user: response.data.user
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    let todoComponents = this.state.todos.map((todo) => {
      return (
        <h1>{todo.name}</h1>
      )
    })
    if (this.state.isLoggedIn) {
      return (
        <div>
          {todoComponents}
        </div>
      )
    } else {
      return (
        <div>
          <SignUp
            handleInput={this.handleInput}
            handleSignUp={this.handleSignUp}
          />
          <LogIn
            handleInput={this.handleInput}
            handleLogin={this.handleLogin}
          />
        </div>
      )
    }
  }
}
