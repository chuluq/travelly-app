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
import { PATH_CATEGORY, PATH_DASHBOARD } from "@/config/routes";

export const metadata: Metadata = {
  title: "Update a Category",
  description: "Lorem ipsum dolor sit amet.",
};

export default async function UpdateCategoryPage() {
  const session = await getSession();

  if (!session.accessToken) {
    redirect("/login");
  }

  return (
    <DashboardShell className="px-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={PATH_DASHBOARD}>Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={PATH_CATEGORY.list}>
              Categories
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage>Update Category</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <CreateCategory />
    </DashboardShell>
  );
}
