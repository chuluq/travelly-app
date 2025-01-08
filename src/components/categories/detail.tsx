import React from "react";
import { format } from "date-fns";

import { Category } from "@/types/category";

export const DetailCategory = ({ category }: { category: Category }) => {
  return (
    <div className="space-y-4">
      {category && (
        <>
          <p className="text-2xl font-bold">{category?.name}</p>
          <p className="text-lg">{category?.description}</p>
          <p className="text-sm">
            Created at {format(category?.createdAt, "dd MMM yyyy")}
          </p>
        </>
      )}
    </div>
  );
};
