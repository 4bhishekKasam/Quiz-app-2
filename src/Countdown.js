import React, { Component } from "react";
import { Button, Popup } from "semantic-ui-react";
import Swal from "sweetalert2";

export default class Countdown extends Component {
  constructor(props) {
    super(props);

    const countdownTime = props.countdownTime * 60000;

    this.state = {
      timerStart: 0,
      timerTime: countdownTime,
      totalTime: countdownTime
    };
  }

  render() {
    return <div>jjsdkfdksk</div>;
  }
}
