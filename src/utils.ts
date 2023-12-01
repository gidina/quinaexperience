export const MAX_NUM = 90;
export const generateRandom = (minLimit = 1, maxLimit = MAX_NUM) => Math.floor(Math.random() * (maxLimit - minLimit + 1)) + minLimit;
export const AUTO_PLAY_INTERVAL_MS = 2*1000;
