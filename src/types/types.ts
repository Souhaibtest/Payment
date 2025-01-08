export type Payment = {
  studentId: number;
  studentName: string;
  cf1: string;
  cf2: string;
  total: string;
  payments: string;
  amountToPay: number;
  currentYear: string;
};

export type PaymentDetail = {
  studentId: number | null;
  studentName: string | null;
  cf1: string | null;
  cf2: string | null;
  amountToPay: number | null;
  payment: string;
  amount: string;
};
