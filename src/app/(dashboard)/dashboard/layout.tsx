import { redirect } from "next/navigation";

import { MainNav } from "@/components/main-nav";
import { DashboardNav } from "@/components/nav";
import { SiteFooter } from "@/components/site-footer";
import { UserAccountNav } from "@/components/user-account-nav";

import { getSession } from "@/actions/auth";
import { dashboardConfig } from "@/config/dashboard";
import { API_URL, auth } from "@/config/routes";
import { CounterStoreProvider } from "@/providers/counter-store-provider";
import { User } from "@/types/articles";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

async function getMe(token: string) {
  const res = await fetch(`${API_URL}/api/${auth.getMe}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user = await res.json();

  return user;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getSession();

  if (!session.accessToken) {
    redirect("/login");
  }

  const user = (await getMe(session.accessToken as string)) as User;

  return (
    <CounterStoreProvider>
      <div className="flex min-h-screen flex-col space-y-6">
        <header className="sticky top-0 z-40 border-b bg-background px-4">
          <div className="container flex h-16 items-center justify-between py-4">
            <MainNav items={dashboardConfig.mainNav} />
            <UserAccountNav
              user={{
                username: user.username ?? "username",
                email: user.email ?? "user@example.com",
              }}
            />
          </div>
        </header>
        <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
          <aside className="hidden w-[200px] flex-col md:flex">
            <DashboardNav items={dashboardConfig.sidebarNav} />
          </aside>
          <main className="flex w-full flex-1 flex-col overflow-hidden">
            {children}
          </main>
        </div>
        <SiteFooter className="border-t px-4" />
      </div>
    </CounterStoreProvider>
  );
}
