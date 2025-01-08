import {
  mysqlTable,
  int,
  varchar,
  decimal,
  timestamp,
  unique,
  date,
  varbinary,
  char,
  text,
  index,
  datetime,
  mysqlView,
  tinyint,
  mediumint,
} from "drizzle-orm/mysql-core";
import { relations, sql } from "drizzle-orm";
import { bigint } from "drizzle-orm/mysql-core";

export const migrations = mysqlTable("migrations", {
  id: int().autoincrement().notNull(),
  migration: varchar({ length: 200 }).notNull(),
  batch: int().notNull(),
});

export const users = mysqlTable("users", {
  id: int().autoincrement().notNull(),
  email: varchar({ length: 200 }).notNull(),
  password: varchar({ length: 200 }).notNull(),
});

export const tecBeneficiaries = mysqlTable("tec_beneficiaries", {
  id: int().autoincrement().notNull(),
  name: varchar({ length: 50 }).notNull(),
  type: varchar({ length: 50 }),
});

export const tecBeneficiary = mysqlTable("tec_beneficiary", {
  id: int().autoincrement().notNull(),
  name: varchar({ length: 50 }).default("'").notNull(),
});

export const tecCategories = mysqlTable("tec_categories", {
  id: int().autoincrement().notNull(),
  code: varchar({ length: 20 }).notNull(),
  name: varchar({ length: 55 }).notNull(),
  image: varchar({ length: 100 }).default("'no_image.png'"),
});

export const tecComboItems = mysqlTable("tec_combo_items", {
  id: int().autoincrement().notNull(),
  productId: int("product_id").notNull(),
  itemCode: varchar("item_code", { length: 20 }).notNull(),
  quantity: decimal({ precision: 12, scale: 4 }).notNull(),
  price: decimal({ precision: 25, scale: 4 }),
  cost: decimal({ precision: 25, scale: 4 }),
});

export const tecCustomers = mysqlTable("tec_customers", {
  id: int().autoincrement().notNull(),
  name: varchar({ length: 55 }).notNull(),
  cf1: varchar({ length: 255 }).notNull(),
  cf2: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 20 }).notNull(),
  email: varchar({ length: 100 }).notNull(),
  storeId: int("store_id"), // Corrected
  montantApayer: int("montant_apayer"), // Corrected
  yearId: int("year_id")
    .notNull()
    .references(() => tecYears.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
});

export const tecExpenses = mysqlTable("tec_expenses", {
  id: int().autoincrement().notNull(),
  date: timestamp({ mode: "string" }).default("current_timestamp()").notNull(),
  reference: varchar({ length: 50 }).notNull(),
  amount: decimal({ precision: 25, scale: 4 }).notNull(),
  note: varchar({ length: 1000 }),
  createdBy: varchar("created_by", { length: 55 }).notNull(),
  attachment: varchar({ length: 55 }),
  storeId: int("store_id").default(1).notNull(),
  beneficiaryName: varchar("beneficiary_name", { length: 1000 }).default(
    "NULL"
  ),
  beneficiaryId: int("beneficiary_id").notNull(),
  yearId: int("year_id"),
});

export const tecGiftCards = mysqlTable(
  "tec_gift_cards",
  {
    id: int().autoincrement().notNull(),
    date: timestamp({ mode: "string" })
      .default("current_timestamp()")
      .notNull(),
    cardNo: varchar("card_no", { length: 20 }).notNull(),
    value: decimal({ precision: 25, scale: 4 }).notNull(),
    customerId: int("customer_id"),
    balance: decimal({ precision: 25, scale: 4 }).notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    expiry: date({ mode: "string" }),
    createdBy: int("created_by"),
    storeId: int("store_id"),
  },
  (table) => {
    return {
      cardNo: unique("card_no").on(table.cardNo),
    };
  }
);

export const tecGroups = mysqlTable("tec_groups", {
  id: mediumint().autoincrement().notNull(),
  name: varchar({ length: 20 }).notNull(),
  description: varchar({ length: 100 }).notNull(),
});

