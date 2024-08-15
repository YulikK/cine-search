import classNames from 'classnames';
import {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  UseFormStateReturn,
  Path,
} from 'react-hook-form';

interface PropsType<T extends FieldValues> {
  id: Path<T>;
  type: string;
  autoComplete: string;
  register: UseFormRegister<T>;
  value?: string;
  errors: FieldErrors<T>;
  touchedFields: UseFormStateReturn<T>['touchedFields'];
}

const Input = <T extends FieldValues>({
  id,
  type,
  autoComplete,
  register,
  value,
  errors,
  touchedFields,
}: PropsType<T>) => {
  const isTouched = Object.prototype.hasOwnProperty.call(touchedFields, id);
  const isError = isTouched && errors[id];

  return (
    <input
      id={`${id.toString()}${type === 'radio' ? `-${value}` : ''}`}
      type={type}
      autoComplete={autoComplete}
      {...(value ? { value } : {})}
      className={classNames(
        'flex  h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        {
          'border-b-2 border-b-destructive ': isError,
        },
        {
          'border-b-2 border-b-green-600 ': isTouched && !isError,
        },
        {
          'absolute opacity-0 w-0 h-0': type === 'radio',
        },
        {
          'w-full': type !== 'radio',
        }
      )}
      {...register(id)}
    />
  );
};

export default Input;
