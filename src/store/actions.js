import { CHANGE_DIFFICULTY } from './constants';

export const changeDifficulty = difficultyType => {
  return {
    type: CHANGE_DIFFICULTY,
    payload: difficultyType
  };
};
