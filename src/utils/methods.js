import { DEFAULT_COLORS } from './constants';

export const playColorSound = color => {
  const colorObj = DEFAULT_COLORS.find(item => item.type === color);
  colorObj.audioFile.play();
};
