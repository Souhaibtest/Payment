import React from "react";
import { columns } from "@/components/columns";
import { DataTable } from "@/components/Data-table";

export interface Payment {
  studentId: number;
  studentName: string;
  cf1: string;
  cf2: string;
  total: string;
  payments: string;
  amountToPay: number;
}

export default async function page() {
  const response = await fetch(`${process.env.API_URL}/api/payments`);
  const getPayment: Payment[] = await response.json();

  return (
    <div className="mt-6">
      <DataTable data={getPayment} columns={columns} />
    </div>
  );
}
