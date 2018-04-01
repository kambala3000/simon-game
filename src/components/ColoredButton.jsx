import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class ColoredButton extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    activeColor: PropTypes.string,
    bgColor: PropTypes.string.isRequired,
    pressedColor: PropTypes.string.isRequired,
    colorsSequence: PropTypes.array.isRequired,
    isPlayingSequence: PropTypes.bool.isRequired,
    userInputIndex: PropTypes.number,
    isSequenceFailed: PropTypes.bool.isRequired,
    initRound: PropTypes.func.isRequired,
    failGame: PropTypes.func.isRequired,
    writeInputIndex: PropTypes.func.isRequired
  };

  state = {
    isClicked: false
  };

  handleMouseDown = () => {
    this.setState({ isClicked: true });
  };

  handleMouseUp = () => {
    const {
      type,
      colorsSequence,
      userInputIndex,
      initRound,
      failGame,
      writeInputIndex
    } = this.props;

    this.setState({ isClicked: false });

    if (colorsSequence.length === 0) return;

    const isLastInSequence = userInputIndex + 1 === colorsSequence.length;
    const isCorrectUserInput = colorsSequence[userInputIndex] === type;

    if (isLastInSequence && isCorrectUserInput) return initRound();

    if (isCorrectUserInput) {
      return writeInputIndex(userInputIndex + 1);
    } else {
      return failGame();
    }
  };

  render() {
    const { isClicked } = this.state;
    const {
      type,
      activeColor,
      bgColor,
      pressedColor,
      isPlayingSequence,
      isSequenceFailed
    } = this.props;
    const isActive = activeColor === type;
    const isPressed = isActive || isClicked;
    const disableButton = isPlayingSequence || isSequenceFailed;

    return (
      <SCButton
        bgColor={bgColor}
        pressedColor={pressedColor}
        isPressed={isPressed}
        disabled={disableButton}
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
