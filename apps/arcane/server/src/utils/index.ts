/** @format */

import path from 'path';

export const getFile = (...filePath: string[]) => {
  return path.resolve(__dirname, ...filePath);
};
