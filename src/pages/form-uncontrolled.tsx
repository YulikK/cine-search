import { useDispatch, useSelector } from 'react-redux';
import { getValidationSchema } from '../types/validation/controll-schema';
import { RootState } from '../store/store';
import FormWrapper from '../components/form/form-wrap/form-wrap';
import { FormTitle } from '../components/form/form-title/form-title';
import { NameField } from '../components/form/name-field/name-field';
import { Button } from '../components/button/button';
import * as yup from 'yup';
import { useState } from 'react';
import { AgeGenderFields } from '../components/form/age-gender-fields/age-gender-fields';
import { EmailField } from '../components/form/email-field/email';
import { PasswordFields } from '../components/form/password-fields/password-fields';
import { CountryField } from '../components/form/country-filed/country-filed';
import { TermsField } from '../components/form/terms-field/terms-field';
import { AvatarUpload } from '../components/avatar-upload/avatar-upload';
import { img64Converter } from '../utils/img-64-converter';
import { useNavigate } from 'react-router-dom';
import { addSubmission } from '../store/reducers/history-slice';
import { isFormFields } from '../types/validation/types';
import { BackHomeButton } from '../components/back-home-button/back-home-button';

const FormUncontrolledPage = () => {
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );
  const schema = getValidationSchema(countries);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (event.target instanceof HTMLFormElement) {
      const formData = new FormData(event.target);
      const data = {
        name: formData.get('name'),
        age: formData.get('age'),
        gender: formData.get('gender'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        country: formData.get('country'),
        terms: formData.get('terms') === 'on',
        avatar: formData.get('avatar') as File,
      };

      try {
        await schema.validate(data, { abortEarly: false });

        setErrors({});
        const avatar64 = await img64Converter(data.avatar);
        const formData = {
          ...data,
          avatar: avatar64,
        };
        if (isFormFields(formData)) {
          dispatch(addSubmission(formData));
          navigate('/');
        }
      } catch (error) {
        const validationErrors: Record<string, string> = {};

        if (error instanceof yup.ValidationError) {
          error.inner.forEach((error) => {
            if (error.path !== undefined) {
              validationErrors[error.path] = error.message;
            }
          });
        }

        setErrors(validationErrors);
        console.error(validationErrors);
      }
    }
  };

  return (
    <main className="flex items-center justify-center flex-col py-12 md:py-20 gap-4">
      <BackHomeButton />
      <FormWrapper onSubmit={onSubmit}>
        <FormTitle />
        <div className="p-6 space-y-1">
          <NameField errors={errors} />
          <AgeGenderFields errors={errors} />
          <EmailField errors={errors} />
          <PasswordFields errors={errors} />
          <CountryField errors={errors} />
          <TermsField errors={errors} />
          <AvatarUpload errors={errors} />
        </div>
        <div className="flex items-center p-6">
          <Button type="submit">Submit</Button>
        </div>
      </FormWrapper>
    </main>
  );
};

export default FormUncontrolledPage;
