import { db } from "@/db";

export const getAllCandidate = async () => {
  const getAll = await db.query.tecSales.findMany();
  return getAll;
};

// 5 du mois  12000dh->    2024-09 -> 2025-06 ||
//                       1-October(2100) 10-juillet(9900)
// 14- 1
// 2027-2028  FP(info , di , get )  - FEDE - loacltion - FC
//            12000 14000 -
