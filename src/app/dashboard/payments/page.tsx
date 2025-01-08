import React from "react";
import { columns } from "@/components/columns";
import { DataTable } from "@/components/Data-table";
import { Payment } from "@/types/types";

export default async function Page() {
  const response = await fetch(`${process.env.API_URL}/api/payments`);
  const getPayment: Payment[] = await response.json();
  return (
    <div>
      <DataTable data={getPayment} columns={columns} />
    </div>
  );
}
