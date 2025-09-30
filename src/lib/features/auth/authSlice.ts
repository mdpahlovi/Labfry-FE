import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    createdAt: string;
};

export type AuthState = {
    user: User | null;
    accToken: string;
    refToken: string;
};

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        accToken: "",
        refToken: "",
    } as AuthState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        setAccToken: (state, action: PayloadAction<string>) => {
            state.accToken = action.payload;
            localStorage.setItem("accToken", action.payload);
        },
        setRefToken: (state, action: PayloadAction<string>) => {
            state.refToken = action.payload;
            localStorage.setItem("refToken", action.payload);
        },
    },
});

export const { setUser, setAccToken, setRefToken } = authSlice.actions;
export default authSlice.reducer;
