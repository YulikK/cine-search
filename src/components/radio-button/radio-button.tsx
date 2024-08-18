import classNames from 'classnames';
import { FieldErrors } from 'react-hook-form';

type PropsType = {
  htmlFor: string;
  children: React.ReactNode;
  errors?: FieldErrors;
};

export const RadioButton = ({ htmlFor, children, errors }: PropsType) => {
  const isShowError = errors && errors['gender'];
  return (
    <label
      className={classNames(
        'bg-transparent hover:bg-accent hover:text-accent-foreground cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-3',
        {
          'border-b-2 border-b-destructive': isShowError,
        }
      )}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};
