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
            if (action.payload) {
                localStorage.setItem("user", JSON.stringify(action.payload));
            } else {
                localStorage.removeItem("user");
            }
        },
        setAccToken: (state, action: PayloadAction<string>) => {
            state.accToken = action.payload;
            if (action.payload) {
                localStorage.setItem("accToken", action.payload);
            } else {
                localStorage.removeItem("accToken");
            }
        },
        setRefToken: (state, action: PayloadAction<string>) => {
            state.refToken = action.payload;
            if (action.payload) {
                localStorage.setItem("refToken", action.payload);
            } else {
                localStorage.removeItem("refToken");
            }
        },
    },
});

export const { setUser, setAccToken, setRefToken } = authSlice.actions;
export default authSlice.reducer;
