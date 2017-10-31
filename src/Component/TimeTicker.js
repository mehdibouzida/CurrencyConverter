import React, { Component } from 'react';


class TimeTicker extends React.Component {
  constructor() {
    super();
    this.state = {
      date: new Date().toLocaleTimeString()
    }
    //this.tick = this.tick.bind(this); //Dont need to bind if arrow function is used.
  }
  componentDidMount() {
    //this.timer = setInterval(this.tick, 1000);
    this.timer = setInterval(()=>this.tick(), 1000);

  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  tick() {
    this.setState({
          date: new Date().toLocaleTimeString()
        });
  }
  render () {
    return(
      <span>{this.state.date}</span>
    )
  }
}


export default TimeTicker;
