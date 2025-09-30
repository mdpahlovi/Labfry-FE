import { isInvalidEmail, isInvalidFlow, isInvalidRole } from "@/utils/utils";
import { redirect } from "next/navigation";
import ResetPasswordForm from "./client";

export default async function ResetPasswordPage(props: { searchParams?: Promise<{ email?: string; role?: string; flow?: string }> }) {
    const email = await props.searchParams?.then((params) => params?.email);
    const role = await props.searchParams?.then((params) => params?.role);
    const flow = await props.searchParams?.then((params) => params?.flow);

    if (isInvalidEmail(email) || isInvalidRole(role) || isInvalidFlow(flow)) {
        return redirect("/role");
    }

    return (
        <div className="w-full max-w-[480px]">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Enter your new password</h2>
                <p className="mt-4 text-gray-600">
                    Please enter the email address associated with your account, and we&apos;ll email you a link to reset your password.
                </p>
            </div>
            <ResetPasswordForm email={email!} role={role!} flow={flow!} />
        </div>
    );
}
