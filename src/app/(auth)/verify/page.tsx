"use client";

import Button from "@/components/ui/Button";
import React, { useEffect, useRef, useState } from "react";

export default function VerifyPage() {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, 6);
    }, []);

    const handleChange = (index: number, value: string) => {
        if (value.length <= 1) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (value !== "" && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const verificationCode = code.join("");
        console.log("Verification code submitted:", verificationCode);
    };

    return (
        <div className="w-full max-w-[480px]">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Please check your email!</h2>
                <p className="mt-4 text-gray-600">
                    We&apos;ve emailed a 6-digit confirmation code to acb@domain, please enter the code in below box to verify your email.
                </p>
            </div>
            <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
                <div className="flex justify-center space-x-4">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => {
                                if (el) inputRefs.current[index] = el;
                            }}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="h-14 w-14 rounded-lg border border-gray-300 text-center text-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    ))}
                </div>
                <Button type="submit" variant="primary" className="w-full">
                    Verify
                </Button>
            </form>
            <p className="mt-6 text-sm text-center">
                Don&rsquo;t have a code?{" "}
                <button type="button" className="font-medium text-[#EE3638] hover:text-[#EE3638]/80">
                    Resend code
                </button>
            </p>
        </div>
    );
}
