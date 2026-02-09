import { Session } from "next-auth";

export interface ExtendedUser {
  id?: string;
  role?: string;
  plan?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export interface ExtendedSession extends Session {
  user: ExtendedUser;
}

export function isAdmin(session: Session | null): boolean {
  if (!session?.user) return false;
  return (session.user as ExtendedUser).role === "admin";
}

export function getUserRole(session: Session | null): string | undefined {
  if (!session?.user) return undefined;
  return (session.user as ExtendedUser).role;
}
