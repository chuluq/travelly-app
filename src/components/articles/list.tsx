"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { Icons } from "@/components/icons";
import { PageTitle } from "@/components/page-title";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { PATH_ARTICLE } from "@/config/routes";
import { Article, ArticlePagination } from "@/types/articles";
import { deleteArticle } from "@/actions/article";

interface ArticleListProps {
  articles: ArticlePagination;
}

export const ArticleList = ({ articles }: ArticleListProps) => {
  const router = useRouter();

  const {
    data,
    meta: { pagination },
  } = articles;

  const [deleteConfirmationDialog, setDeleteConfirmationDialog] =
    React.useState<boolean>(false);
  const [deletedId, setDeletedId] = React.useState<string>("");

  const columns: ColumnDef<Article>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const articleRow = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(articleRow.documentId)
                }
              >
                Copy article ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={PATH_ARTICLE.detail(articleRow.documentId)}>
                  View article details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button asChild>
                  <Link href={PATH_ARTICLE.update(articleRow.documentId)}>
                    <Icons.edit />
                    Edit article
                  </Link>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setDeletedId(articleRow.documentId);
                    setDeleteConfirmationDialog(!deleteConfirmationDialog);
                  }}
                >
                  <Icons.delete /> Delete
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Title" />;
      },
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ getValue }) => format(getValue() as string, "dd MMM yyyy"),
    },
  ];

  return (
    <>
      <div className="container mx-auto pb-10">
        <div>
          <div className="flex items-center justify-between py-4">
            <PageTitle title="Article List" />
            <Button onClick={() => router.push(PATH_ARTICLE.create)}>
              <Icons.create />
              New
            </Button>
          </div>
          <DataTable
            columns={columns}
            data={data ?? []}
            pagination={pagination}
          />
        </div>
      </div>
      <AlertDialog
        open={deleteConfirmationDialog}
        onOpenChange={setDeleteConfirmationDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => await deleteArticle(deletedId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
