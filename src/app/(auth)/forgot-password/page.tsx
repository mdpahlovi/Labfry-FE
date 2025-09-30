"use client";

import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import * as Yup from "yup";
import { useFormik } from "formik";

const forgetPasswordSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
});

export default function ForgotPasswordPage() {
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: forgetPasswordSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div className="w-full max-w-[480px]">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Forgot your password?</h2>
                <p className="mt-4 text-gray-600">
                    Please enter the email address associated with your account, and we&apos;ll email you a link to reset your password.
                </p>
            </div>
            <form className="mt-10 space-y-10" onSubmit={formik.handleSubmit}>
                <TextField
                    label="Email address"
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.errors.email}
                />
                <Button type="submit" variant="primary" className="w-full">
                    Reset Password
                </Button>
            </form>
        </div>
    );
}
