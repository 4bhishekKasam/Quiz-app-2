import React, { Component, Fragment } from "react";
import { PATH_BASE, AMOUNT, CATEGORY, DIFFICULTY, TYPE } from "./types";
import "./App.css";
import Header from "./Header";
import Main from "./Main";
import Quiz from "./Quiz";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isQuizStart: false,
      API: null,
      countdownTime: null,
      isLoading: false
    };
    this.startQuiz = this.startQuiz.bind(this);
  }

  startQuiz(selectedValues) {
    // console.log(selectedValues);

    const API = `${PATH_BASE + AMOUNT + selectedValues[1]}&${CATEGORY +
      selectedValues[0]}&${DIFFICULTY + selectedValues[2]}&${TYPE +
      selectedValues[3]}`;

    this.setState(
      { isQuizStart: true, API, countdownTime: selectedValues[4] }
      // , () => console.log(this.state)
    );
  }

  render() {
    const { isQuizStart, API, countdownTime, isLoading } = this.state;

    return (
      <Fragment>
        <Header />
        {!isQuizStart && !isLoading && <Main startQuiz={this.startQuiz} />}
        {isQuizStart && !isLoading && <Quiz API={API} />}
      </Fragment>
    );
  }
}

export default App;
