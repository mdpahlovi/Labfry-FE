export function isInvalidEmail(email: string | undefined) {
    return !email || !email.includes("@") || !email.includes(".");
}

export function isInvalidFlow(flow: string | undefined) {
    return !flow || (flow !== "register" && flow !== "password");
}

export function isInvalidRole(role: string | undefined) {
    return !role || (role !== "customer" && role !== "provider");
}
