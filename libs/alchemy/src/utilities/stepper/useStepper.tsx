/** @format */
import { createSignal } from 'solid-js';
import type { Accessor } from 'solid-js';
import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';

type Step = Accessor<number>;
type Next = () => void;
type Previous = () => void;
type UseStepper = (
  initialStep: number,
  totalSteps: number
) => {
  step: Step;
  next: Next;
  previous: Previous;
};

const useStepper: UseStepper = (
  initialStep = 0,
  totalSteps = initialStep + 1
) => {
  if (totalSteps <= initialStep)
    throw new RangeError('total steps cannot be less than initial step');
  const [step, setStep] = createSignal(initialStep);

  const next = () => {
    pipe(
      step(),
      E.fromPredicate(
        (n) => n === totalSteps,
        (n) => n
      ),
      E.match(
        (n) => setStep(n + 1),
        (n) => n
      )
    );
  };

  const previous = () => {
    pipe(
      step(),
      E.fromPredicate(
        (n) => n !== initialStep,
        (n) => n
      ),
      E.match(
        (n) => n,
        (n) => setStep(n - 1)
      )
    );
  };

  return { next, previous, step };
};

export default useStepper;
