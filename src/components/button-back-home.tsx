import React from 'react';
import { Link } from 'react-router-dom';

export const ButtonBackHome: React.FC = () => (
  <div className="mt-6">
    <Link
      to={`/`}
      className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      Back to Homepage
    </Link>
  </div>
);