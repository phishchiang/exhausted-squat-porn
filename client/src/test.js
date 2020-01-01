import React, { Component } from "react";

export default class test extends Component {
  state = {
    object: "testtttt"
  };
  render() {
    const a = 1;
    const b = 0;

    return (
      <div>
        <h1 object={this.state.object}>{this.props.children}</h1>
      </div>
    );
  }
}
