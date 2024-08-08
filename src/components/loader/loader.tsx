import React from 'react';
import Image from 'next/image';

export const Loader: React.FC = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="flex flex-col items-center gap-4">
      <Image
        className=""
        src="/images/spinner.gif"
        alt="Loader"
        height={100}
        width={100}
      />
    </div>
  </div>
);
