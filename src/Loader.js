import React from "react";
import { Container, Message, Icon } from "semantic-ui-react";

const Loader = props => (
  <Container>
    <Message icon size="big">
      <Icon name="circle notched" loading />
      <Message.Content>
        <Message.Header>Just one second</Message.Header>
        {props.text || "We are fetching that content for you."}
      </Message.Content>
    </Message>
  </Container>
);

export default Loader;
