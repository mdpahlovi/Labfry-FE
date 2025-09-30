import Button from "@/components/ui/Button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isInvalidEmail, isInvalidFlow, isInvalidRole } from "@/utils/utils";
import { LoginUser } from "./client";

export default async function SuccessPage(props: { searchParams?: Promise<{ email?: string; role?: string; flow?: string }> }) {
    const email = await props.searchParams?.then((params) => params?.email);
    const role = await props.searchParams?.then((params) => params?.role);
    const flow = await props.searchParams?.then((params) => params?.flow);

    if (isInvalidEmail(email) || isInvalidRole(role) || isInvalidFlow(flow)) {
        return redirect("/role");
    }

    return (
        <div className="w-full max-w-[480px] flex flex-col items-center gap-10">
            <div className="h-20 w-20 rounded-full bg-[#06C270] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M21.8606 5.39176C22.2875 6.49635 21.6888 7.2526 20.5301 7.99754C19.5951 8.5986 18.4039 9.24975 17.1417 10.363C14.7896 12.4375 12.8015 14.9404 11.0046 17.5005C10.6645 17.9851 10.3283 18.473 10.011 18.9729C9.60281 19.6187 8.86895 20.0096 8.08206 19.9998C7.295 19.99 6.57208 19.5812 6.18156 18.9251C4.95203 16.8595 4.07719 16.3386 3.87929 16.2416C2.81482 16.0833 2 15.1998 2 14.1335C2 12.9554 2.99489 12.0003 4.22216 12.0003C5.08887 12.0323 5.89341 12.3727 6.60756 12.8526C7.06369 13.1591 7.54689 13.5645 8.04948 14.0981C9.85756 11.6319 11.8372 9.24764 14.1349 7.22116C15.5748 5.95115 17.2396 4.76235 19.0042 4.13381C20.1549 3.72397 21.4337 4.28718 21.8606 5.39176Z"
                        fill="white"
                    />
                </svg>
            </div>
            {flow === "register" ? (
                <>
                    <h2 className="text-3xl text-center font-bold tracking-tight text-gray-900">Account Created Successfully!</h2>
                    <Link href="/">
                        <Button className="w-full">Go to Home</Button>
                    </Link>
                    <LoginUser email={email!} role={role!} flow={flow!} />
                </>
            ) : (
                <>
                    <h2 className="text-3xl text-center font-bold tracking-tight text-gray-900">Password Changed Successfully!</h2>
                    <Link href={`/login?role=${role}`}>
                        <Button className="w-full">Go to Login</Button>
                    </Link>
                </>
            )}
        </div>
    );
}
