import { DashboardConfig } from "@/types";
import { PATH_ARTICLE, PATH_CATEGORY, PATH_DASHBOARD } from "./routes";

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
      title: "Category",
      href: PATH_CATEGORY.list,
      icon: "category",
    },
  ],
};
