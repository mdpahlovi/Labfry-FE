"use client";

import { setAccToken, setRefToken, setUser } from "@/lib/features/auth/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import axios from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export function LoginUser({ email }: { email: string; role: string; flow: string }) {
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        axios
            .post("/auth/signup-complete", { email })
            .then((response) => {
                const { user, accToken, refToken } = response.data;

                if (user && accToken && refToken) {
                    dispatch(setUser(user));
                    dispatch(setAccToken(accToken));
                    dispatch(setRefToken(refToken));

                    setTimeout(() => {
                        router.replace("/");
                    }, 3000);
                } else {
                    toast.error("Something went wrong");
                }
            })
            .catch((error) => {
                toast.error(error?.message || "Something went wrong");
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email]);

    return null;
}
