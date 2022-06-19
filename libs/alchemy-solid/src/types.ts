/** @format */

// components
export type Variants = 'primary' | 'secondary' | 'tertiary';
export type ButtonVariant = Variants;
export type InputVariant = Extract<Variants, 'primary'>;
export type TextFieldTypes = 'text' | 'password' | 'email';

const typographyTypes = ['title', 'subtitle', 'description'] as const;
export type TypographyTypes = typeof typographyTypes[number];
