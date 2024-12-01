"use client";

import { Payment } from "@/app/dashboard/payments/page";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "studentId",
    header: "StudentId",
  },
  {
    accessorKey: "studentName",
    header: "StudentName",
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
    cell: ({ row }) => (
      <div
        className={`${
          row.getValue<number>("total") > row.getValue<number>("amountToPay")
            ? "bg-black"
            : ""
        }`}
      >
        {row.getValue<number>("total")}
      </div>
    ),
  },
  {
    accessorKey: "amountToPay",
    header: "AmountToPay",
  },
];
