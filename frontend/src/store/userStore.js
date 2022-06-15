import create from "zustand";
import { devtools } from "zustand/middleware";

export const useUserStore = create(
	devtools((set) => ({
		user: "",
		accessToken: "",
		auth: "",
		setUser: (value) => set(() => ({ user: value })),
		setAccessToken: (value) => set(() => ({ accessToken: value })),
		setAuth: (value) => set(() => ({ auth: value })),
	}))
);
