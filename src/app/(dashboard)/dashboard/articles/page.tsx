import { API_URL, article } from "@/lib/constants";

export default async function ArticlePage() {
  const data = await fetch(`${API_URL}/api/${article.list}`);
  const articles = await data.json();
  console.log("articles", articles);

  return <div>ArticlePage</div>;
}
