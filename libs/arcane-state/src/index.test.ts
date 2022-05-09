/**
 * @ Author: Joel D'Souza
 * @ Create Time: 2022-05-08 16:38:11
 * @ Modified by: Joel D'Souza
 * @ Modified time: 2022-05-09 12:43:32
 * @ Description: test file for arcane-test
 *
 * @format
 */
import '@testing-library/jest-dom';
import * as React from 'react';

describe('context as redux store', () => {
  it('should be able to a reducer and action and create a context store', () => {
    const INCREMENT = 'INCREMENT';
    const DECREMENT = 'DECREMENT';
    const counterReducer = (state: number, action: any) => {
      switch (action.type) {
        case INCREMENT:
          return state++;
        case DECREMENT:
          return state--;
        default:
          return state;
      }
    };
  });
});
