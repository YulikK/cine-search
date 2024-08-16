import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormStateReturn,
} from 'react-hook-form';
import Input from '../input/input';
import PasswordLevel from '../password-level/password-level';
import ShowPassword from '../show-password/show-password';
import { useState } from 'react';

interface PropsType<T extends FieldValues> {
  id: Path<T>;
  // type: string;
  // autoComplete: string;
  // placeholder?: string;
  // list?: string;
  register: UseFormRegister<T>;
  // value?: string;
  errors: FieldErrors<T>;
  touchedFields: UseFormStateReturn<T>['touchedFields'];
  password?: string;
}

export const PasswordInput = <T extends FieldValues>({
  id,
  // type,
  // autoComplete,
  // placeholder,
  // list,
  register,
  // value,
  errors,
  touchedFields,
  password,
}: PropsType<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <ShowPassword toggleShowPassword={toggleShowPassword} />
      <Input
        id={id}
        autoComplete={'new-password'}
        type={showPassword ? 'text' : 'password'}
        register={register}
        errors={errors}
        touchedFields={touchedFields}
      />
      {password && <PasswordLevel password={password} />}
    </div>
  );
};
