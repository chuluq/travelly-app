import { Metadata } from "next";

import { ArticleList } from "@/components/articles/list";
import { DashboardShell } from "@/components/shell";
// import { API_URL, article } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Article List",
  description: "Lorem ipsum dolor sit amet.",
};

export default async function ArticlePage() {
  // const data = await fetch(`${API_URL}/api/${article.list}`);
  // const articles = await data.json();
  // console.log("articles", articles);

  return (
    <DashboardShell>
      <ArticleList />
    </DashboardShell>
  );
}
