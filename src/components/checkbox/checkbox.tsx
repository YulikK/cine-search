import classNames from 'classnames';

type PropsType = {
  htmlFor: string;
  children: React.ReactNode;
  // checked: boolean;
};

export const CheckboxButton = ({ htmlFor, children }: PropsType) => {
  return (
    <label
      className={classNames(
        'inline-flex gap-2 cursor-pointer items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
      )}
      htmlFor={htmlFor}
    >
      <p>I accept Terms&Conditions</p>
      <span
        className={classNames(
          'peer w-4 h-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 '
          // {
          //   'bg-primary text-primary-foreground': checked,
          // }
        )}
      ></span>

      {children}
    </label>
  );
};
