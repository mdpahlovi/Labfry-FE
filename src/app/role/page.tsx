import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export default function RolePage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-[662px] flex flex-col items-center">
                <Image src="/logo.png" alt="Logo" width={118} height={50} />
                <div className="mt-6 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Select a Role</h2>
                    <p className="mt-2 text-gray-600">Choose the option that best describes you so we can tailor your experience.</p>
                </div>
                <div className="mt-10 mx-16 w-[530px] grid gap-5">
                    <Link href="/login?role=customer">
                        <Button variant="outline" className="w-full">
                            I’m a Customer
                        </Button>
                    </Link>
                    <Link href="/login?role=provider">
                        <Button variant="secondary" className="w-full">
                            I’m a Service Provider
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
