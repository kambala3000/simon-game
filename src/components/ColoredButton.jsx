import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class ColoredButton extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    activeColor: PropTypes.string,
    bgColor: PropTypes.string.isRequired,
    pressedColor: PropTypes.string.isRequired
  };

  state = {
    isClicked: false
  };

  handleMouseDown = () => {
    this.setState({ isClicked: true });
  };

  handleMouseUp = () => {
    this.setState({ isClicked: false });
  };

  render() {
    const { isClicked } = this.state;
    const { type, activeColor, bgColor, pressedColor } = this.props;
    const isActive = activeColor === type;
    const isPressed = isActive || isClicked;

    return (
      <SCButton
        bgColor={bgColor}
        pressedColor={pressedColor}
        isPressed={isPressed}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      />
    );
  }
}

const SCButton = styled.button`
  width: 300px;
  height: 300px;
  border: none;
  outline: none;
  background-color: ${({ bgColor, pressedColor, isPressed }) =>
    isPressed ? pressedColor : bgColor};
  cursor: pointer;
  border: 1px solid #212121;
`;

export default ColoredButton;