export const tecLoginAttempts = mysqlTable("tec_login_attempts", {
  id: mediumint().autoincrement().notNull(),
  ipAddress: varbinary("ip_address", { length: 16 }).notNull(),
  login: varchar({ length: 100 }).notNull(),
  time: int(),
});

export const tecPayments = mysqlTable("tec_payments", {
  id: int().autoincrement().notNull(),
  date: timestamp({ mode: "string" }).default("current_timestamp()"),
  saleId: int("sale_id"),
  customerId: int("customer_id"),
  transactionId: varchar("transaction_id", { length: 50 }),
  paidBy: varchar("paid_by", { length: 20 }).notNull(),
  chequeNo: varchar("cheque_no", { length: 20 }),
  ccNo: varchar("cc_no", { length: 20 }),
  ccHolder: varchar("cc_holder", { length: 25 }),
  ccMonth: varchar("cc_month", { length: 2 }),
  ccYear: varchar("cc_year", { length: 4 }),
  ccType: varchar("cc_type", { length: 20 }),
  amount: decimal({ precision: 25, scale: 4 }).notNull(),
  currency: varchar({ length: 3 }),
  createdBy: int("created_by").notNull(),
  attachment: varchar({ length: 55 }),
  note: varchar({ length: 1000 }),
  posPaid: decimal("pos_paid", { precision: 25, scale: 4 }).default("0.0000"),
  posBalance: decimal("pos_balance", { precision: 25, scale: 4 }).default(
    "0.0000"
  ),
  gcNo: varchar("gc_no", { length: 20 }),
  reference: varchar({ length: 50 }),
  updatedBy: int("updated_by"),
  updatedAt: timestamp("updated_at", { mode: "string" }),
  storeId: int("store_id").default(1).notNull(),
});

export const tecPrinters = mysqlTable("tec_printers", {
  id: int().autoincrement().notNull(),
  title: varchar({ length: 55 }).notNull(),
  type: varchar({ length: 25 }).notNull(),
  profile: varchar({ length: 25 }).notNull(),
  charPerLine: tinyint("char_per_line"),
  path: varchar({ length: 255 }),
  ipAddress: varbinary("ip_address", { length: 45 }),
  port: varchar({ length: 10 }),
});

export const tecProducts = mysqlTable(
  "tec_products",
  {
    id: int().autoincrement().notNull(),
    code: varchar({ length: 50 }).notNull(),
    name: char({ length: 255 }).notNull(),
    categoryId: int("category_id").default(1).notNull(),
    price: decimal({ precision: 25, scale: 4 }).notNull(),
    image: varchar({ length: 255 }).default("'no_image.png'"),
    tax: varchar({ length: 20 }),
    cost: decimal({ precision: 25, scale: 4 }),
    taxMethod: tinyint("tax_method").default(1),
    quantity: decimal({ precision: 15, scale: 4 }).default("0.0000"),
    barcodeSymbology: varchar("barcode_symbology", { length: 20 })
      .default("'code39'")
      .notNull(),
    type: varchar({ length: 20 }).default("'standard'").notNull(),
    details: text(),
    alertQuantity: decimal("alert_quantity", {
      precision: 10,
      scale: 4,
    }).default("0.0000"),
    yearId: int("year_id"),
  },
  (table) => {
    return {
      code: unique("code").on(table.code),
    };
  }
);

export const tecProductStoreQty = mysqlTable(
  "tec_product_store_qty",
  {
    id: int().autoincrement().notNull(),
    productId: int("product_id").notNull(),
    storeId: int("store_id").notNull(),
    quantity: decimal({ precision: 15, scale: 4 }).default("0.0000").notNull(),
    price: decimal({ precision: 25, scale: 4 }),
  },
  (table) => {
    return {
      productId: index("product_id").on(table.productId),
      storeId: index("store_id").on(table.storeId),
    };
  }
);

