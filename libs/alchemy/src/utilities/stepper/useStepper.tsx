/** @format */
import { createSignal } from 'solid-js';
import type { Accessor } from 'solid-js';

export type Step = Accessor<number>;
export type Next = () => void;
export type Previous = () => void;
export type UseStepper = (initialStep: number) => {
  step: Step;
  next: Next;
  previous: Previous;
  childElements: ChildElementsDirectives;
  getLast: () => boolean;
};
export type ChildElementsDirectives = (element: HTMLDivElement) => void;

const useStepper: UseStepper = (initialStep = 0) => {
  const [step, setStep] = createSignal(initialStep);
  const [elements, setElements] = createSignal<Array<HTMLDivElement>>([]);

  const next = () => {
    if (step() !== elements().length - 1) {
      elements()[step()].style.display = 'none';
      setStep(step() + 1);
      elements()[step()].style.display = 'block';
    }
  };

  const previous = () => {
    if (step() !== initialStep) {
      elements()[step()].style.display = 'none';
      setStep(step() - 1);
      elements()[step()].style.display = 'block';
    }
  };

  const childElements: ChildElementsDirectives = (element) => {
    const children: Array<HTMLDivElement> =
      element.childNodes as unknown as Array<HTMLDivElement>;
    if (!children) throw new Error('there are no stepper tabs');
    children.forEach((e) => (e.style.display = 'none'));
    children[0].style.display = 'block';
    setElements(children);
  };

  const getLast = () => {
    return step() === elements().length - 1;
  };

  return { next, previous, step, childElements, getLast };
};

export default useStepper;
