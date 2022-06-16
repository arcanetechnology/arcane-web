/** @format */

import withSolid from 'rollup-preset-solid';
import dotenv from 'rollup-plugin-dotenv';

export default withSolid({ plugins: [dotenv()] });