export const tecPurchases = mysqlTable("tec_purchases", {
  id: int().autoincrement().notNull(),
  reference: varchar({ length: 55 }).notNull(),
  date: timestamp({ mode: "string" }).default("current_timestamp()").notNull(),
  note: varchar({ length: 1000 }).notNull(),
  total: decimal({ precision: 25, scale: 4 }).notNull(),
  attachment: varchar({ length: 255 }),
  supplierId: int("supplier_id"),
  received: tinyint(),
  createdBy: int("created_by").notNull(),
  storeId: int("store_id").default(1).notNull(),
});

export const tecPurchaseItems = mysqlTable("tec_purchase_items", {
  id: int().autoincrement().notNull(),
  purchaseId: int("purchase_id").notNull(),
  productId: int("product_id").notNull(),
  quantity: decimal({ precision: 15, scale: 4 }).notNull(),
  cost: decimal({ precision: 25, scale: 4 }).notNull(),
  subtotal: decimal({ precision: 25, scale: 4 }).notNull(),
});

export const tecSales = mysqlTable("tec_sales", {
  id: int().autoincrement().notNull(),
  date: datetime({ mode: "string" }).notNull(),
  customerId: int("customer_id")
    .notNull()
    .references(() => tecCustomers.id, {
      onDelete: "restrict",
      onUpdate: "restrict",
    }),
  customerName: varchar("customer_name", { length: 55 }).notNull(),
  total: decimal({ precision: 25, scale: 4 }).notNull(),
  productDiscount: decimal("product_discount", {
    precision: 25,
    scale: 4,
  }),
  orderDiscountId: varchar("order_discount_id", { length: 20 }),
  orderDiscount: decimal("order_discount", { precision: 25, scale: 4 }).default(
    "NULL"
  ),
  totalDiscount: decimal("total_discount", { precision: 25, scale: 4 }).default(
    "NULL"
  ),
  productTax: decimal("product_tax", { precision: 25, scale: 4 }).default(
    "NULL"
  ),
  orderTaxId: varchar("order_tax_id", { length: 20 }),
  orderTax: decimal("order_tax", { precision: 25, scale: 4 }),
  totalTax: decimal("total_tax", { precision: 25, scale: 4 }),
  grandTotal: decimal("grand_total", { precision: 25, scale: 4 }).notNull(),
  totalItems: int("total_items"),
  totalQuantity: decimal("total_quantity", { precision: 15, scale: 4 }).default(
    "NULL"
  ),
  paid: decimal({ precision: 25, scale: 4 }),
  createdBy: int("created_by"),
  updatedBy: int("updated_by"),
  updatedAt: datetime("updated_at", { mode: "string" }),
  note: varchar({ length: 1000 }),
  status: varchar({ length: 20 }),
  rounding: decimal({ precision: 10, scale: 4 }),
  storeId: int("store_id").default(1).notNull(),
  holdRef: varchar("hold_ref", { length: 255 }),
});

export const tecSaleItems = mysqlTable("tec_sale_items", {
  id: int().autoincrement().notNull(),
  saleId: int("sale_id").notNull(),
  productId: int("product_id").notNull(),
  quantity: decimal({ precision: 15, scale: 4 }).notNull(),
  unitPrice: decimal("unit_price", { precision: 25, scale: 4 }).notNull(),
  netUnitPrice: decimal("net_unit_price", {
    precision: 25,
    scale: 4,
  }).notNull(),
  discount: varchar({ length: 20 }),
  itemDiscount: decimal("item_discount", { precision: 25, scale: 4 }).default(
    "NULL"
  ),
  tax: int(),
  itemTax: decimal("item_tax", { precision: 25, scale: 4 }),
  subtotal: decimal({ precision: 25, scale: 4 }).notNull(),
  realUnitPrice: decimal("real_unit_price", {
    precision: 25,
    scale: 4,
  }),
  cost: decimal({ precision: 25, scale: 4 }).default("0.0000"),
  productCode: varchar("product_code", { length: 50 }),
  productName: varchar("product_name", { length: 50 }),
  comment: varchar({ length: 255 }),
});

