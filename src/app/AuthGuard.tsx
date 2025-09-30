"use client";

import { useAppSelector } from "@/lib/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const privateRoutes = ["/", "/profile"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const states = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (privateRoutes.includes(pathname)) {
            if (!states.user || !states.accToken || !states.refToken) {
                router.replace("/role");
            }
        }
    }, [pathname, router, states.user, states.accToken, states.refToken]);

    return <>{children}</>;
}
