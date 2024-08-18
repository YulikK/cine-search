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
  autoComplete?: string;
  placeholder?: string;
  list?: string;
  register?: UseFormRegister<T>;
  value?: string;
  accept?: string;
  errors?: FieldErrors<T>;
  touchedFields?: UseFormStateReturn<T>['touchedFields'];
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = <T extends FieldValues>({
  id,
  type,
  autoComplete,
  placeholder,
  list,
  register,
  value,
  accept,
  errors,
  touchedFields,
  onChangeHandler,
}: PropsType<T>) => {
  const isTouched = touchedFields
    ? Object.prototype.hasOwnProperty.call(touchedFields, id)
    : errors && Object.keys(errors).length;
  const isError =
    (touchedFields && isTouched && errors && errors[id]) ||
    (!touchedFields && errors && errors[id]);

  return (
    <input
      id={`${id.toString()}${type === 'radio' ? `-${value}` : ''}`}
      type={type}
      {...(!register ? { name: id } : {})}
      autoComplete={autoComplete}
      {...(value ? { value } : {})}
      {...(accept ? { accept } : {})}
      {...(placeholder ? { placeholder } : {})}
      {...(list ? { list } : {})}
      className={classNames(
        'flex rounded-md border border-input bg-background  text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        {
          'border-b-2 border-b-destructive ': isError,
        },
        {
          'border-b-2 border-b-green-600 ': isTouched && !isError,
        },
        {
          'absolute opacity-0 w-0 h-0 p-0 m-0':
            type === 'radio' || type === 'checkbox' || type === 'file',
        },
        {
          'w-full h-10 px-3 py-2':
            type !== 'radio' && type !== 'checkbox' && type !== 'file',
        },
        {
          'px-8': id === 'password' || id === 'confirmPassword',
        }
      )}
      {...(!register ? { onChange: onChangeHandler } : {})}
      {...(register ? { ...register(id, { onChange: onChangeHandler }) } : {})}
    />
  );
};

export default Input;