export const tecSessions = mysqlTable(
  "tec_sessions",
  {
    id: varchar({ length: 40 }).notNull(),
    ipAddress: varchar("ip_address", { length: 45 }).notNull(),
    timestamp: int().default(0).notNull(),
    // Warning: Can't parse blob from database
    // blobType: blob("data").notNull(),
  },
  (table) => {
    return {
      ciSessionsTimestamp: index("ci_sessions_timestamp").on(table.timestamp),
    };
  }
);

export const tecSettings = mysqlTable("tec_settings", {
  settingId: int("setting_id").notNull(),
  logo: varchar({ length: 255 }).notNull(),
  siteName: varchar("site_name", { length: 55 }).notNull(),
  tel: varchar({ length: 20 }).notNull(),
  dateformat: varchar({ length: 20 }),
  timeformat: varchar({ length: 20 }),
  defaultEmail: varchar("default_email", { length: 100 }).notNull(),
  language: varchar({ length: 20 }).notNull(),
  version: varchar({ length: 10 }).default("'1.0'").notNull(),
  theme: varchar({ length: 20 }).notNull(),
  timezone: varchar({ length: 255 }).default("'0'").notNull(),
  protocol: varchar({ length: 20 }).default("'mail'").notNull(),
  smtpHost: varchar("smtp_host", { length: 255 }),
  smtpUser: varchar("smtp_user", { length: 100 }),
  smtpPass: varchar("smtp_pass", { length: 255 }),
  smtpPort: varchar("smtp_port", { length: 10 }).default("'25'"),
  smtpCrypto: varchar("smtp_crypto", { length: 5 }),
  mmode: tinyint().notNull(),
  captcha: tinyint().default(1).notNull(),
  mailpath: varchar({ length: 55 }),
  currencyPrefix: varchar("currency_prefix", { length: 3 }).notNull(),
  defaultCustomer: int("default_customer").notNull(),
  defaultTaxRate: varchar("default_tax_rate", { length: 20 }).notNull(),
  rowsPerPage: int("rows_per_page").notNull(),
  totalRows: int("total_rows").notNull(),
  header: varchar({ length: 1000 }),
  footer: varchar({ length: 1000 }),
  bsty: tinyint().notNull(),
  displayKb: tinyint("display_kb").notNull(),
  defaultCategory: int("default_category").notNull(),
  defaultDiscount: varchar("default_discount", { length: 20 }).notNull(),
  itemAddition: tinyint("item_addition").notNull(),
  barcodeSymbology: varchar("barcode_symbology", { length: 55 }).default(
    "NULL"
  ),
  proLimit: tinyint("pro_limit").notNull(),
  decimals: tinyint().default(2).notNull(),
  thousandsSep: varchar("thousands_sep", { length: 2 })
    .default("','")
    .notNull(),
  decimalsSep: varchar("decimals_sep", { length: 2 }).default("'.'").notNull(),
  focusAddItem: varchar("focus_add_item", { length: 55 }),
  addCustomer: varchar("add_customer", { length: 55 }),
  toggleCategorySlider: varchar("toggle_category_slider", {
    length: 55,
  }),
  cancelSale: varchar("cancel_sale", { length: 55 }),
  suspendSale: varchar("suspend_sale", { length: 55 }),
  printOrder: varchar("print_order", { length: 55 }),
  printBill: varchar("print_bill", { length: 55 }),
  finalizeSale: varchar("finalize_sale", { length: 55 }),
  todaySale: varchar("today_sale", { length: 55 }),
  openHoldBills: varchar("open_hold_bills", { length: 55 }),
  closeRegister: varchar("close_register", { length: 55 }),
  javaApplet: tinyint("java_applet").notNull(),
  receiptPrinter: varchar("receipt_printer", { length: 55 }),
  posPrinters: varchar("pos_printers", { length: 255 }),
  cashDrawerCodes: varchar("cash_drawer_codes", { length: 55 }),
  charPerLine: tinyint("char_per_line").default(42),
  rounding: tinyint().default(0),
  pinCode: varchar("pin_code", { length: 20 }),
  stripe: tinyint(),
  stripeSecretKey: varchar("stripe_secret_key", { length: 100 }).default(
    "NULL"
  ),
  stripePublishableKey: varchar("stripe_publishable_key", {
    length: 100,
  }),
  purchaseCode: varchar("purchase_code", { length: 100 }),
  envatoUsername: varchar("envato_username", { length: 50 }),
  themeStyle: varchar("theme_style", { length: 25 }).default("'green'"),
  afterSalePage: tinyint("after_sale_page"),
  overselling: tinyint().default(1),
  multiStore: tinyint("multi_store"),
  qtyDecimals: tinyint("qty_decimals").default(2),
  symbol: varchar({ length: 55 }),
  sac: tinyint().default(0),
  displaySymbol: tinyint("display_symbol"),
  remotePrinting: tinyint("remote_printing").default(1),
  printer: int(),
  orderPrinters: varchar("order_printers", { length: 55 }),
  autoPrint: tinyint("auto_print").default(0),
  localPrinters: tinyint("local_printers"),
  rtl: tinyint(),
  printImg: tinyint("print_img"),
  wsBarcodeType: varchar("ws_barcode_type", { length: 10 }).default("'weight'"),
  wsBarcodeChars: tinyint("ws_barcode_chars"),
  flagChars: tinyint("flag_chars"),
  itemCodeStart: tinyint("item_code_start"),
  itemCodeChars: tinyint("item_code_chars"),
  priceStart: tinyint("price_start"),
  priceChars: tinyint("price_chars"),
  priceDivideBy: int("price_divide_by"),
  weightStart: tinyint("weight_start"),
  weightChars: tinyint("weight_chars"),
  weightDivideBy: int("weight_divide_by"),
});

