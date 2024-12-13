"use client";

import { Button } from "@/components/ui/button";
import { DNSEntry } from "@/lib/definitions";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit } from "lucide-react";
import DNSDialogForm from "@/components/dns-dialog-form";
import DeleteDialogButton from "@/components/delete-dialog-button";

export const columns: ColumnDef<DNSEntry>[] = [
  {
    id: "select",
    meta: { width: "120px" },
    header: ({ table }) => (
      <div className="w-1/12">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="flex items-center justify-center ml-4"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-[60px]">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="flex items-center justify-center ml-4"
        />
      </div>
    ),
  },
  {
    accessorKey: "domain_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Domain Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("domain_name")}</div>,
  },
  {
    accessorKey: "ip_address",
    header: "IP Address",
    cell: ({ row }) => <div className="">{row.getValue("ip_address")}</div>,
  },
  {
    accessorKey: "ip_class",
    header: "IP Class",
    cell: ({ row }) => <div className="">{row.getValue("ip_class")}</div>,
  },
  {
    id: "actions",
    meta: { width: "120px" },
    cell: ({ row }) => (
      <div className=" flex items-center gap-2">
        <DNSDialogForm mode="edit" initialData={row.original}>
          <Button
            variant="ghost"
            size="icon"
            >
            <Edit />
          </Button>
        </DNSDialogForm>
        <DeleteDialogButton entry_id={row.original.id} domain_name={row.original.domain_name} />
      </div>
    ),
  },
];
