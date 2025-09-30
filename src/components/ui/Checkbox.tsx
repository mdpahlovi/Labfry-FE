import React from "react";

interface CheckboxProps {
    label?: string;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    id?: string;
    className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked = false, onChange, name, id, className = "" }) => {
    return (
        <div className={`flex items-center ${className}`}>
            <input
                type="checkbox"
                id={id}
                name={name}
                checked={checked}
                onChange={onChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            {label && (
                <label htmlFor={id} className="ml-2 block text-sm text-gray-700">
                    {label}
                </label>
            )}
        </div>
    );
};

export default Checkbox;
