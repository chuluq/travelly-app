import useSWR from "swr";

import { API_URL } from "@/config/routes";
import { fetchWithToken } from "@/lib/utils";
import { ArticlePagination } from "@/types/articles";
import { useAccessToken } from "./use-token";

export const useArticles = ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => {
  const session = useAccessToken();

  const { data, error, isLoading } = useSWR<ArticlePagination>(
    [
      `${API_URL}/api/articles?pagination[page]=${
        page + 1
      }&pagination[pageSize]=${pageSize}`,
      session.accessToken,
    ],
    ([url, token]) => fetchWithToken(url, token as string)
  );

  return {
    articles: data,
    isError: error,
    isLoading,
  };
};
