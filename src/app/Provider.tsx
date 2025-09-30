"use client";

import { setAccToken, setRefToken, setUser } from "@/lib/features/auth/authSlice";
import { AppStore, makeStore } from "@/lib/store";
import { useEffect, useRef } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer } from "react-toastify";

export default function Provider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore | null>(null);

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
        }
    }, []);

    return (
        <ReduxProvider store={storeRef.current}>
            {children}
            <ToastContainer />
        </ReduxProvider>
    );
}
