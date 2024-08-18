import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormStateReturn,
} from 'react-hook-form';
import Input from '../input/input';
import PasswordLevel from '../password-level/password-level';
import { useRef } from 'react';
import {
  getLevel,
  getPasswordStrength,
} from '../../types/validation/password-level';

interface PropsType<T extends FieldValues> {
  id: Path<T>;
  register?: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  touchedFields?: UseFormStateReturn<T>['touchedFields'];
  password?: string;
  isHasLevel?: boolean;
}

export const PasswordInputUncontrolled = <T extends FieldValues>({
  id,
  register,
  errors,
  touchedFields,
  isHasLevel,
}: PropsType<T>) => {
  const levelRef = useRef<number>(0);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value && isHasLevel) {
      const strength = getPasswordStrength(e.target.value);
      const level = getLevel(strength);
      levelRef.current = level;
    }
  };

  return (
    <div className="relative">
      <Input
        id={id}
        autoComplete={'new-password'}
        type={'password'}
        {...(register ? { register } : {})}
        {...(errors ? { errors } : {})}
        {...(touchedFields ? { touchedFields } : {})}
        onChangeHandler={handleOnChange}
      />
      <PasswordLevel level={levelRef.current} />
    </div>
  );
};
