import React, { Component } from "react";
import {
  Container,
  Segment,
  Item,
  Divider,
  Button,
  Icon,
  Message,
  Menu,
  Header
} from "semantic-ui-react";
import Swal from "sweetalert2";

export default class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizData: null,
      questionIndex: 0,
      isLoading: true,
      quizIsCompleted: false,
      isOffline: false
    };
    this.resolveError = this.resolveError.bind(this);
    this.setData = this.setData.bind(this);
    this.getRandomNumber = this.getRandomNumber.bind(this);
  }

  componentDidMount() {
    const { API } = this.props;
    fetch(API)
      .then(res => res.json())
      .then(res => setTimeout(() => this.setData(res.results), 1000))
      .catch(error => setTimeout(() => this.resolveError(error), 1000));
  }

  setData(results) {
    //  console.log(results);

    if (results.length === 0) {
      const message =
        "The API doesn't have enough questions for your query<br />" +
        "(ex. Asking for 50 questions in a category that only has 20)." +
        "<br /><br />Please change number of questions, difficulty level " +
        "or type of questions.";

      return Swal.fire({
        title: "Oops...",
        html: message,
        type: "error",
        timer: 5000
        //  onClose: () => {
        //     this.props.backToHome();
        //   }
      });
    }

    const quizData = results;
    const { questionIndex } = this.state;
    const num = this.getRandomNumber();
    const options = [...quizData[questionIndex].incorrect_answers];
    options.splice(num, 0, quizData[questionIndex].correct_answer);

    this.setState({ options, quizData, isLoading: false, num });
  }

  getRandomNumber() {
    const min = Math.ceil(0);
    const max = Math.floor(3);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  resolveError(error) {
    if (!navigator.onLine) {
      // console.log('Connection problem');
      this.setState({ isOffline: true });
    } else {
      // console.log('API problem ==> ', error);
      this.setState({ isOffline: true });
    }
  }

  render() {
    const { isLoading, isOffline, quizIsCompleted, quizData } = this.state;

    return (
      <Item.Header>
        {!isOffline && !quizIsCompleted && isLoading && <Loader />}
      </Item.Header>
    );
  }
}
