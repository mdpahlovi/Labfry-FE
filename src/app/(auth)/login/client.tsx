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

export function LoginForm({ role }: { role: string }) {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            alert(JSON.stringify({ role, ...values }, null, 2));
        },
    });

    return (
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
    );
}
