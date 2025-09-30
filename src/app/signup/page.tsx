"use client";

import React, { useState } from "react";
import Link from "next/link";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";

export default function SignupPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
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
        console.log("Signup form submitted:", formData);
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-[480px]">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Create your account</h2>
                    <p className="mt-2 text-sm text-gray-600">When sports Meets smart Tech.</p>
                </div>
                <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <TextField label="First Name" type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                        <TextField label="Last Name" type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                    </div>
                    <TextField label="Email address" type="email" name="email" value={formData.email} onChange={handleChange} />
                    <TextField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    <Checkbox
                        label="I agree to the Terms of Service and Privacy Policy"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                    />
                    <Button type="submit" variant="primary" className="w-full">
                        Create Account
                    </Button>
                </form>
                <div className="mt-12 relative flex items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 flex-shrink text-sm text-gray-600">Or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <p className="mt-8 text-sm text-center">
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
