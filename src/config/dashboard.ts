import { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
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
      href: "/dashboard",
      icon: "dashboard",
    },
    {
      title: "Articles",
      href: "/dashboard/articles",
      icon: "article",
    },
    {
      title: "Comments",
      href: "/dashboard/comments",
      icon: "comment",
    },
    {
      title: "Category",
      href: "/dashboard/category",
      icon: "category",
    },
    {
      title: "Upload",
      href: "/dashboard/upload",
      icon: "upload",
    },
  ],
};
