import React from 'react';

type ChevronRightIconProps = React.HTMLAttributes<HTMLElement>;
export const ChevronRightIcon: React.FC<
  ChevronRightIconProps & React.SVGProps<SVGSVGElement>
> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);
