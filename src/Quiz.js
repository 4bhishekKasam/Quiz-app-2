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
import he from "he";
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
      isOffline: false,
      userSelectedAns: null
    };
    this.resolveError = this.resolveError.bind(this);
    this.setData = this.setData.bind(this);
    this.timesUp = this.timesUp.bind(this);
    this.timeAmount = this.timeAmount.bind(this);
    this.getRandomNumber = this.getRandomNumber.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleNext = this.handleNext.bind(this);
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
        timer: 5000,
        onClose: () => {
          this.props.backToHome();
        }
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

  timesUp() {
    this.setState({
      userSlectedAns: null,
      isLoading: true,
      quizIsCompleted: true,
      questionIndex: 0,
      options: null
    });
  }

  timeAmount(timerTime, totalTime) {
    this.takenTime = {
      timerTime,
      totalTime
    };
  }

  handleItemClick(e, { name }) {
    this.setState({ userSlectedAns: name });
  }

  handleNext() {
    const {
      userSlectedAns,
      quizData,
      questionIndex,
      correctAnswers
    } = this.state;

    
  }

  render() {
    const {
      isLoading,
      isOffline,
      quizIsCompleted,
      quizData,
      questionIndex,
      options,
      userSlectedAns
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
                      <Countdown
                        countdownTime={this.props.countdownTime}
                        timesUp={this.timesUp}
                        timeAmount={this.timeAmount}
                      />
                    </Item.Extra>
                    <br />
                    <Item.Meta>
                      <Message size="huge" floating>
                        <b>{`Q. ${he.decode(
                          quizData[questionIndex].question
                        )}`}</b>
                      </Message>
                      <br />
                      <Item.Description>
                        <h3>Please choose one of the following answers:</h3>
                      </Item.Description>
                      <Divider />
                      <Menu vertical fluid size="massive">
                        {options.map((item, index) => {
                          let letter;
                          switch (index) {
                            case 0:
                              letter = "A.";
                              break;
                            case 1:
                              letter = "B.";
                              break;
                            case 0:
                              letter = "C.";
                              break;
                            case 1:
                              letter = "D.";
                              break;
                            default:
                              letter = index;
                              break;
                          }
                          return (
                            <Menu.Item
                              key={item}
                              name={item}
                              active={userSlectedAns === item}
                              onClick={this.handleItemClick}
                            >
                              <b style={{ marginRight: "8px" }}>{letter}</b>
                              {he.decode(item)}
                            </Menu.Item>
                          );
                        })}
                      </Menu>
                    </Item.Meta>
                    <Divider />
                    <Item.Extra>
                      {" "}
                      {!userSlectedAns && (
                        <Button
                          primary
                          content="Next"
                          floated="right"
                          disabled
                          size="big"
                          icon="right chevron"
                          labelPosition="right"
                        />
                      )}
                      {userSlectedAns && (
                        <Button
                          primary
                          content="Next"
                          onClick={this.handleNext}
                          floated="right"
                          size="big"
                          icon="right chevron"
                          labelPosition="right"
                        />
                      )}
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
