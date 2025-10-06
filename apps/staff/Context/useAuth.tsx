"use client";
import { createContext, useEffect, useState } from "react";
import { UserProfile } from "@/Models/User";
import { useRouter } from "next/navigation";
import { loginAPI, registerAPI, profileAPI } from "@/Services/AuthService";
import { toast } from "react-toastify";
import React from "react";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  loginUser: (email: string, password: string) => void;
  registerUser: (
    email: string,
    password: string,
    confirmPassword: string
  ) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    const localToken = localStorage.getItem("token");
    if (localUser && localToken) {
      setToken(localToken);
      fetchProfile(localToken);
    }
    setIsReady(true);
  }, []);

  const fetchProfile = async (token: string) => {
    try {
      const profile = await profileAPI(token);
      if (profile) {
        localStorage.setItem("user", JSON.stringify(profile));
        setUser(profile);
      }
    } catch {
      toast.warning("Failed to fetch profile");
    }
  };

  const registerUser = async (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    await registerAPI(email, password, confirmPassword)
      .then(async (res) => {
        if (res) {
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
          await fetchProfile(res.data.token);
          toast.success("Register Success!");
          router.push("/dashboard");
        }
      })
      .catch(() => toast.warning("Server error occurred"));
  };

  const loginUser = async (email: string, password: string) => {
    await loginAPI(email, password)
      .then(async (res) => {
        if (res) {
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
          await fetchProfile(res.data.token);
          toast.success("Login Success!");
          router.push("/dashboard");
        }
      })
      .catch(() => toast.warning("Server error occurred"));
  };

  const isLoggedIn = () => !!user;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    router.push("/");
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
