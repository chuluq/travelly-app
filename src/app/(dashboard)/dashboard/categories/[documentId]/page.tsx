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

import { getSession } from "@/actions/auth";
import { PATH_CATEGORY, PATH_DASHBOARD } from "@/config/routes";
import { DetailCategory } from "@/components/categories/detail";
import { getDetailCategory } from "@/actions/categories";

export const metadata: Metadata = {
  title: "Detail Category",
  description: "Lorem ipsum dolor sit amet.",
};

export default async function CategoryDetailPage({
  params,
}: {
  params: { documentId: string };
}) {
  const documentId = params.documentId;
  const session = await getSession();

  if (!session.accessToken) {
    redirect("/login");
  }

  const category = await getDetailCategory(documentId);

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
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Detail Article</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <DetailCategory category={category.data} />
    </DashboardShell>
  );
}
