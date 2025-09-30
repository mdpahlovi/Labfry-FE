// Form validation utilities

export const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
};

export const validatePassword = (password: string): string => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    return "";
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string => {
    if (!confirmPassword) return "Please confirm your password";
    if (password !== confirmPassword) return "Passwords do not match";
    return "";
};

export const validateRequired = (value: string, fieldName: string): string => {
    if (!value) return `${fieldName} is required`;
    return "";
};

export const validateCheckbox = (checked: boolean, message: string): string => {
    if (!checked) return message;
    return "";
};
