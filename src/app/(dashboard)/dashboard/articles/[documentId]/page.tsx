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
import { API_URL, PATH_ARTICLE, PATH_DASHBOARD } from "@/config/routes";
import { DetailArticle } from "@/components/articles/detail";

export const metadata: Metadata = {
  title: "Detail Article",
  description: "Lorem ipsum dolor sit amet.",
};

async function getArticleDetail(documentId: string, token: string) {
  const res = await fetch(`${API_URL}/api/articles/${documentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const article = await res.json();

  return article;
}

export default async function ArticleDetailPage({
  params,
}: {
  params: { documentId: string };
}) {
  const documentId = params.documentId;
  const session = await getSession();

  if (!session.accessToken) {
    redirect("/login");
  }

  const article = await getArticleDetail(
    documentId,
    session.accessToken as string
  );

  return (
    <DashboardShell className="px-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={PATH_DASHBOARD}>Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={PATH_ARTICLE.list}>Articles</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Detail Article</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <DetailArticle article={article.data ?? null} />
    </DashboardShell>
  );
}
