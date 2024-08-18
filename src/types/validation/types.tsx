import { FormFields } from '..';

export function isFormFields(data: unknown): data is FormFields {
  return Boolean(
    data &&
      typeof data === 'object' &&
      'name' in data &&
      'age' in data &&
      'email' in data &&
      'gender' in data &&
      'password' in data &&
      'confirmPassword' in data &&
      'country' in data &&
      'terms' in data &&
      'avatar' in data
  );
}
