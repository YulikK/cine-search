import {
  FieldErrors,
  UseFormRegister,
  UseFormStateReturn,
} from 'react-hook-form';

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
  avatar: File | FileList;
}

export type User = Omit<FormFields, 'confirmPassword' | 'avatar'> & {
  avatar: string;
};

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
  register?: UseFormRegister<FormFields>;
  errors?: FieldErrors<FormFields>;
  touchedFields?: UseFormStateReturn<FormFields>['touchedFields'];
}

export enum PasswordStrength {
  WEAK = 'weak',
  MEDIUM = 'medium',
  STRONG = 'strong',
}
