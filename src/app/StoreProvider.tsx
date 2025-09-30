"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "@/lib/store";
import { setUser, setAccToken, setRefToken } from "@/lib/features/auth/authSlice";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore | null>(null);
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore();
        // Set the initial state from localStorage
        storeRef.current.dispatch(setUser(JSON.parse(localStorage.getItem("user") || "null")));
        storeRef.current.dispatch(setAccToken(localStorage.getItem("accToken") || ""));
        storeRef.current.dispatch(setRefToken(localStorage.getItem("refToken") || ""));
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}
