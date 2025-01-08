"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { PATH_ARTICLE, PATH_CATEGORY } from "@/config/routes";
import { getCategories } from "@/actions/categories";
import { Category, CategoryPagination } from "@/types/category";

export const CategoryList = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [deleteConfirmationDialog, setDeleteConfirmationDialog] =
    React.useState<boolean>(false);
  const [deletedId, setDeletedId] = React.useState<string>("");
  const [category, setCategory] = React.useState<CategoryPagination>();

  React.useEffect(() => {
    async function fetchArticles() {
      setIsLoading(true);
      const categories = await getCategories();
      setCategory(categories);
      setIsLoading(false);
    }
    fetchArticles();
  }, []);

  const columns: ColumnDef<Category>[] = [
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
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ getValue }) => {
        if (!getValue()) {
          return <p>-</p>;
        }
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ getValue }) => format(getValue() as string, "dd MMM yyyy"),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const categoryRow = row.original;

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
                  navigator.clipboard.writeText(categoryRow.documentId)
                }
              >
                Copy article ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={PATH_ARTICLE.detail(categoryRow.documentId)}>
                  View article details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button asChild size="sm" className="w-full">
                  <Link href={PATH_ARTICLE.update(categoryRow.documentId)}>
                    <Icons.edit />
                    Edit
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
                    setDeletedId(categoryRow.documentId);
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
  ];

  return (
    <>
      <div className="container mx-auto pb-10">
        <div className="flex flex-col">
          <div className="flex items-center justify-between py-4">
            <PageTitle title="Category List" />
            <Button onClick={() => router.push(PATH_CATEGORY.create)}>
              <Icons.create />
              New
            </Button>
          </div>
          {category && (
            <DataTable
              columns={columns}
              data={category?.data ?? []}
              rowCount={category?.meta?.pagination?.total}
              isLoading={isLoading}
            />
          )}
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
              onClick={async () => {
                // await deleteCategory(deletedId);
                console.log(deletedId);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
