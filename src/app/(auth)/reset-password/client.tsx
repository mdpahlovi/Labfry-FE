"use client";

import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import axios from "@/utils/axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";

const resetPasswordSchema = Yup.object({
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
});

export default function ResetPasswordForm({ email, role, flow }: { email: string; role: string; flow: string }) {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: resetPasswordSchema,
        onSubmit: async ({ password }) => {
            try {
                await axios.post("/auth/reset-password", { email, password });
                toast.success("Password reset successfully");
                router.push(`/success?email=${email}&role=${role}&flow=${flow}`);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                toast.error(error?.message || "Something went wrong");
            }
        },
    });

    return (
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
            <Button type="submit" variant="primary" className="w-full" loading={formik.isSubmitting}>
                Reset Password
            </Button>
        </form>
    );
}
