import React, { useState } from 'react';
import { BugIcon } from '../icons/bug-icon/bug-icon.tsx';

export const ErrorGenerator: React.FC = () => {
  const [throwError, setThrowError] = useState(false);

  function generateError(): void {
    setThrowError(!throwError);
  }

  if (throwError) {
    throw new Error('This is a test error');
  }

  return (
    <button
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-ring h-10 px-4 py-2"
      onClick={generateError}
      aria-label="generate error"
    >
      <BugIcon />
    </button>
  );
};
