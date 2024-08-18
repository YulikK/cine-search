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
    terms: yup
      .boolean()
      .oneOf([true], 'You must accept the terms and conditions')
      .required('Country is required'),
    avatar: yup
      .mixed<FileList>()
      .required('Picture is required')
      .test('fileAdd', 'Picture is required', (value) => {
        return !(
          value &&
          value.length &&
          value[0] instanceof File &&
          value[0].name === ''
        );
      })
      .test('fileSize', 'File Size is too large', (value) => {
        if (!value || value.length === 0 || !(value[0] instanceof File))
          return true;
        const file = value[0];
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
