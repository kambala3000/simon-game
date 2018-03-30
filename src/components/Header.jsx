import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

// components
import Select from './Select';

// store
import { changeDifficulty } from '../store/actions';

class Header extends Component {
  static propTypes = {
    difficulty: PropTypes.string.isRequired,
    colorsSequence: PropTypes.array.isRequired,
    changeDifficulty: PropTypes.func.isRequired
  };

  handleSelect = value => {
    console.log(value);
  };

  render() {
    const { difficulty, colorsSequence, changeDifficulty } = this.props;
    const roundNumber = colorsSequence.length;

    const selectOptions = [
      { label: 'Easy', value: 'easy' },
      { label: 'Medium', value: 'medium' },
      { label: 'Hard', value: 'hard' }
    ];

    return (
      <SCHeaderWrap>
        <SCTitle>Simon the Game</SCTitle>
        <SCRoundsCounter>Round: {roundNumber}</SCRoundsCounter>
        <SCDifficultyWrap>
          <span>Difficulty:</span>
          <Select
            selected={difficulty}
            options={selectOptions}
            onSelect={this.handleSelect}
            onItemClick={changeDifficulty}
          />
        </SCDifficultyWrap>
      </SCHeaderWrap>
    );
  }
}

const SCHeaderWrap = styled.div`
  padding: 20px 0 30px 0;
  text-align: center;
  font-family: 'Roboto', sans-serif;
`;

const SCTitle = styled.h1`
  font-size: 36px;
  padding-bottom: 10px;
`;

const SCRoundsCounter = styled.p`
  font-size: 24px;
  padding-bottom: 15px;
`;

const SCDifficultyWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  > span {
    padding-right: 10px;
  }
`;

const mapStateToProps = ({ difficulty, colorsSequence }) => ({
  difficulty,
  colorsSequence
});

export default connect(mapStateToProps, { changeDifficulty })(Header);
