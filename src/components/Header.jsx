import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import styled from 'styled-components';

import Select from './Select';

// store
// import {} from '../store/actions';

class Header extends Component {
  static propTypes = {
    difficulty: PropTypes.string.isRequired,
    colorsSequence: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  handleSelect = value => {
    console.log(value);
  };

  render() {
    const { difficulty, colorsSequence } = this.props;
    const roundNumber = colorsSequence.length;

    const selectOptions = [
      { label: 'Easy', value: 'easy' },
      { label: 'Medium', value: 'medium' },
      { label: 'Hard', value: 'hard' }
    ];

    return (
      <div>
        <p>Simon the Game</p>
        <p>Round: {roundNumber}</p>
        <div>
          <span>Difficulty:</span>
          <Select options={selectOptions} onSelect={this.handleSelect} selected={difficulty} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ difficulty, colorsSequence }) => ({
  difficulty,
  colorsSequence
});

export default connect(mapStateToProps, null)(Header);
