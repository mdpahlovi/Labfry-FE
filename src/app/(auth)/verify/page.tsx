import { isInvalidEmail, isInvalidFlow, isInvalidRole } from "@/utils/utils";
import { redirect } from "next/navigation";
import { VerifyForm } from "./client";

export default async function VerifyPage(props: { searchParams?: Promise<{ email?: string; role?: string; flow?: string }> }) {
    const email = await props.searchParams?.then((params) => params?.email);
    const role = await props.searchParams?.then((params) => params?.role);
    const flow = await props.searchParams?.then((params) => params?.flow);

    if (isInvalidEmail(email) || isInvalidRole(role) || isInvalidFlow(flow)) {
        return redirect("/role");
    }

    return (
        <div className="w-full max-w-[480px]">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Please check your email!</h2>
                <p className="mt-4 text-gray-600">
                    We&apos;ve emailed a 6-digit confirmation code to acb@domain, please enter the code in below box to verify your email.
                </p>
            </div>
            <VerifyForm email={email!} role={role!} flow={flow!} />
        </div>
    );
}
