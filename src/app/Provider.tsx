"use client";

import { setAccToken, setRefToken, setUser } from "@/lib/features/auth/authSlice";
import { AppStore, makeStore } from "@/lib/store";
import { useEffect, useRef, useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer } from "react-toastify";

export default function Provider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    useEffect(() => {
        if (typeof window !== "undefined" && storeRef.current) {
            const user = JSON.parse(localStorage.getItem("user") || "null");
            const accToken = localStorage.getItem("accToken") || "";
            const refToken = localStorage.getItem("refToken") || "";

            if (user) storeRef.current.dispatch(setUser(user));
            if (accToken) storeRef.current.dispatch(setAccToken(accToken));
            if (refToken) storeRef.current.dispatch(setRefToken(refToken));

            setIsMounted(true);
        }
    }, []);

    if (!isMounted) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EE3638]"></div>
            </div>
        );
    }

    return (
        <ReduxProvider store={storeRef.current}>
            {children}
            <ToastContainer />
        </ReduxProvider>
    );
}
