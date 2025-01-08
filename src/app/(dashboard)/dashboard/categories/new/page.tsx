import { Metadata } from "next";
import { redirect } from "next/navigation";

import { DashboardShell } from "@/components/shell";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CreateCategory } from "@/components/categories/create";

import { getSession } from "@/actions/auth";

export const metadata: Metadata = {
  title: "Create a new Category",
  description: "Lorem ipsum dolor sit amet.",
};

export default async function CreateCategoryPage() {
  const session = await getSession();

  if (!session.accessToken) {
    redirect("/login");
  }

  return (
    <DashboardShell className="px-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Categories</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <CreateCategory />
    </DashboardShell>
  );
}
