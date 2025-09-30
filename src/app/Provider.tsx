"use client";

import { setAccToken, setRefToken, setUser } from "@/lib/features/auth/authSlice";
import { AppStore, makeStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer } from "react-toastify";

export default function Provider({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const storeRef = useRef<AppStore | null>(null);
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore();
        // Set the initial state from localStorage
        if (typeof window !== "undefined") {
            const user = JSON.parse(localStorage.getItem("user") || "null");
            const accToken = localStorage.getItem("accToken") || "";
            const refToken = localStorage.getItem("refToken") || "";

            if (user && accToken && refToken) {
                storeRef.current.dispatch(setUser(user));
                storeRef.current.dispatch(setAccToken(accToken));
                storeRef.current.dispatch(setRefToken(refToken));
            } else {
                router.replace("/role");
            }
        }
    }

    return (
        <ReduxProvider store={storeRef.current}>
            {children} <ToastContainer />
        </ReduxProvider>
    );
}
