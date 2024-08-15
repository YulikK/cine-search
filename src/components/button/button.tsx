import classNames from 'classnames';

type PropsType = {
  type?: 'button' | 'submit';
  children: React.ReactNode;
  disabled?: boolean;
};
export const Button = ({ type, children, disabled }: PropsType) => {
  return (
    <button
      className={classNames({
        'border hover:bg-accent text-muted-foreground hover:text-white font-bold py-4 px-6 rounded-lg flex flex-col items-center justify-center':
          type === 'button',
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full':
          type === 'submit',
      })}
      type={type !== 'submit' ? 'button' : 'submit'}
      {...(disabled ? { disabled } : {})}
    >
      {children}
    </button>
  );
};
