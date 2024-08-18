import * as yup from 'yup';
import { Gender } from '..';

export function getValidationSchema(countries: string[]) {
  return yup.object().shape({
    name: yup
      .string()
      .matches(/^[A-Z]/, 'Must start with an uppercase letter')
      .required('Name is required'),
    age: yup
      .number()
      .transform((value, originalValue) =>
        originalValue.trim() === '' ? null : value
      )
      .max(120, 'Age must be less than or equal to 120')
      .nullable()
      .positive('Age must be a positive number')
      .required('Age is required'),
    gender: yup
      .mixed<Gender>()
      .oneOf(Object.values(Gender), 'Gender must be either male or female')
      .required('Gender is required'),
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
        'Email must be a valid email'
      )
      .required('Email is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
    country: yup
      .string()
      .required('Country is required')
      .test(
        'is-valid-country',
        'Country must be one of the available options',
        (value) => {
          return countries.includes(value || '');
        }
      ),
    terms: yup.boolean().required('You must accept the terms and conditions'),
    avatar: yup
      .mixed<File | FileList>()
      .required('Picture is required')
      .test('fileSize', 'File Size is too large', (value) => {
        if (
          !value ||
          (value instanceof FileList && !value.length) ||
          (value instanceof File && value.name === '')
        )
          return true;
        const file = value instanceof FileList ? value[0] : value;
        return file.size <= 2 * 1024 * 1024;
      })
      .test('fileType', 'Unsupported File Format', (value) => {
        if (!value || !(value instanceof FileList) || value.length === 0)
          return true;
        const file = value[0];
        return ['image/jpeg', 'image/png'].includes(file.type);
      }),
  });
}
