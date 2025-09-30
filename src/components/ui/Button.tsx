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
    const baseStyles = "flex items-center justify-center rounded-xl px-4 py-3 font-semibold transition-colors";

    const variantStyles = {
        primary: "bg-[#EE3638] text-white hover:bg-[#EE3638]/80",
        secondary: "border border-gray-300 bg-gray-200 text-gray-800 hover:bg-gray-300",
        outline: "border border-[#EE3638] bg-[#EE3638]/10 text-[#EE3638] hover:bg-[#EE3638]/20",
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
