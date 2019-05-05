import React, { Component } from 'react';
import axios from 'axios';

export default class Home extends Component {
  state = {
    todos: []
  }

  getTodos = () => {
    axios({
      type: 'get',
      url: 'https://ancient-anchorage-15013.herokuapp.com/tasks'
    }).then((res) => {
      console.log(res);
      this.setState({
        todos: res.data
      })
    })
  }

  componentDidMount() {
    this.getTodos();
  }

  render() {

    console.log(this.state.todos)
    let todoComponents = this.state.todos.map((todo) => {
      return (
        <h1>{todo.name}</h1>
      )
    })

    return (
      <div>
        {todoComponents}
      </div>
    )
  }
}
