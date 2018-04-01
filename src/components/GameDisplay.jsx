import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

// components
import ColoredButton from './ColoredButton';

// store
import {
  turnGameOff,
  addColorToSequence,
  changePlayingStatus,
  setActiveColor,
  failGame,
  writeInputIndex
} from '../store/actions';

// constants
import { DEFAULT_COLORS, DIFFICULTY_LEVELS_TIMING } from '../utils/constants';

class GameDisplay extends Component {
  static propTypes = {
    colorsSequence: PropTypes.array.isRequired,
    isSequenceFailed: PropTypes.bool.isRequired,
    difficulty: PropTypes.string.isRequired,
    activeColor: PropTypes.string,
    isPlayingSequence: PropTypes.bool.isRequired,
    userInputIndex: PropTypes.number,
    turnGameOff: PropTypes.func.isRequired,
    addColorToSequence: PropTypes.func.isRequired,
    changePlayingStatus: PropTypes.func.isRequired,
    setActiveColor: PropTypes.func.isRequired,
    failGame: PropTypes.func.isRequired,
    writeInputIndex: PropTypes.func.isRequired
  };

  timerId = null;

  handleGameStatus = () => {
    const { colorsSequence, isSequenceFailed, turnGameOff } = this.props;
    const isGameInProcess = colorsSequence.length > 0;
    clearTimeout(this.timerId);

    if (isSequenceFailed) {
      turnGameOff();
      this.initRound();

      return;
    }

    if (isGameInProcess) {
      turnGameOff();
    } else {
      this.initRound();
    }
  };

  initRound = async () => {
    const { addColorToSequence } = this.props;
    await addColorToSequence(this.randomColor);
    this.playSequence();
  };

  playSequence = async () => {
    const { colorsSequence, difficulty, changePlayingStatus, setActiveColor } = this.props;

    changePlayingStatus();

    for (const color of colorsSequence) {
      await this.timeout(DIFFICULTY_LEVELS_TIMING[difficulty]);
      setActiveColor(color);

      await this.timeout(DIFFICULTY_LEVELS_TIMING[difficulty]);
      setActiveColor('');
    }

    changePlayingStatus();
  };

  timeout = ms =>
    new Promise(resolve => {
      this.timerId = setTimeout(() => {
        resolve();
      }, ms);
    });

  get randomColor() {
    const colorsTypes = DEFAULT_COLORS.map(color => color.type);
    const randomIndex = Math.floor(Math.random() * colorsTypes.length);

    return colorsTypes[randomIndex];
  }

  get buttonTitle() {
    const { colorsSequence, isSequenceFailed } = this.props;
    const isGameInProcess = colorsSequence.length > 0;

    if (isSequenceFailed) return 'Restart game';

    return isGameInProcess ? 'Turn off' : 'Start game';
  }

  render() {
    const {
      activeColor,
      colorsSequence,
      isPlayingSequence,
      userInputIndex,
      isSequenceFailed,
      failGame,
      writeInputIndex
    } = this.props;
    const buttonTitle = this.buttonTitle;

    return (
      <SCAligner>
        <SCDisplayWrap>
          {DEFAULT_COLORS.map(({ type, bgColor, pressedColor }) => (
            <ColoredButton
              key={type}
              type={type}
              bgColor={bgColor}
              pressedColor={pressedColor}
              activeColor={activeColor}
              colorsSequence={colorsSequence}
              isPlayingSequence={isPlayingSequence}
              userInputIndex={userInputIndex}
              isSequenceFailed={isSequenceFailed}
              initRound={this.initRound}
              failGame={failGame}
              writeInputIndex={writeInputIndex}
            />
          ))}
        </SCDisplayWrap>
        <SCStartButton onClick={this.handleGameStatus}>{buttonTitle}</SCStartButton>
      </SCAligner>
    );
  }
}

const SCAligner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SCDisplayWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 600px;
  margin-bottom: 30px;
  border: 1px solid #212121;
`;

const SCStartButton = styled.button`
  padding: 3px 8px;
  font: 18px 'Roboto', sans-serif;
  text-align: center;
  background-color: #eeeeee;
  border-radius: 2px;
  border: 1px solid #212121;
  outline: none;
  cursor: pointer;
`;

const mapStateToProps = ({
  colorsSequence,
  isSequenceFailed,
  difficulty,
  activeColor,
  isPlayingSequence,
  userInputIndex
}) => ({
  colorsSequence,
  isSequenceFailed,
  difficulty,
  activeColor,
  isPlayingSequence,
  userInputIndex
});

export default connect(mapStateToProps, {
  turnGameOff,
  addColorToSequence,
  changePlayingStatus,
  setActiveColor,
  failGame,
  writeInputIndex
})(GameDisplay);
