import { SessionOptions } from "iron-session";
import { secretKey } from "./constants";

export interface SessionData {
  userId?: string;
  accessToken?: string;
  isAuthenticated: boolean;
}

export const defaultSession: SessionData = {
  isAuthenticated: false,
};

export const sessionOptions: SessionOptions = {
  password: secretKey!,
  cookieName: "travelly-session",
  cookieOptions: {
    httpOnly: true,
    // secure only works in `https` environment
    secure: process.env.NODE_ENV === "production",
  },
};
