import {
  CHANGE_DIFFICULTY,
  TURN_GAME_OFF,
  ADD_COLOR_TO_SEQUENCE,
  WRITE_INPUT_INDEX,
  FAIL_GAME,
  CHANGE_PLAYING_STATUS,
  SET_ACTIVE_COLOR
} from './constants';

export const changeDifficulty = difficultyType => ({
  type: CHANGE_DIFFICULTY,
  payload: difficultyType
});

export const turnGameOff = () => ({
  type: TURN_GAME_OFF
});

export const addColorToSequence = color => ({
  type: ADD_COLOR_TO_SEQUENCE,
  payload: color
});

export const writeInputIndex = idx => ({
  type: WRITE_INPUT_INDEX,
  payload: idx
});

export const failGame = () => ({
  type: FAIL_GAME
});

export const changePlayingStatus = () => ({
  type: CHANGE_PLAYING_STATUS
});

export const setActiveColor = color => ({
  type: SET_ACTIVE_COLOR,
  payload: color
});
