/** @format */

// components
export type Variants = 'primary' | 'secondary' | 'tertiary';
export type Size = 'large' | 'medium' | 'small';

export type LoadingSize = Size;
export type ButtonSize = Size;
export type ButtonVariant = Variants;
export type ModalSize = Omit<Size, 'medium'>;
export type InputVariant = Extract<Variants, 'primary'>;
export type TextFieldTypes = 'text' | 'password' | 'email';
export type ToggleState = 'checked' | 'unchecked';

const typographyTypes = ['title', 'subtitle', 'description'] as const;
export type TypographyTypes = typeof typographyTypes[number];
