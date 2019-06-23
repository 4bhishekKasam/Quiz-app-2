import React, { Component } from "react";
import { Container, Segment, Label, Header, Button } from "semantic-ui-react";

export default class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userScore: Number(
        ((props.correctAnswers * 100) / props.totalQuestions).toFixed(2)
      )
    };
    this.timeConverter = this.timeConverter.bind(this);
  }

  timeConverter(value) {
    const hours = ("0" + Math.floor((value / 3600000) % 60)).slice(-2);
    const minutes = ("0" + Math.floor((value / 60000) % 60)).slice(-2);
    const seconds = ("0" + (Math.floor((value / 1000) % 60) % 60)).slice(-2);
    // console.log(hours, minutes, seconds);

    return {
      hours,
      minutes,
      seconds
    };
  }

  render() {
    const { userScore } = this.state;
    const {
      correctAnswers,
      totalQuestions,
      backToHome,
      takenTime,
      retakeQuiz
    } = this.props;

    return (
      <div>
        <Container>
          <Segment raised>
            <Label attached="top" size="huge">
              Result
            </Label>
            <br />
            <br />
          </Segment>
        </Container>
      </div>
    );
  }
}
