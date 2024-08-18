import { PasswordStrength } from '..';

export function getPasswordStrength(password: string): PasswordStrength {
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
}

export function getLevel(strength: PasswordStrength): number {
  switch (strength) {
    case PasswordStrength.STRONG:
      return 3;
    case PasswordStrength.MEDIUM:
      return 2;
    case PasswordStrength.WEAK:
    default:
      return 1;
  }
}
