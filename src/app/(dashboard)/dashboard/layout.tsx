import { redirect } from "next/navigation";

import { MainNav } from "@/components/main-nav";
import { DashboardNav } from "@/components/nav";
import { SiteFooter } from "@/components/site-footer";
import { UserAccountNav } from "@/components/user-account-nav";

import { getMe, getSession } from "@/actions/auth";
import { dashboardConfig } from "@/config/dashboard";
import { CounterStoreProvider } from "@/providers/counter-store-provider";
import { User } from "@/types/user";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getSession();

  if (!session.accessToken) {
    redirect("/login");
  }

  const user = (await getMe()) as User;

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
                image: null,
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
