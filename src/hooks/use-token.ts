import { defaultSession, SessionData } from "@/lib/session";
import React from "react";

export const useAccessToken = () => {
  const [session, setSession] = React.useState<SessionData>(defaultSession);

  React.useEffect(() => {
    fetch("/api/session")
      .then((res) => res.json())
      .then((session) => {
        setSession(session);
      });
  }, []);

  return session;
};
