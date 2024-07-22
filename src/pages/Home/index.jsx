import React, { Component } from 'react'
import './index.less'
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hello: "hello world"
    }
  }
  componentDidMount() {
    console.log("hello world ")
  }
  render() {
    return <div></div>
  }
}

export default Home