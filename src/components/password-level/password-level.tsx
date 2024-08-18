import React from 'react';

type PropsType = {
  level: number;
};

const PasswordLevel: React.FC<PropsType> = ({ level }) => {
  return (
    <div className="absolute right-2 top-1/2 -translate-y-1/2">
      {level > 0 && (
        <img
          className="h-5 w-5"
          src={`/icons/password-${level}.png`}
          alt="password level"
        />
      )}
    </div>
  );
};

export default PasswordLevel;
