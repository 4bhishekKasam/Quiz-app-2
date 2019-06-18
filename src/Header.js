import React from "react";
import { Menu } from "semantic-ui-react";

export default function Header() {
  return (
    <Menu stackable inverted size="massive">
      <Menu.Item>
        <h1
          style={{
            color: "#cecece",
            cursor: "pointer"
          }}
        >
          The QuizApp
        </h1>
      </Menu.Item>
    </Menu>
  );
}
