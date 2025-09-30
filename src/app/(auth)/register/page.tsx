import Link from "next/link";
import { redirect } from "next/navigation";
import { RegisterForm } from "./client";
import { isInvalidRole } from "@/utils/utils";

export default async function SignupPage(props: { searchParams?: Promise<{ role?: string }> }) {
    const role = await props.searchParams?.then((params) => params?.role);

    if (isInvalidRole(role)) {
        return redirect("/role");
    }

    return (
        <div className="w-full max-w-[480px]">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Create your account</h2>
                <p className="mt-2 text-gray-600">When sports Meets smart Tech.</p>
            </div>
            <RegisterForm role={role!} />
            <div className="mt-12 relative flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-2 flex-shrink text-sm text-gray-600">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <p className="mt-8 text-sm text-center">
                Already have an account?{" "}
                <Link href={`/login?role=${role}`} className="font-medium text-[#EE3638] hover:text-[#EE3638]/80">
                    Sign in
                </Link>
            </p>
        </div>
    );
}
