import { isInvalidRole } from "@/utils/utils";
import { redirect } from "next/navigation";
import { ForgotPasswordForm } from "./client";

export default async function ForgotPasswordPage(props: { searchParams?: Promise<{ role?: string }> }) {
    const role = await props.searchParams?.then((params) => params?.role);

    if (isInvalidRole(role)) {
        return redirect("/role");
    }

    return (
        <div className="w-full max-w-[480px]">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Forgot your password?</h2>
                <p className="mt-4 text-gray-600">
                    Please enter the email address associated with your account, and we&apos;ll email you a link to reset your password.
                </p>
            </div>
            <ForgotPasswordForm role={role!} />
        </div>
    );
}
