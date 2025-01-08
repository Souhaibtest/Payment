import { PaymentDetail } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";

export const columnsDetail: ColumnDef<PaymentDetail>[] = [
  {
    accessorKey: "studentId",
    header: "StudentId",
    cell: ({ row }) => <div>{row.getValue("studentId")}</div>,
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
  },
  {
    accessorKey: "amountToPay",
    header: "AmountToPay",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
