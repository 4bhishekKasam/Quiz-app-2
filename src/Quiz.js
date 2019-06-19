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
import Loader from "./Loader";
import Countdown from "./Countdown";

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
    const {
      isLoading,
      isOffline,
      quizIsCompleted,
      quizData,
      questionIndex
    } = this.state;

    return (
      <Item.Header>
        {!isOffline && !quizIsCompleted && isLoading && <Loader />}
        {!isOffline && !isLoading && (
          <Container>
            <Segment raised>
              <Item.Group divided>
                <Item>
                  <Item.Content>
                    <Item.Extra>
                      <Header as="h1" block floated="left">
                        <Icon name="info circle" />
                        <Header.Content>
                          {`Question No.${questionIndex + 1} of ${
                            quizData.length
                          }`}
                        </Header.Content>
                      </Header>
                      <Countdown countdownTime={this.props.countdownTime} />
                    </Item.Extra>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Segment>
          </Container>
        )}
      </Item.Header>
    );
  }
}
