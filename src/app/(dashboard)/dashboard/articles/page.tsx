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

import { ArticlePagination } from "@/types/articles";
import { API_URL } from "@/config/routes";
import { getSession } from "@/actions/auth";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export const metadata: Metadata = {
  title: "Article List",
  description: "Lorem ipsum dolor sit amet.",
};

async function getArticles(token: string): Promise<ArticlePagination> {
  const data = await fetch(`${API_URL}/api/articles`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const articles = await data.json();

  return articles;
}

export default async function ArticlePage() {
  const session = await getSession();

  if (!session.accessToken) {
    redirect("/login");
  }

  const articles = await getArticles(session.accessToken);

  return (
    <DashboardShell className="px-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Articles</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="container mx-auto  pb-10">
        <DataTable columns={columns} data={articles.data ?? []} />
      </div>
    </DashboardShell>
  );
}
