/** @format */

import { useStepper } from '.';
import { cleanup } from 'solid-testing-library';

describe('alchemy useStepper utility function', () => {
  afterEach(cleanup);
  it('it should return step mutating state with next and previous function', () => {
    const { step, next, previous } = useStepper(0);
    expect(step()).toBe(0);
    expect(next).toBeDefined();
    expect(previous).toBeDefined();
  });

  it('it should have the default step as the initial step we provide to useStepper', () => {
    const { step } = useStepper(3);
    expect(step()).toBe(3);
  });

  it('should not be able to go previous than initial step', () => {
    const { step, previous } = useStepper(3);
    previous();
    expect(step()).toBe(3);
  });

  it('should show initial step even if execute previous step multiple times on first step', () => {
    const { step, previous } = useStepper(3);
    previous();
    previous();
    previous();
    previous();
    expect(step()).toBe(3);
  });
  /* 
  it('should increment by 1 whenever we execute next step', () => {
    const { step, next } = useStepper(0);
    next();
    expect(step()).toBe(1);
  });

  it('should decrement by one when we execute previous step', () => {
    const { step, next, previous } = useStepper(0);
    next();
    expect(step()).toBe(1);
    previous();
    expect(step()).toBe(0);
  });

  it('should not go above totalStep when we use next function on last step', () => {
    const { step, next } = useStepper(0);
    next();
    next();
    expect(step()).toBe(1);
  });

  it('should show last step even if we execute next multiple times on last step', () => {
    const { step, next } = useStepper(0);
    next();
    next();
    expect(step()).toBe(1);
    next();
    next();
    next();
    expect(step()).toBe(1);
  });
 */
  it('should give an error if totalSteps are less than initialStep', () => {
    try {
      useStepper(3);
    } catch (error) {
      expect(error).toBeInstanceOf(RangeError);
    }
  });
});
