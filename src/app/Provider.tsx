"use client";

import { setAccToken, setRefToken, setUser } from "@/lib/features/auth/authSlice";
import { AppStore, makeStore } from "@/lib/store";
import { useRef } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer } from "react-toastify";

export default function Provider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore | null>(null);
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore();
        // Set the initial state from localStorage
        if (typeof window !== "undefined") {
            storeRef.current.dispatch(setUser(JSON.parse(localStorage.getItem("user") || "null")));
            storeRef.current.dispatch(setAccToken(localStorage.getItem("accToken") || ""));
            storeRef.current.dispatch(setRefToken(localStorage.getItem("refToken") || ""));
        }
    }

    return (
        <ReduxProvider store={storeRef.current}>
            {children} <ToastContainer />
        </ReduxProvider>
    );
}
