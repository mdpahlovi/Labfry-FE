import Image from "next/image";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <Image src="/logo.png" alt="Logo" width={118} height={50} className="absolute top-6 left-8" />
            {children}
        </div>
    );
}
