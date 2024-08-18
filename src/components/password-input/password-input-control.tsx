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

export const PasswordInputControl = <T extends FieldValues>({
  id,
  register,
  errors,
  touchedFields,
  isHasLevel,
}: PropsType<T>) => {
  // const showPasswordRef = useRef(false);
  // const levelRef = useRef<number>(0);
  const [showPassword, setShowPassword] = useState(false);
  const [level, setLevel] = useState<number>(0);

  const toggleShowPassword = () => {
    // showPasswordRef.current = !showPasswordRef.current;
    // setShowPasswordState(showPasswordRef.current);
    setShowPassword(!showPassword);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value && isHasLevel) {
      const strength = getPasswordStrength(e.target.value);
      const level = getLevel(strength);
      // levelRef.current = level;
      setLevel(level);
    }
  };

  return (
    <div className="relative">
      <ShowPassword toggleShowPassword={toggleShowPassword} />
      <Input
        id={id}
        autoComplete={'new-password'}
        type={showPassword ? 'text' : 'password'}
        {...(register ? { register } : {})}
        {...(errors ? { errors } : {})}
        {...(touchedFields ? { touchedFields } : {})}
        onChangeHandler={handleOnChange}
      />
      <PasswordLevel level={level} />
    </div>
  );
};
