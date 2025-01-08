"use client";

import { Payment } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import StudentPaymentStatus from "./customComponents/StudentPaymentStatus";
import { IoIosArrowDropright } from "react-icons/io";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MoreVertical } from "lucide-react";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "studentId",
    header: "StudentId",
    cell: ({ row }) => (
      <div className="text-[#6B7A99] flex items-center gap-2 pl-1">
        <IoIosArrowDropright size={14} className="text-[#6C7A9A]" />
        {row.getValue("studentId")}
      </div>
    ),
  },
  {
    accessorKey: "studentName",
    header: "StudentName",
    cell: ({ row }) => (
      <div className="font-medium text-[#5351D6] flex items-center gap-2">
        {row.getValue("studentName")}
      </div>
    ),
  },
  {
    accessorKey: "cf1",
    header: "Cf1",
  },
  {
    accessorKey: "cf2",
    header: "Cf2",
  },

  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => <div>{Math.floor(row.getValue<number>("total"))}</div>,
  },
  {
    accessorKey: "amountToPay",
    header: "AmountToPay",
    cell: ({ row }) => (
      <Badge className="text-sm text-[#696F78] bg-[#E5EAF4] rounded-md h-7">
        {row.original.amountToPay}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StudentPaymentStatus paymentValue={row.original} />,
  },
  {
    id: "action",
    cell: ({ row }) => (
      <Button variant="ghost" size="icon">
        <Link href={`/dashboard/payments/${row.getValue("studentId")}`}>
          <MoreVertical className="w-4 h-4 text-[#6B7A99]" />
        </Link>
      </Button>
    ),
  },
];
