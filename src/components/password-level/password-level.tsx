import React from 'react';

type PropsType = {
  password: string;
};

const PasswordStrength = {
  WEAK: 'weak',
  MEDIUM: 'medium',
  STRONG: 'strong',
};

const getPasswordStrength = (password: string) => {
  const hasNumber = /\d/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (hasNumber && hasUpperCase && hasLowerCase && hasSpecialChar) {
    return PasswordStrength.STRONG;
  } else if ((hasNumber && hasUpperCase) || (hasLowerCase && hasSpecialChar)) {
    return PasswordStrength.MEDIUM;
  } else {
    return PasswordStrength.WEAK;
  }
};

const PasswordLevel: React.FC<PropsType> = ({ password }) => {
  const strength = getPasswordStrength(password);
  const getLevel = () => {
    switch (strength) {
      case PasswordStrength.STRONG:
        return 3;
      case PasswordStrength.MEDIUM:
        return 2;
      case PasswordStrength.WEAK:
      default:
        return 1;
    }
  };

  return (
    <div className="absolute right-3 top-1/2 -translate-y-1/2">
      <img
        className="h-5 w-5"
        src={`/icons/password-${getLevel()}.png`}
        alt="password level"
      />
    </div>
  );
};

export default PasswordLevel;
