"use client";

import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import TextField from "@/components/ui/TextField";
import { useFormik } from "formik";
import Link from "next/link";
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

export default function SignupPage() {
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
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div className="w-full max-w-[480px]">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Create your account</h2>
                <p className="mt-2 text-gray-600">When sports Meets smart Tech.</p>
            </div>
            <form className="mt-10 space-y-6" onSubmit={formik.handleSubmit}>
                <div className="space-y-4">
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
                <Button type="submit" variant="primary" className="w-full">
                    Create Account
                </Button>
            </form>
            <div className="mt-12 relative flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 flex-shrink text-sm text-gray-600">Or</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <p className="mt-8 text-sm text-center">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-[#EE3638] hover:text-[#EE3638]/80">
                    Sign in
                </Link>
            </p>
        </div>
    );
}
