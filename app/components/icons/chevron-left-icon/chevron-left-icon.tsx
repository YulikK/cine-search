import React from 'react';

type ChevronLeftIconProps = React.HTMLAttributes<HTMLElement>;
export const ChevronLeftIcon: React.FC<
  ChevronLeftIconProps & React.SVGProps<SVGSVGElement>
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
    <path d="m15 18-6-6 6-6" />
  </svg>
);
