import classNames from 'classnames';

type PropsType = {
  htmlFor: string;
  children: React.ReactNode;
  checked: boolean;
};

export const RadioButton = ({ htmlFor, children, checked }: PropsType) => (
  <label
    className={classNames(
      'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-10 px-3',
      {
        'bg-accent text-accent-foreground': checked,
      }
    )}
    htmlFor={htmlFor}
  >
    {children}
  </label>
);
