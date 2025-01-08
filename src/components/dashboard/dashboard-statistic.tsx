import { getArticles } from "@/actions/article";

export const DashboardStatistic = async () => {
  const articles = await getArticles({ page: 1, pageSize: 10 });

  console.log(articles.data);
  return <div>DashboardStatistic</div>;
};
