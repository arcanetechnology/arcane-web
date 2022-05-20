/** @format */

export type Variants = 'standard' | 'text';

export type ButtonVariant = Variants;
export type InputVariant = Extract<Variants, 'standard'>;
export type TextFieldTypes = 'text' | 'password';
