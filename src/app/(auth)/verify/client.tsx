"use client";

import Button from "@/components/ui/Button";
import axios from "@/utils/axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export function VerifyForm({ email, role, flow }: { email: string; role: string; flow: string }) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRef = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        inputRef.current = inputRef.current.slice(0, 6);
    }, []);

    const handleChange = (index: number, value: string) => {
        if (value.length <= 1) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (value !== "" && index < 5) {
                inputRef.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        let purpose = "";
        if (flow === "register") {
            purpose = "VERIFY_EMAIL";
        } else if (flow === "password") {
            purpose = "RESET_PASSWORD";
        }

        try {
            await axios.post("/auth/verify-email", { email, code: code.join(""), purpose });
            toast.success("Account verified successfully");

            if (flow === "register") {
                router.push(`/success?email=${email}&role=${role}&flow=${flow}`);
            } else if (flow === "password") {
                router.push(`/reset-password?email=${email}&role=${role}&flow=${flow}`);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
                <div className="flex justify-center space-x-4">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => {
                                if (el) inputRef.current[index] = el;
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
                <Button type="submit" variant="primary" className="w-full" loading={loading}>
                    Verify
                </Button>
            </form>
            <p className="mt-6 text-sm text-center">
                Don&rsquo;t have a code?{" "}
                <button type="button" className="font-medium text-[#EE3638] hover:text-[#EE3638]/80">
                    Resend code
                </button>
            </p>
        </>
    );
}