export const tecStores = mysqlTable("tec_stores", {
  id: int().autoincrement().notNull(),
  name: varchar({ length: 50 }).notNull(),
  code: varchar({ length: 20 }).notNull(),
  logo: varchar({ length: 40 }),
  email: varchar({ length: 100 }),
  phone: varchar({ length: 15 }).notNull(),
  address1: varchar({ length: 50 }),
  address2: varchar({ length: 50 }),
  city: varchar({ length: 20 }),
  state: varchar({ length: 20 }),
  postalCode: varchar("postal_code", { length: 8 }),
  country: varchar({ length: 25 }),
  currencyCode: varchar("currency_code", { length: 3 }),
  receiptHeader: text("receipt_header"),
  receiptFooter: text("receipt_footer"),
});

export const tecSuppliers = mysqlTable("tec_suppliers", {
  id: int().autoincrement().notNull(),
  name: varchar({ length: 55 }).notNull(),
  cf1: varchar({ length: 255 }).notNull(),
  cf2: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 20 }).notNull(),
  email: varchar({ length: 100 }).notNull(),
});

export const tecSuspendedItems = mysqlTable("tec_suspended_items", {
  id: int().autoincrement().notNull(),
  suspendId: int("suspend_id").notNull(),
  productId: int("product_id").notNull(),
  quantity: decimal({ precision: 15, scale: 4 }).notNull(),
  unitPrice: decimal("unit_price", { precision: 25, scale: 4 }).notNull(),
  netUnitPrice: decimal("net_unit_price", {
    precision: 25,
    scale: 4,
  }).notNull(),
  discount: varchar({ length: 20 }),
  itemDiscount: decimal("item_discount", { precision: 25, scale: 4 }).default(
    "NULL"
  ),
  tax: int(),
  itemTax: decimal("item_tax", { precision: 25, scale: 4 }),
  subtotal: decimal({ precision: 25, scale: 4 }).notNull(),
  realUnitPrice: decimal("real_unit_price", {
    precision: 25,
    scale: 4,
  }),
  productCode: varchar("product_code", { length: 50 }),
  productName: varchar("product_name", { length: 50 }),
  comment: varchar({ length: 255 }),
});

