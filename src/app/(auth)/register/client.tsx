"use client";

import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import TextField from "@/components/ui/TextField";
import axios from "@/utils/axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";

const registerSchema = Yup.object({
    firstName: Yup.string().max(15, "Must be 15 characters or less").required("First name is required"),
    lastName: Yup.string().max(20, "Must be 20 characters or less").required("Last name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    agreeTerms: Yup.boolean().required("Agree to terms is required"),
});

export function RegisterForm({ role }: { role: string }) {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            agreeTerms: false,
        },
        validationSchema: registerSchema,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onSubmit: async ({ confirmPassword, agreeTerms, ...value }) => {
            try {
                await axios.post("/auth/signup", { ...value, role: role.toUpperCase() });
                toast.success("Verification code sent successfully. Please check your email");
                router.push(`/verify?email=${value.email}&role=${role}&flow=register`);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                toast.error(error?.message || "Something went wrong");
            }
        },
    });

    return (
        <form className="mt-10 space-y-6" onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
                <TextField
                    label="First Name"
                    type="text"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.errors.firstName}
                />
                <TextField
                    label="Last Name"
                    type="text"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.errors.lastName}
                />
            </div>
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
            <TextField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={formik.errors.confirmPassword}
            />
            <Checkbox
                label="I agree to the Terms of Service and Privacy Policy"
                name="agreeTerms"
                value={formik.values.agreeTerms}
                onChange={formik.handleChange}
                error={formik.errors.agreeTerms}
            />
            <Button type="submit" variant="primary" className="w-full" loading={formik.isSubmitting}>
                Create Account
            </Button>
        </form>
    );
}
