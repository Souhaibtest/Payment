import { db } from "@/db";
import { tecCustomers, tecSales, tecYears } from "../../../../drizzle/schema";
import { eq, sql } from "drizzle-orm";

export async function GET() {
  const currentYear = await db.query.tecYears.findFirst({
    where: eq(tecYears.booléen, 1),
    columns: {
      nomAnnée: true,
    },
  });

  const startYearMonth = `${currentYear?.nomAnnée.split("-")[0]}-09`;
  const endYearMonth = `${currentYear?.nomAnnée.split("-")[1]}-09`;
  const result = await db
    .select({
      studentId: tecCustomers.id,
      studentName: tecCustomers.name,
      cf1: tecCustomers.cf1,
      cf2: tecCustomers.cf2,
      amountToPay: tecCustomers.montantApayer,
      total: sql`SUM(${tecSales.total})`,
      payments: sql`GROUP_CONCAT(${tecSales.id})`,
      currentYear: tecYears.nomAnnée,
    })
    .from(tecSales)
    .leftJoin(tecCustomers, eq(tecCustomers.id, tecSales.customerId))
    .leftJoin(tecYears, eq(tecCustomers.yearId, tecYears.id))
    .where(
      sql`${tecYears.booléen} = 1 AND DATE_FORMAT(${tecSales.date}, '%Y-%m') BETWEEN ${startYearMonth} AND ${endYearMonth} AND ${tecCustomers.cf1} = "FP" `
    )
    .groupBy(tecCustomers.id)
    .limit(10);

  return Response.json(result);
}
