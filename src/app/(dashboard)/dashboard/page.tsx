import { Metadata } from "next";
import { redirect } from "next/navigation";

import { DashboardShell } from "@/components/shell";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import { getSession } from "@/actions/auth";
import { DashboardStatistic } from "@/components/dashboard/dashboard-statistic";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Lorem ipsum dolor sit amet.",
};

export default async function DashboardPage() {
  const session = await getSession();

  if (!session.accessToken) {
    redirect("/login");
  }

  return (
    <DashboardShell className="px-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <DashboardStatistic />
    </DashboardShell>
  );
}
