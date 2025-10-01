"use client";

import Button from "@/components/ui/Button";
import axios from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export function VerifyForm({ email, role, flow }: { email: string; role: string; flow: string }) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(0);
    const inputRef = useRef<(HTMLInputElement | null)[]>([]);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        inputRef.current = inputRef.current.slice(0, 6);
        startTimer(60);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const startTimer = (seconds: number) => {
        setTimer(seconds);

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

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
            purpose = "PASSWORD_RESET";
        }

        try {
            await axios.post("/auth/verify-email", { email, code: code.join(""), purpose });
            toast.success("Account verified successfully");

            if (flow === "register") {
                router.replace(`/success?email=${email}&role=${role}&flow=${flow}`);
            } else if (flow === "password") {
                router.replace(`/reset-password?email=${email}&role=${role}&flow=${flow}`);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        if (timer > 0 || resending) return;

        setResending(true);

        let purpose = "";
        if (flow === "register") {
            purpose = "VERIFY_EMAIL";
        } else if (flow === "password") {
            purpose = "PASSWORD_RESET";
        }

        try {
            await axios.post("/auth/resend-code", { email, purpose });
            toast.success("Code resent successfully. Please check your email");

            setCode(["", "", "", "", "", ""]);
            inputRef.current[0]?.focus();

            startTimer(60);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error?.message || "Failed to resend code");
        } finally {
            setResending(false);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
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
                {timer > 0 ? (
                    <span className="font-medium text-gray-500">Resend in {formatTime(timer)}</span>
                ) : (
                    <button
                        type="button"
                        onClick={handleResendCode}
                        disabled={resending}
                        className="font-medium text-[#EE3638] hover:text-[#EE3638]/80 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {resending ? "Sending..." : "Resend code"}
                    </button>
                )}
            </p>
        </>
    );
}
