import Image from "next/image";

import { Article } from "@/types/articles";
import { format } from "date-fns";

interface DetailArticleProps {
  article: Article;
}

export const DetailArticle = ({ article }: DetailArticleProps) => {
  return (
    <div className="flex flex-col gap-4">
      <figure className="flex flex-col space-y-2">
        <Image
          src={article.cover_image_url}
          alt={article.title}
          width={250}
          height={250}
        />
        <figcaption className="font-bold text-4xl">{article.title}</figcaption>
      </figure>
      <div className="space-y-4">
        <p className="text-lg">{article.description}</p>
        <p className="text-sm">
          Created at {format(article.createdAt, "dd MMM yyyy")}
        </p>
      </div>
    </div>
  );
};
