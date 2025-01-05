import { Metadata } from "next";
import { redirect } from "next/navigation";

import { ArticleList } from "@/components/articles/list";
import { DashboardShell } from "@/components/shell";

import { Article, ArticlePagination } from "@/types/articles";
import { API_URL, article } from "@/config/routes";
import { getSession } from "@/actions/auth";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export const metadata: Metadata = {
  title: "Article List",
  description: "Lorem ipsum dolor sit amet.",
};

async function getArticles(token: string): Promise<ArticlePagination> {
  const data = await fetch(`${API_URL}/api/${article.list}`, {
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
    <DashboardShell>
      {/* <ArticleList /> */}
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={articles.data ?? []} />
      </div>
    </DashboardShell>
  );
}
