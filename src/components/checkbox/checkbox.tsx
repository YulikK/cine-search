import classNames from 'classnames';
// import { FieldErrors } from 'react-hook-form';

type PropsType = {
  htmlFor: string;
  children: React.ReactNode;
  checked: boolean;
  // isError: boolean;
  // errors: FieldErrors;
};

export const CheckboxButton = ({
  htmlFor,
  children,
  checked,
  // errors,
  // isError,
}: PropsType) => {
  // const isShowError = errors['terms']; // || isError;

  return (
    <label
      className={classNames(
        'inline-flex gap-2 cursor-pointer items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
        // {
        //   'bg-accent text-accent-foreground': checked,
        // },
        // {
        //   'bg-transparent hover:bg-accent hover:text-accent-foreground cursor-pointer':
        //     !checked,
        // },
        // {
        //   ' text-destructive': isShowError,
        // }
      )}
      htmlFor={htmlFor}
    >
      <span>I accept Terms&Conditions</span>
      <span
        className={classNames(
          'peer w-4 h-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ',
          {
            'bg-primary text-primary-foreground': checked,
          }
        )}
      ></span>

      {children}
    </label>
  );
};
