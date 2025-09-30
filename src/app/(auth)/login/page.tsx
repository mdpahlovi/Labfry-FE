"use client";

import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import TextField from "@/components/ui/TextField";
import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from "yup";

const loginSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

export default function LoginPage() {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div className="w-full max-w-[480px]">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Welcome to Labfry</h2>
                <p className="mt-2 text-gray-600">Please share your login details so you can access the website.</p>
            </div>
            <form className="mt-10 space-y-6" onSubmit={formik.handleSubmit}>
                <TextField
                    label="Email address"
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.errors.email}
                />
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.errors.password}
                />
                <div className="flex items-center justify-between">
                    <Checkbox
                        label="Remember me"
                        name="rememberMe"
                        value={formik.values.rememberMe}
                        onChange={formik.handleChange}
                        error={formik.errors.rememberMe}
                    />
                    <div className="text-sm">
                        <Link href="/forgot-password" className="font-medium text-[#EE3638] hover:text-[#EE3638]/80">
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
                <Link href="/register" className="font-medium text-[#EE3638] hover:text-[#EE3638]/80">
                    Get Started
                </Link>
            </p>
        </div>
    );
}
