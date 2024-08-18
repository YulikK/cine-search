import { Link } from 'react-router-dom';

export const BackHomeButton = () => {
  return (
    <Link
      to="/"
      className="w-max cursor-pointer border hover:bg-accent text-muted-foreground hover:text-white font-bold py-4 px-6 rounded-lg flex flex-col items-center justify-center"
    >
      <img className="h-5 w-5" src="/icons/return.png" alt="back home" />
    </Link>
  );
};
