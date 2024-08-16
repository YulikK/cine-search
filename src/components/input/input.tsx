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
  placeholder?: string;
  list?: string;
  register: UseFormRegister<T>;
  value?: string;
  errors: FieldErrors<T>;
  touchedFields: UseFormStateReturn<T>['touchedFields'];
}

const Input = <T extends FieldValues>({
  id,
  type,
  autoComplete,
  placeholder,
  list,
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
      {...(placeholder ? { placeholder } : {})}
      {...(list ? { list } : {})}
      className={classNames(
        'flex  h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        {
          'border-b-2 border-b-destructive ': isError,
        },
        {
          'border-b-2 border-b-green-600 ': isTouched && !isError,
        },
        {
          'absolute opacity-0 w-0 h-0': type === 'radio' || type === 'checkbox',
        },
        {
          'w-full': type !== 'radio' && type !== 'checkbox',
        },
        {
          'px-8': id === 'password' || id === 'confirmPassword',
        }
        // {
        //   'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground':
        //     type === 'checkbox',
        // }
      )}
      {...register(id)}
    />
  );
};

export default Input;
