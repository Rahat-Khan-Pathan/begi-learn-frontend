import { create } from "zustand";
import { IUser } from "../utils/types";

interface AtuhState {
  isLoading: boolean;
  userToken: string;
  userObject: IUser | null;
  login: (token: string, user: IUser) => void;
  setUser: (user: IUser) => void;
  logout: () => void;
  checkAuthStatus: () => void;
}

const authToken = "auth-token";
const authUser = "auth-user";

const useAuthStore = create<AtuhState>((set) => ({
  isLoading: true,
  userToken: "",
  userObject: null,
  setUser: (user: IUser) => {
    localStorage.setItem(authUser, JSON.stringify(user || null));
    set({ userObject: user });
  },
  login: (token: string, user: IUser) => {
    localStorage.setItem(authToken, token);
    localStorage.setItem(authUser, JSON.stringify(user || null));
    set({ userToken: token, userObject: user });
  },
  logout: () => {
    localStorage.removeItem(authToken);
    localStorage.removeItem(authUser);
    set({ userToken: "", userObject: null });
  },
  checkAuthStatus: () => {
    const token = localStorage.getItem(authToken);
    const user = localStorage.getItem(authUser);
    set({ userToken: token || "", userObject: user && user!="undefined" ? JSON.parse(user) : null});
    set({ isLoading: false });
  },
}));

export default useAuthStore;
