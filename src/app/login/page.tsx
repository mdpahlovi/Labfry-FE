"use client";

import React, { useState } from "react";
import Link from "next/link";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login form submitted:", formData);
        // Add authentication logic here
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-[480px]">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Welcome to Labfry</h2>
                    <p className="mt-2 text-sm text-gray-600">Please share your login details so you can access the website.</p>
                </div>
                <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
                    <TextField label="Email address" type="email" name="email" value={formData.email} onChange={handleChange} />
                    <TextField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
                    <div className="flex items-center justify-between">
                        <Checkbox label="Remember me" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} />
                        <div className="text-sm">
                            <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                                Forgot password?
                            </Link>
                        </div>
                    </div>
                    <Button type="submit" variant="primary" className="w-full">
                        Sign in
                    </Button>
                </form>
                <div className="mt-12 relative flex items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 flex-shrink text-sm text-gray-600">Or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <p className="mt-8 text-sm text-center">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                        Get Started
                    </Link>
                </p>
            </div>
        </div>
    );
}
