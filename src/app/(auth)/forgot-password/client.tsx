"use client";

import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import axios from "@/utils/axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";

const forgetPasswordSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
});

export function ForgotPasswordForm({ role }: { role: string }) {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: forgetPasswordSchema,
        onSubmit: async (values) => {
            try {
                await axios.post("/auth/forgot-password", { email: values.email });
                toast.success("Password reset code sent successfully. Please check your email");
                router.push(`/verify?email=${values.email}&role=${role}&flow=password`);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                toast.error(error?.message || "Something went wrong");
            }
        },
    });

    return (
        <form className="mt-10 space-y-10" onSubmit={formik.handleSubmit}>
            <TextField
                label="Email address"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
            />
            <Button type="submit" variant="primary" className="w-full" loading={formik.isSubmitting}>
                Reset Password
            </Button>
        </form>
    );
}
