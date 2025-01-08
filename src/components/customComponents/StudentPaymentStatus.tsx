import { Payment } from "@/types/types";
import React from "react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

enum statusPayment {
  PartialPaymentSufficient = "orange",
  PartialPaymentInsufficient = "red",
  ExcessPayment = "blue",
  ExactPayment = "green",
  Default = "default",
}

export default function StudentPaymentStatus({
  paymentValue,
}: {
  paymentValue: Payment;
}) {
  function getCustomMonth(date: string) {
    const parsedDate = new Date(date);
    const originalMonth = parsedDate.getMonth();
    const customMonth = ((originalMonth + 4) % 12) + 1;
    return customMonth;
  }
  const handlePayment = (amountToPay: number, total: string): statusPayment => {
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10);
    const currentMonth = getCustomMonth(formattedDate);
    const AMOUNT_PAY_MONTHLY = 1100;
    const currentPaidMoney = AMOUNT_PAY_MONTHLY * currentMonth;
    const RESTRICT_AMOUNT = currentPaidMoney - 2200;
    const totalAmount = parseInt(total);
    // current amout 4400   case1: total 3100 (orange) || case2 total 3099 or less (red) case3 total == amount or greeter but not equal to amount to pay  case4: total == amountto paye
    if (totalAmount === currentPaidMoney - AMOUNT_PAY_MONTHLY)
      return statusPayment.PartialPaymentSufficient;
    if (totalAmount < RESTRICT_AMOUNT)
      return statusPayment.PartialPaymentInsufficient;
    if (totalAmount >= amountToPay) return statusPayment.ExactPayment;
    if (totalAmount === currentPaidMoney || totalAmount > currentPaidMoney)
      return statusPayment.ExcessPayment;

    return statusPayment.Default;
  };
  const status = handlePayment(paymentValue.amountToPay, paymentValue.total);
  return (
    <div>
      <Badge
        className={cn(
          "rounded-md",
          status === "orange" && "bg-[#FADCBD] text-[#906D48]",
          status === "red" && "bg-[#FFDEE8] text-[#A0505F]",
          status === "blue" && "bg-[#E5EAF3] text-blue-700",
          status === "green" && "bg-[#D9FDEE] text-[#4E7861]"
        )}
      >
        {status === "red"
          ? "PaymentInsufficient"
          : status === "green"
          ? "ExactPayment"
          : status === "blue"
          ? "ExcessPayment"
          : status === "orange"
          ? "PaymentSufficient"
          : ""}
      </Badge>
    </div>
  );
}
