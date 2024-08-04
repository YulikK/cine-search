import Link from 'next/link';
import React from 'react';
import { useRequestParamsContext } from '../../hooks/params-provider';
import { DEFAULT_DETAILS, DEFAULT_PAGE } from '../../common/constant';

export const ButtonBackHome: React.FC = () => {
  const { setParams } = useRequestParamsContext();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setParams({ page: DEFAULT_PAGE, query: '', details: DEFAULT_DETAILS });
  };

  return (
    <div className="mt-6">
      <Link
        href={`/`}
        onClick={handleClick}
        className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Back to Homepage
      </Link>
    </div>
  );
};
