import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "outline";
    className?: string;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type = "button", variant = "primary", className = "", disabled = false }) => {
    const baseStyles = "flex items-center justify-center rounded-lg px-4 py-3 font-medium transition-colors";

    const variantStyles = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
        outline: "border border-gray-300 bg-transparent text-gray-800 hover:bg-gray-100 focus:ring-gray-500",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variantStyles[variant]} ${disabled ? "cursor-not-allowed opacity-50" : ""} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
