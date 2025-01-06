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
import { ArticleList } from "@/components/articles/list";

import { ArticlePagination } from "@/types/articles";
import { API_URL } from "@/config/routes";
import { getSession } from "@/actions/auth";

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
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Articles</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ArticleList articles={articles} />
    </DashboardShell>
  );
}
