import React, { Component } from 'react'

export default class LogIn extends Component {

  render() {
    return (
      <div>
        Log In
        <form>
          <input name="email" placeholder="Email" onChange={this.props.handleInput} />
          <input type="password" name="password" placeholder="Password" onChange={this.props.handleInput} />
          <button name="login" onClick={this.props.handleLogin}>Submit</button>
        </form>
      </div>
    )
  }
}