export const tecSuspendedSales = mysqlTable("tec_suspended_sales", {
  id: int().autoincrement().notNull(),
  date: datetime({ mode: "string" }).notNull(),
  customerId: int("customer_id").notNull(),
  customerName: varchar("customer_name", { length: 55 }).notNull(),
  total: decimal({ precision: 25, scale: 4 }).notNull(),
  productDiscount: decimal("product_discount", {
    precision: 25,
    scale: 4,
  }),
  orderDiscountId: varchar("order_discount_id", { length: 20 }),
  orderDiscount: decimal("order_discount", { precision: 25, scale: 4 }).default(
    "NULL"
  ),
  totalDiscount: decimal("total_discount", { precision: 25, scale: 4 }).default(
    "NULL"
  ),
  productTax: decimal("product_tax", { precision: 25, scale: 4 }).default(
    "NULL"
  ),
  orderTaxId: varchar("order_tax_id", { length: 20 }),
  orderTax: decimal("order_tax", { precision: 25, scale: 4 }),
  totalTax: decimal("total_tax", { precision: 25, scale: 4 }),
  grandTotal: decimal("grand_total", { precision: 25, scale: 4 }).notNull(),
  totalItems: int("total_items"),
  totalQuantity: decimal("total_quantity", { precision: 15, scale: 4 }).default(
    "NULL"
  ),
  paid: decimal({ precision: 25, scale: 4 }),
  createdBy: int("created_by"),
  updatedBy: int("updated_by"),
  updatedAt: datetime("updated_at", { mode: "string" }),
  note: varchar({ length: 1000 }),
  holdRef: varchar("hold_ref", { length: 255 }),
  storeId: int("store_id").default(1).notNull(),
});

export const tecUsers = mysqlTable(
  "tec_users",
  {
    id: int().autoincrement().notNull(),
    lastIpAddress: varbinary("last_ip_address", { length: 45 }),
    ipAddress: varbinary("ip_address", { length: 45 }),
    username: varchar({ length: 100 }).notNull(),
    password: varchar({ length: 40 }).notNull(),
    salt: varchar({ length: 40 }),
    email: varchar({ length: 100 }).notNull(),
    activationCode: varchar("activation_code", { length: 40 }),
    forgottenPasswordCode: varchar("forgotten_password_code", {
      length: 40,
    }),
    forgottenPasswordTime: int("forgotten_password_time"),
    rememberCode: varchar("remember_code", { length: 40 }),
    createdOn: int("created_on").notNull(),
    lastLogin: int("last_login"),
    active: tinyint(),
    firstName: varchar("first_name", { length: 50 }),
    lastName: varchar("last_name", { length: 50 }),
    company: varchar({ length: 100 }),
    phone: varchar({ length: 20 }),
    avatar: varchar({ length: 55 }),
    gender: varchar({ length: 20 }),
    groupId: int("group_id").default(2).notNull(),
    storeId: int("store_id"),
  },
  (table) => {
    return {
      groupId: index("group_id").on(table.groupId),
    };
  }
);

export const tecUserLogins = mysqlTable("tec_user_logins", {
  id: int().autoincrement().notNull(),
  userId: int("user_id").notNull(),
  companyId: int("company_id"),
  ipAddress: varbinary("ip_address", { length: 16 }).notNull(),
  login: varchar({ length: 100 }).notNull(),
  time: timestamp({ mode: "string" }).default("current_timestamp()"),
});

