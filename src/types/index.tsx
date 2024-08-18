import {
  FieldErrors,
  UseFormRegister,
  UseFormStateReturn,
} from 'react-hook-form';

export interface User {
  name: string;
  email: string;
  avatar: string;
  age: number;
  gender: Gender;
  country: string;
  terms: boolean;
  password: string;
}

export enum Gender {
  M = 'Male',
  F = 'Female',
}

export interface FormFields {
  name: string;
  age: number;
  email: string;
  gender: Gender;
  password: string;
  confirmPassword: string;
  country: string;
  terms: boolean;
  avatar: File[] | string;
}

export const FormFieldsName = {
  name: 'name',
  age: 'age',
  email: 'email',
  gender: 'gender',
  password: 'password',
  confirmPassword: 'confirmPassword',
  country: 'country',
  terms: 'terms',
  avatar: 'avatar',
} as const;

export type FormFieldsNameType = keyof typeof FormFieldsName;

export interface BaseFormProps {
  register?: UseFormRegister<Record<FormFieldsNameType, string>>;
  errors?: FieldErrors<Record<FormFieldsNameType, string>>;
  touchedFields?: UseFormStateReturn<
    Record<FormFieldsNameType, string>
  >['touchedFields'];
}

export enum PasswordStrength {
  WEAK = 'weak',
  MEDIUM = 'medium',
  STRONG = 'strong',
}
