import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Gender, User } from '../types';
import { Label } from '../components/label/label';
import { Button } from '../components/button/button';
import { useEffect } from 'react';
import Input from '../components/input/input';
import ErrorInformation from '../components/error-information/error-information';
import { RadioButton } from '../components/radio-button/radio-button';
// import PasswordLevel from '../components/password-level/password-level';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store/store';
import CountryAutocomplete from '../components/country-autocomplite/country-autocomplite';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
// import ShowPassword from '../components/show-password/show-password';
import { PasswordInput } from '../components/password-input/password-input';
import { CheckboxButton } from '../components/checkbox/checkbox';

export interface FormInput {
  name: string;
  age: number;
  email: string;
  gender: Gender;
  password: string;
  confirmPassword: string;
  country: string;
  terms: boolean;
}

const FormControlPage = () => {
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );
  const schema = yup.object().shape({
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
  });

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setError,
    formState: { errors, touchedFields, isValid },
  } = useForm<FormInput>({
    resolver: yupResolver<FormInput>(schema),
    mode: 'all',
  });

  // const name = watch('name');
  // const email = watch('email');
  // const age = watch('age');
  const gender = watch('gender');
  const password = watch('password');
  const terms = watch('terms');
  // console.log(gender);
  // const confirmPassword = watch('confirmPassword');
  // const country = watch('country');

  // useEffect(() => {
  //   trigger('name');
  //   allFieldsValidExceptGender()
  // }, [name, trigger]);

  // useEffect(() => {
  //   trigger('email');
  //   allFieldsValidExceptGender()
  // }, [email, trigger]);

  // useEffect(() => {
  //   trigger('age');
  //   allFieldsValidExceptGender()
  // }, [age, trigger]);

  // useEffect(() => {
  //   trigger('gender');
  // }, [gender, trigger]);

  useEffect(() => {
    trigger('password');
    trigger('confirmPassword');
  }, [password, trigger]);

  // useEffect(() => {
  //   allFieldsValidExceptGender();
  // }, [password, name, email, age, confirmPassword, country, gender]);

  // useEffect(() => {
  //   trigger('confirmPassword');
  //   allFieldsValidExceptGender()
  // }, [confirmPassword, trigger]);

  // useEffect(() => {
  //   trigger('country');
  //   allFieldsValidExceptGender()
  // }, [country, trigger]);

  const onSubmit = (data: Partial<User>) => {
    console.log(data);
  };

  const allFieldsValidExceptGender = () => {
    const { gender: errorGender, ...otherErrors } = errors;
    const { gender: touchedGender, ...otherTouchedFields } = touchedFields;

    const allFieldsValid = Object.keys(otherErrors).length === 0;
    const allFieldsTouched =
      Object.keys(otherTouchedFields).length ===
      Object.keys(schema.fields).length - 1;

    if (
      allFieldsValid &&
      allFieldsTouched &&
      !touchedGender &&
      !gender &&
      !errorGender
    ) {
      setError('gender', {
        type: 'manual',
        message: 'Gender is required',
      });
    }

    return !gender && allFieldsValid && allFieldsTouched;
  };

  return (
    <section className="flex-1 bg-background py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-md space-y-6">
          <form
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col space-y-1 p-6 pb-0">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                Edit Profile
              </h3>
              <p className="text-sm text-muted-foreground">
                Update your profile information.
              </p>
            </div>
            <div className="p-6 space-y-1">
              <div>
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id={'name'}
                    autoComplete={'name'}
                    type={'text'}
                    register={register}
                    errors={errors}
                    touchedFields={touchedFields}
                  />
                </div>

                <ErrorInformation
                  errors={errors}
                  touchedFields={touchedFields}
                  fields={['name']}
                />
              </div>

              <div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id={'age'}
                      autoComplete={'age'}
                      type={'number'}
                      register={register}
                      errors={errors}
                      touchedFields={touchedFields}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <div className="flex gap-2">
                      <RadioButton
                        htmlFor={`gender-${Gender.F}`}
                        checked={gender === Gender.F}
                        errors={errors}
                        isError={allFieldsValidExceptGender()}
                      >
                        <Input
                          id={'gender'}
                          autoComplete={'gender'}
                          type={'radio'}
                          register={register}
                          errors={errors}
                          value={Gender.F}
                          touchedFields={touchedFields}
                        />
                        <img
                          className="inline-flex w-4 h-4"
                          src={`/icons/gender-${Gender.F}.png`}
                          alt="gender"
                        />
                      </RadioButton>
                      <RadioButton
                        htmlFor={`gender-${Gender.M}`}
                        checked={gender === Gender.M}
                        errors={errors}
                        isError={allFieldsValidExceptGender()}
                      >
                        <Input
                          id={'gender'}
                          autoComplete={'gender'}
                          type={'radio'}
                          value={Gender.M}
                          register={register}
                          errors={errors}
                          touchedFields={touchedFields}
                        />
                        <img
                          className="inline-flex w-4 h-4"
                          src={`/icons/gender-${Gender.M}.png`}
                          alt="gender"
                        />
                      </RadioButton>
                    </div>
                  </div>
                </div>
                <ErrorInformation
                  errors={errors}
                  touchedFields={touchedFields}
                  fields={['age', 'gender']}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id={'email'}
                  autoComplete={'email'}
                  type={'email'}
                  register={register}
                  errors={errors}
                  touchedFields={touchedFields}
                />
                <ErrorInformation
                  errors={errors}
                  touchedFields={touchedFields}
                  fields={['email']}
                />
              </div>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <PasswordInput
                      id={'password'}
                      register={register}
                      errors={errors}
                      touchedFields={touchedFields}
                      password={password}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <PasswordInput
                      id={'confirmPassword'}
                      register={register}
                      errors={errors}
                      touchedFields={touchedFields}
                    />
                  </div>
                </div>
                <ErrorInformation
                  errors={errors}
                  touchedFields={touchedFields}
                  fields={['password', 'confirmPassword']}
                />
              </div>
              <div className="space-y-2">
                <CountryAutocomplete
                  id={'country'}
                  register={register}
                  errors={errors}
                  touchedFields={touchedFields}
                />
                <ErrorInformation
                  errors={errors}
                  touchedFields={touchedFields}
                  fields={['country']}
                />
              </div>
              <div className="space-y-1 flex flex-col">
                <CheckboxButton
                  htmlFor={`terms`}
                  checked={terms}
                  // errors={errors}
                  // isError={allFieldsValidExceptGender()}
                >
                  <Input
                    id={'terms'}
                    autoComplete={'new-terms'}
                    type={'checkbox'}
                    register={register}
                    errors={errors}
                    touchedFields={touchedFields}
                  />
                </CheckboxButton>
                <ErrorInformation
                  errors={errors}
                  touchedFields={touchedFields}
                  fields={['terms']}
                />
                {/* <Label htmlFor="terms">I accept Terms&Conditions</Label> */}
              </div>
            </div>
            <div className="flex items-center p-6">
              <Button type="submit" disabled={!isValid}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormControlPage;
