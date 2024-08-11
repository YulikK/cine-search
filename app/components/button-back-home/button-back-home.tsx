import { Link } from '@remix-run/react';
import React from 'react';

import { DEFAULT_PAGE } from '~/common/constant';

export const ButtonBackHome: React.FC = () => (
  <div className="mt-6">
    <Link
      to={`/?page=${DEFAULT_PAGE}`}
      className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      Back to Homepage
    </Link>
  </div>
);
