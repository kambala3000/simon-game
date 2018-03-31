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
  setActiveColor
} from '../store/actions';

// constants
import { DEFAULT_COLORS, DIFFICULTY_LEVELS_TIMING } from '../utils/constants';

class GameDisplay extends Component {
  static propTypes = {
    colorsSequence: PropTypes.array.isRequired,
    isSequenceFailed: PropTypes.bool.isRequired,
    difficulty: PropTypes.string.isRequired,
    activeColor: PropTypes.string,
    turnGameOff: PropTypes.func.isRequired,
    addColorToSequence: PropTypes.func.isRequired,
    changePlayingStatus: PropTypes.func.isRequired,
    setActiveColor: PropTypes.func.isRequired
  };

  handleGameStatus = () => {
    const { colorsSequence, isSequenceFailed, turnGameOff } = this.props;
    const isGameInProcess = colorsSequence.length > 0;

    if (isGameInProcess || isSequenceFailed) {
      turnGameOff();
    } else {
      this.initRound();
    }
  };

  initRound = async () => {
    const { addColorToSequence } = this.props;
    await addColorToSequence(this.randomColor);
    await addColorToSequence(this.randomColor);
    this.playSequence();
  };

  playSequence = async () => {
    const { colorsSequence, difficulty, changePlayingStatus, setActiveColor } = this.props;
    console.log(colorsSequence);
    changePlayingStatus();

    const sequencePromises = colorsSequence.map((color, index) => {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          setActiveColor(color);

          // mb promise all
          // const disableSoundPromise = () =>
          //   new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       setActiveColor('');
          //       resolve();
          //     }, DIFFICULTY_LEVELS_TIMING[difficulty]);
          //   });

          // await disableSoundPromise();

          resolve();
        }, ++index * DIFFICULTY_LEVELS_TIMING[difficulty]);
      });
    });

    await Promise.all(sequencePromises);

    setTimeout(() => {
      changePlayingStatus();
    }, DIFFICULTY_LEVELS_TIMING[difficulty]);
  };

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
    const { activeColor } = this.props;
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

const mapStateToProps = ({ colorsSequence, isSequenceFailed, difficulty, activeColor }) => ({
  colorsSequence,
  isSequenceFailed,
  difficulty,
  activeColor
});

export default connect(mapStateToProps, {
  turnGameOff,
  addColorToSequence,
  changePlayingStatus,
  setActiveColor
})(GameDisplay);
