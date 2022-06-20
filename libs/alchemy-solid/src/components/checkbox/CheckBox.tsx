/** @format */
import { VoidComponent } from 'solid-js';
import { Input } from '../input/Input';

type CheckBoxProps = any;

export const CheckBox: VoidComponent<CheckBoxProps> = (props) => {
  return <Input name="checkbox" type="checkbox" />;
};
