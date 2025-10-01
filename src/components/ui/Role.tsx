"use client";

import { useAppSelector } from "@/lib/hooks";

export default function Role() {
    const { user } = useAppSelector((state) => state.auth);

    return user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase() : "";
}
