/**
 * Validation Utilities
 * Shared between web and mobile
 */

export const getPasswordStrength = (password) => {
  return {
    length: password.length >= 8,
    casing: /[a-z]/.test(password) && /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };
};

export const validateEmail = (email) => {
  if (!email) return { isValid: false, message: 'Email is required' };
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  
  return { isValid: true, message: '' };
};

export const validatePassword = (password) => {
  if (!password) return { isValid: false, message: 'Password is required' };
  
  const strength = getPasswordStrength(password);
  
  if (!strength.length) return { isValid: false, message: 'Password must be at least 8 characters long' };
  if (!strength.casing) return { isValid: false, message: 'Include both uppercase and lowercase letters' };
  if (!strength.number) return { isValid: false, message: 'Include at least one number' };
  if (!strength.special) return { isValid: false, message: 'Include at least one special character' };

  return { isValid: true, message: '' };
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return { isValid: false, message: 'Passwords do not match' };
  }
  return { isValid: true, message: '' };
};
