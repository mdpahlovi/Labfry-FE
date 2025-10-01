"use client";

import { useAppSelector } from "@/lib/hooks";

type TextFieldProps = {
    label?: string;
    name?: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
};

const TextField: React.FC<TextFieldProps> = ({ label, type = "text", value, onChange, error, name }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-gray-400 focus:outline-none focus:ring-0 bg-transparent text-gray-600"
                readOnly
            />
            {error && <p className="mt-0.5 text-sm leading-4 text-red-500">{error}</p>}
        </div>
    );
};

export default function ProfilePage() {
    const { user } = useAppSelector((state) => state.auth);

    return (
        <div className="w-full max-w-[662px]">
            <h2 className="text-3xl text-center font-bold tracking-tight text-gray-900">Personal Information</h2>
            <form className="mt-10 space-y-6">
                <div className="grid grid-cols-2 gap-5">
                    <TextField label="First Name" name="firstName" value={user?.firstName || ""} />
                    <TextField label="Last Name" name="lastName" value={user?.lastName || ""} />
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <TextField label="Email" name="email" type="email" value={user?.email || ""} />
                    <TextField label="Role" name="role" value={user?.role || ""} />
                </div>
            </form>
        </div>
    );
}
