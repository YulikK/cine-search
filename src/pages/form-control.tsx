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
import PasswordLevel from '../components/password-level/password-level';

export interface FormInput {
  name: string;
  age: number;
  email: string;
  gender: Gender;
  password: string;
  confirmPassword: string;
}

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
});

const FormControlPage = () => {
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, touchedFields, isValid },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const name = watch('name');
  const email = watch('email');
  const age = watch('age');
  const gender = watch('gender');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  useEffect(() => {
    trigger('name');
  }, [name, trigger]);

  useEffect(() => {
    trigger('email');
  }, [email, trigger]);

  useEffect(() => {
    trigger('age');
  }, [age, trigger]);

  useEffect(() => {
    trigger('gender');
  }, [gender, trigger]);

  useEffect(() => {
    trigger('password');
    trigger('confirmPassword');
  }, [password, trigger]);

  useEffect(() => {
    trigger('confirmPassword');
  }, [confirmPassword, trigger]);

  const onSubmit = (data: Partial<User>) => {
    console.log(data);
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
                  fields={['age']}
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
                {/* {touchedFields.email && errors.email && (
                  <p>{errors.email.message}</p>
                )} */}
              </div>
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id={'password'}
                        autoComplete={'new-password'}
                        type={'password'}
                        register={register}
                        errors={errors}
                        touchedFields={touchedFields}
                      />
                      <PasswordLevel password={password} />
                      {/* <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <img
                          className="h-5 w-5"
                          src="/icons/password-1.png"
                          alt="password level"
                        />
                      </div> */}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id={'confirmPassword'}
                      autoComplete={'confirm-new-password'}
                      type={'password'}
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

{
  /* <div>
      <h1>Form Control Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" {...register('name')} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input id="age" type="number" {...register('age')} />
          {errors.age && <p>{errors.age.message}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div> */
}
