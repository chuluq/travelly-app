import { DashboardConfig } from "@/types";
import {
  PATH_ARTICLE,
  PATH_CATEGORY,
  PATH_COMMENT,
  PATH_DASHBOARD,
  PATH_UPLOAD,
} from "./routes";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "FAQ",
      href: "/faq",
      disabled: true,
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Dashboard",
      href: PATH_DASHBOARD,
      icon: "dashboard",
    },
    {
      title: "Articles",
      href: PATH_ARTICLE.list,
      icon: "article",
    },
    {
      title: "Comments",
      href: PATH_COMMENT.list,
      icon: "comment",
    },
    {
      title: "Category",
      href: PATH_CATEGORY.list,
      icon: "category",
    },
    {
      title: "Upload",
      href: PATH_UPLOAD,
      icon: "upload",
    },
  ],
};
