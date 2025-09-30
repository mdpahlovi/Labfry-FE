"use client";

import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";

const resetPasswordSchema = Yup.object({
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
});

export default function ResetPasswordPage() {
    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: resetPasswordSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div className="w-full max-w-[480px]">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Enter your new password</h2>
                <p className="mt-4 text-gray-600">
                    Please enter the email address associated with your account, and we&apos;ll email you a link to reset your password.
                </p>
            </div>
            <form className="mt-10 space-y-10" onSubmit={formik.handleSubmit}>
                <div className="space-y-6">
                    <TextField
                        label="New Password"
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.errors.password}
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={formik.errors.confirmPassword}
                    />
                </div>
                <Button type="submit" variant="primary" className="w-full">
                    Reset Password
                </Button>
            </form>
        </div>
    );
}