export const tecYears = mysqlTable("tec_years", {
  id: int().autoincrement().notNull(),
  nomAnnée: varchar("nom_année", { length: 25 }).notNull(),
  booléen: tinyint("booléen").default(0).notNull(),
});
export const tecDetailsPayments = mysqlView("tec_details_payments", {
  customerId: int("customer_id").notNull(),
  productName: varchar("product_name", { length: 50 }),
  customerName: varchar("customer_name", { length: 55 }).notNull(),
  total: decimal("Total", { precision: 40, scale: 8 })
    .default("0.00000000")
    .notNull(),
  date: datetime({ mode: "string" }).notNull(),
  unitPrice: decimal("unit_price", { precision: 25, scale: 4 }).notNull(),
  status: varchar({ length: 20 }),
})
  .algorithm("undefined")
  .sqlSecurity("definer")
  .as(
    sql`select \`epim_spos\`.\`tec_sales\`.\`customer_id\` AS \`customer_id\`,\`epim_spos\`.\`tec_sale_items\`.\`product_name\` AS \`product_name\`,\`epim_spos\`.\`tec_sales\`.\`customer_name\` AS \`customer_name\`,\`epim_spos\`.\`tec_sale_items\`.\`quantity\` * \`epim_spos\`.\`tec_sale_items\`.\`unit_price\` AS \`Total\`,\`epim_spos\`.\`tec_sales\`.\`date\` AS \`date\`,\`epim_spos\`.\`tec_sale_items\`.\`unit_price\` AS \`unit_price\`,\`epim_spos\`.\`tec_sales\`.\`status\` AS \`status\` from (\`epim_spos\`.\`tec_sales\` join \`epim_spos\`.\`tec_sale_items\` on(\`epim_spos\`.\`tec_sales\`.\`id\` = \`epim_spos\`.\`tec_sale_items\`.\`sale_id\`))`
  );

export const tecSalesview = mysqlView("tec_salesview", {
  id: int().default(0).notNull(),
  name: varchar({ length: 55 }).notNull(),
  cf1: varchar({ length: 255 }).notNull(),
  cf2: varchar({ length: 255 }).notNull(),
  nombre: bigint({ mode: "number" }).notNull(),
  totals: decimal({ precision: 47, scale: 4 }),
  montantApayer: int("montant_apayer"),
  reste: decimal({ precision: 48, scale: 4 }),
})
  .algorithm("undefined")
  .sqlSecurity("definer")
  .as(
    sql`select \`epim_spos\`.\`tec_customers\`.\`id\` AS \`id\`,\`epim_spos\`.\`tec_customers\`.\`name\` AS \`name\`,\`epim_spos\`.\`tec_customers\`.\`cf1\` AS \`cf1\`,\`epim_spos\`.\`tec_customers\`.\`cf2\` AS \`cf2\`,count(0) AS \`nombre\`,sum(\`epim_spos\`.\`tec_sales\`.\`total\`) AS \`totals\`,\`epim_spos\`.\`tec_customers\`.\`montant_apayer\` AS \`montant_apayer\`,\`epim_spos\`.\`tec_customers\`.\`montant_apayer\` - sum(\`epim_spos\`.\`tec_sales\`.\`total\`) AS \`reste\` from (\`epim_spos\`.\`tec_customers\` join \`epim_spos\`.\`tec_sales\` on(\`epim_spos\`.\`tec_sales\`.\`customer_id\` = \`epim_spos\`.\`tec_customers\`.\`id\`)) where \`epim_spos\`.\`tec_customers\`.\`cf1\` in ('FP - TSGE','FP - TSDI','FP - TGI','FP - TI') group by \`epim_spos\`.\`tec_customers\`.\`id\` order by \`epim_spos\`.\`tec_customers\`.\`cf1\``
  );

export const tecCustomersRelations = relations(
  tecCustomers,
  ({ one, many }) => ({
    tecYear: one(tecYears, {
      fields: [tecCustomers.yearId],
      references: [tecYears.id],
    }),
    tecSales: many(tecSales),
  })
);

export const tecYearsRelations = relations(tecYears, ({ many }) => ({
  tecCustomers: many(tecCustomers),
}));

export const tecSalesRelations = relations(tecSales, ({ one }) => ({
  tecCustomer: one(tecCustomers, {
    fields: [tecSales.customerId],
    references: [tecCustomers.id],
  }),
}));
