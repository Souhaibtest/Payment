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
import { bigint } from "drizzle-orm/pg-core";

export const migrations = mysqlTable("migrations", {
  id: int().autoincrement().notNull(),
  migration: varchar({ length: 200 }).notNull(),
  batch: int().notNull(),
});

export const tecBeneficiaries = mysqlTable("tec_beneficiaries", {
  id: int().autoincrement().notNull(),
  name: varchar({ length: 50 }).notNull(),
  type: varchar({ length: 50 }).default("NULL"),
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
  price: decimal({ precision: 25, scale: 4 }).default("NULL"),
  cost: decimal({ precision: 25, scale: 4 }).default("NULL"),
});

export const tecCustomers = mysqlTable("tec_customers", {
  id: int().autoincrement().notNull(),
  name: varchar({ length: 55 }).notNull(),
  cf1: varchar({ length: 255 }).notNull(),
  cf2: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 20 }).notNull(),
  email: varchar({ length: 100 }).notNull(),
  storeId: int("store_id").default("NULL"),
  montantApayer: int("montant_apayer").default("NULL"),
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
  note: varchar({ length: 1000 }).default("NULL"),
  createdBy: varchar("created_by", { length: 55 }).notNull(),
  attachment: varchar({ length: 55 }).default("NULL"),
  storeId: int("store_id").default(1).notNull(),
  beneficiaryName: varchar("beneficiary_name", { length: 1000 }).default(
    "NULL"
  ),
  beneficiaryId: int("beneficiary_id").notNull(),
  yearId: int("year_id").default("NULL"),
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
    customerId: int("customer_id").default("NULL"),
    balance: decimal({ precision: 25, scale: 4 }).notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    expiry: date({ mode: "string" }).default("NULL"),
    createdBy: int("created_by").default("NULL"),
    storeId: int("store_id").default("NULL"),
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
  time: int().default("NULL"),
});

export const tecPayments = mysqlTable("tec_payments", {
  id: int().autoincrement().notNull(),
  date: timestamp({ mode: "string" }).default("current_timestamp()"),
  saleId: int("sale_id").default("NULL"),
  customerId: int("customer_id").default("NULL"),
  transactionId: varchar("transaction_id", { length: 50 }).default("NULL"),
  paidBy: varchar("paid_by", { length: 20 }).notNull(),
  chequeNo: varchar("cheque_no", { length: 20 }).default("NULL"),
  ccNo: varchar("cc_no", { length: 20 }).default("NULL"),
  ccHolder: varchar("cc_holder", { length: 25 }).default("NULL"),
  ccMonth: varchar("cc_month", { length: 2 }).default("NULL"),
  ccYear: varchar("cc_year", { length: 4 }).default("NULL"),
  ccType: varchar("cc_type", { length: 20 }).default("NULL"),
  amount: decimal({ precision: 25, scale: 4 }).notNull(),
  currency: varchar({ length: 3 }).default("NULL"),
  createdBy: int("created_by").notNull(),
  attachment: varchar({ length: 55 }).default("NULL"),
  note: varchar({ length: 1000 }).default("NULL"),
  posPaid: decimal("pos_paid", { precision: 25, scale: 4 }).default("0.0000"),
  posBalance: decimal("pos_balance", { precision: 25, scale: 4 }).default(
    "0.0000"
  ),
  gcNo: varchar("gc_no", { length: 20 }).default("NULL"),
  reference: varchar({ length: 50 }).default("NULL"),
  updatedBy: int("updated_by").default("NULL"),
  updatedAt: timestamp("updated_at", { mode: "string" }).default("NULL"),
  storeId: int("store_id").default(1).notNull(),
});

export const tecPrinters = mysqlTable("tec_printers", {
  id: int().autoincrement().notNull(),
  title: varchar({ length: 55 }).notNull(),
  type: varchar({ length: 25 }).notNull(),
  profile: varchar({ length: 25 }).notNull(),
  charPerLine: tinyint("char_per_line").default("NULL"),
  path: varchar({ length: 255 }).default("NULL"),
  ipAddress: varbinary("ip_address", { length: 45 }).default("NULL"),
  port: varchar({ length: 10 }).default("NULL"),
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
    tax: varchar({ length: 20 }).default("NULL"),
    cost: decimal({ precision: 25, scale: 4 }).default("NULL"),
    taxMethod: tinyint("tax_method").default(1),
    quantity: decimal({ precision: 15, scale: 4 }).default("0.0000"),
    barcodeSymbology: varchar("barcode_symbology", { length: 20 })
      .default("'code39'")
      .notNull(),
    type: varchar({ length: 20 }).default("'standard'").notNull(),
    details: text().default("NULL"),
    alertQuantity: decimal("alert_quantity", {
      precision: 10,
      scale: 4,
    }).default("0.0000"),
    yearId: int("year_id").default("NULL"),
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
    price: decimal({ precision: 25, scale: 4 }).default("NULL"),
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
  attachment: varchar({ length: 255 }).default("NULL"),
  supplierId: int("supplier_id").default("NULL"),
  received: tinyint().default("NULL"),
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

export const tecRegisters = mysqlTable("tec_registers", {
  id: int().autoincrement().notNull(),
  date: timestamp({ mode: "string" }).default("current_timestamp()").notNull(),
  userId: int("user_id").notNull(),
  cashInHand: decimal("cash_in_hand", { precision: 25, scale: 4 }).notNull(),
  status: varchar({ length: 10 }).notNull(),
  totalCash: decimal("total_cash", { precision: 25, scale: 4 }).default("NULL"),
  totalCheques: int("total_cheques").default("NULL"),
  totalCcSlips: int("total_cc_slips").default("NULL"),
  totalCashSubmitted: decimal("total_cash_submitted", {
    precision: 25,
    scale: 4,
  }).default("NULL"),
  totalChequesSubmitted: int("total_cheques_submitted").default("NULL"),
  totalCcSlipsSubmitted: int("total_cc_slips_submitted").default("NULL"),
  note: text().default("NULL"),
  closedAt: timestamp("closed_at", { mode: "string" }).default("NULL"),
  transferOpenedBills: varchar("transfer_opened_bills", { length: 50 }).default(
    "NULL"
  ),
  closedBy: int("closed_by").default("NULL"),
  storeId: int("store_id").default(1).notNull(),
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
  }).default("NULL"),
  orderDiscountId: varchar("order_discount_id", { length: 20 }).default("NULL"),
  orderDiscount: decimal("order_discount", { precision: 25, scale: 4 }).default(
    "NULL"
  ),
  totalDiscount: decimal("total_discount", { precision: 25, scale: 4 }).default(
    "NULL"
  ),
  productTax: decimal("product_tax", { precision: 25, scale: 4 }).default(
    "NULL"
  ),
  orderTaxId: varchar("order_tax_id", { length: 20 }).default("NULL"),
  orderTax: decimal("order_tax", { precision: 25, scale: 4 }).default("NULL"),
  totalTax: decimal("total_tax", { precision: 25, scale: 4 }).default("NULL"),
  grandTotal: decimal("grand_total", { precision: 25, scale: 4 }).notNull(),
  totalItems: int("total_items").default("NULL"),
  totalQuantity: decimal("total_quantity", { precision: 15, scale: 4 }).default(
    "NULL"
  ),
  paid: decimal({ precision: 25, scale: 4 }).default("NULL"),
  createdBy: int("created_by").default("NULL"),
  updatedBy: int("updated_by").default("NULL"),
  updatedAt: datetime("updated_at", { mode: "string" }).default("NULL"),
  note: varchar({ length: 1000 }).default("NULL"),
  status: varchar({ length: 20 }).default("NULL"),
  rounding: decimal({ precision: 10, scale: 4 }).default("NULL"),
  storeId: int("store_id").default(1).notNull(),
  holdRef: varchar("hold_ref", { length: 255 }).default("NULL"),
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
  discount: varchar({ length: 20 }).default("NULL"),
  itemDiscount: decimal("item_discount", { precision: 25, scale: 4 }).default(
    "NULL"
  ),
  tax: int().default("NULL"),
  itemTax: decimal("item_tax", { precision: 25, scale: 4 }).default("NULL"),
  subtotal: decimal({ precision: 25, scale: 4 }).notNull(),
  realUnitPrice: decimal("real_unit_price", {
    precision: 25,
    scale: 4,
  }).default("NULL"),
  cost: decimal({ precision: 25, scale: 4 }).default("0.0000"),
  productCode: varchar("product_code", { length: 50 }).default("NULL"),
  productName: varchar("product_name", { length: 50 }).default("NULL"),
  comment: varchar({ length: 255 }).default("NULL"),
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
  dateformat: varchar({ length: 20 }).default("NULL"),
  timeformat: varchar({ length: 20 }).default("NULL"),
  defaultEmail: varchar("default_email", { length: 100 }).notNull(),
  language: varchar({ length: 20 }).notNull(),
  version: varchar({ length: 10 }).default("'1.0'").notNull(),
  theme: varchar({ length: 20 }).notNull(),
  timezone: varchar({ length: 255 }).default("'0'").notNull(),
  protocol: varchar({ length: 20 }).default("'mail'").notNull(),
  smtpHost: varchar("smtp_host", { length: 255 }).default("NULL"),
  smtpUser: varchar("smtp_user", { length: 100 }).default("NULL"),
  smtpPass: varchar("smtp_pass", { length: 255 }).default("NULL"),
  smtpPort: varchar("smtp_port", { length: 10 }).default("'25'"),
  smtpCrypto: varchar("smtp_crypto", { length: 5 }).default("NULL"),
  mmode: tinyint().notNull(),
  captcha: tinyint().default(1).notNull(),
  mailpath: varchar({ length: 55 }).default("NULL"),
  currencyPrefix: varchar("currency_prefix", { length: 3 }).notNull(),
  defaultCustomer: int("default_customer").notNull(),
  defaultTaxRate: varchar("default_tax_rate", { length: 20 }).notNull(),
  rowsPerPage: int("rows_per_page").notNull(),
  totalRows: int("total_rows").notNull(),
  header: varchar({ length: 1000 }).default("NULL"),
  footer: varchar({ length: 1000 }).default("NULL"),
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
  focusAddItem: varchar("focus_add_item", { length: 55 }).default("NULL"),
  addCustomer: varchar("add_customer", { length: 55 }).default("NULL"),
  toggleCategorySlider: varchar("toggle_category_slider", {
    length: 55,
  }).default("NULL"),
  cancelSale: varchar("cancel_sale", { length: 55 }).default("NULL"),
  suspendSale: varchar("suspend_sale", { length: 55 }).default("NULL"),
  printOrder: varchar("print_order", { length: 55 }).default("NULL"),
  printBill: varchar("print_bill", { length: 55 }).default("NULL"),
  finalizeSale: varchar("finalize_sale", { length: 55 }).default("NULL"),
  todaySale: varchar("today_sale", { length: 55 }).default("NULL"),
  openHoldBills: varchar("open_hold_bills", { length: 55 }).default("NULL"),
  closeRegister: varchar("close_register", { length: 55 }).default("NULL"),
  javaApplet: tinyint("java_applet").notNull(),
  receiptPrinter: varchar("receipt_printer", { length: 55 }).default("NULL"),
  posPrinters: varchar("pos_printers", { length: 255 }).default("NULL"),
  cashDrawerCodes: varchar("cash_drawer_codes", { length: 55 }).default("NULL"),
  charPerLine: tinyint("char_per_line").default(42),
  rounding: tinyint().default(0),
  pinCode: varchar("pin_code", { length: 20 }).default("NULL"),
  stripe: tinyint().default("NULL"),
  stripeSecretKey: varchar("stripe_secret_key", { length: 100 }).default(
    "NULL"
  ),
  stripePublishableKey: varchar("stripe_publishable_key", {
    length: 100,
  }).default("NULL"),
  purchaseCode: varchar("purchase_code", { length: 100 }).default("NULL"),
  envatoUsername: varchar("envato_username", { length: 50 }).default("NULL"),
  themeStyle: varchar("theme_style", { length: 25 }).default("'green'"),
  afterSalePage: tinyint("after_sale_page").default("NULL"),
  overselling: tinyint().default(1),
  multiStore: tinyint("multi_store").default("NULL"),
  qtyDecimals: tinyint("qty_decimals").default(2),
  symbol: varchar({ length: 55 }).default("NULL"),
  sac: tinyint().default(0),
  displaySymbol: tinyint("display_symbol").default("NULL"),
  remotePrinting: tinyint("remote_printing").default(1),
  printer: int().default("NULL"),
  orderPrinters: varchar("order_printers", { length: 55 }).default("NULL"),
  autoPrint: tinyint("auto_print").default(0),
  localPrinters: tinyint("local_printers").default("NULL"),
  rtl: tinyint().default("NULL"),
  printImg: tinyint("print_img").default("NULL"),
  wsBarcodeType: varchar("ws_barcode_type", { length: 10 }).default("'weight'"),
  wsBarcodeChars: tinyint("ws_barcode_chars").default("NULL"),
  flagChars: tinyint("flag_chars").default("NULL"),
  itemCodeStart: tinyint("item_code_start").default("NULL"),
  itemCodeChars: tinyint("item_code_chars").default("NULL"),
  priceStart: tinyint("price_start").default("NULL"),
  priceChars: tinyint("price_chars").default("NULL"),
  priceDivideBy: int("price_divide_by").default("NULL"),
  weightStart: tinyint("weight_start").default("NULL"),
  weightChars: tinyint("weight_chars").default("NULL"),
  weightDivideBy: int("weight_divide_by").default("NULL"),
});

export const tecStores = mysqlTable("tec_stores", {
  id: int().autoincrement().notNull(),
  name: varchar({ length: 50 }).notNull(),
  code: varchar({ length: 20 }).notNull(),
  logo: varchar({ length: 40 }).default("NULL"),
  email: varchar({ length: 100 }).default("NULL"),
  phone: varchar({ length: 15 }).notNull(),
  address1: varchar({ length: 50 }).default("NULL"),
  address2: varchar({ length: 50 }).default("NULL"),
  city: varchar({ length: 20 }).default("NULL"),
  state: varchar({ length: 20 }).default("NULL"),
  postalCode: varchar("postal_code", { length: 8 }).default("NULL"),
  country: varchar({ length: 25 }).default("NULL"),
  currencyCode: varchar("currency_code", { length: 3 }).default("NULL"),
  receiptHeader: text("receipt_header").default("NULL"),
  receiptFooter: text("receipt_footer").default("NULL"),
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
  discount: varchar({ length: 20 }).default("NULL"),
  itemDiscount: decimal("item_discount", { precision: 25, scale: 4 }).default(
    "NULL"
  ),
  tax: int().default("NULL"),
  itemTax: decimal("item_tax", { precision: 25, scale: 4 }).default("NULL"),
  subtotal: decimal({ precision: 25, scale: 4 }).notNull(),
  realUnitPrice: decimal("real_unit_price", {
    precision: 25,
    scale: 4,
  }).default("NULL"),
  productCode: varchar("product_code", { length: 50 }).default("NULL"),
  productName: varchar("product_name", { length: 50 }).default("NULL"),
  comment: varchar({ length: 255 }).default("NULL"),
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
  }).default("NULL"),
  orderDiscountId: varchar("order_discount_id", { length: 20 }).default("NULL"),
  orderDiscount: decimal("order_discount", { precision: 25, scale: 4 }).default(
    "NULL"
  ),
  totalDiscount: decimal("total_discount", { precision: 25, scale: 4 }).default(
    "NULL"
  ),
  productTax: decimal("product_tax", { precision: 25, scale: 4 }).default(
    "NULL"
  ),
  orderTaxId: varchar("order_tax_id", { length: 20 }).default("NULL"),
  orderTax: decimal("order_tax", { precision: 25, scale: 4 }).default("NULL"),
  totalTax: decimal("total_tax", { precision: 25, scale: 4 }).default("NULL"),
  grandTotal: decimal("grand_total", { precision: 25, scale: 4 }).notNull(),
  totalItems: int("total_items").default("NULL"),
  totalQuantity: decimal("total_quantity", { precision: 15, scale: 4 }).default(
    "NULL"
  ),
  paid: decimal({ precision: 25, scale: 4 }).default("NULL"),
  createdBy: int("created_by").default("NULL"),
  updatedBy: int("updated_by").default("NULL"),
  updatedAt: datetime("updated_at", { mode: "string" }).default("NULL"),
  note: varchar({ length: 1000 }).default("NULL"),
  holdRef: varchar("hold_ref", { length: 255 }).default("NULL"),
  storeId: int("store_id").default(1).notNull(),
});

export const tecUsers = mysqlTable(
  "tec_users",
  {
    id: int().autoincrement().notNull(),
    lastIpAddress: varbinary("last_ip_address", { length: 45 }).default("NULL"),
    ipAddress: varbinary("ip_address", { length: 45 }).default("NULL"),
    username: varchar({ length: 100 }).notNull(),
    password: varchar({ length: 40 }).notNull(),
    salt: varchar({ length: 40 }).default("NULL"),
    email: varchar({ length: 100 }).notNull(),
    activationCode: varchar("activation_code", { length: 40 }).default("NULL"),
    forgottenPasswordCode: varchar("forgotten_password_code", {
      length: 40,
    }).default("NULL"),
    forgottenPasswordTime: int("forgotten_password_time").default("NULL"),
    rememberCode: varchar("remember_code", { length: 40 }).default("NULL"),
    createdOn: int("created_on").notNull(),
    lastLogin: int("last_login").default("NULL"),
    active: tinyint().default("NULL"),
    firstName: varchar("first_name", { length: 50 }).default("NULL"),
    lastName: varchar("last_name", { length: 50 }).default("NULL"),
    company: varchar({ length: 100 }).default("NULL"),
    phone: varchar({ length: 20 }).default("NULL"),
    avatar: varchar({ length: 55 }).default("NULL"),
    gender: varchar({ length: 20 }).default("NULL"),
    groupId: int("group_id").default(2).notNull(),
    storeId: int("store_id").default("NULL"),
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
  companyId: int("company_id").default("NULL"),
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
  productName: varchar("product_name", { length: 50 }).default("NULL"),
  customerName: varchar("customer_name", { length: 55 }).notNull(),
  total: decimal("Total", { precision: 40, scale: 8 })
    .default("0.00000000")
    .notNull(),
  date: datetime({ mode: "string" }).notNull(),
  unitPrice: decimal("unit_price", { precision: 25, scale: 4 }).notNull(),
  status: varchar({ length: 20 }).default("NULL"),
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
  totals: decimal({ precision: 47, scale: 4 }).default("NULL"),
  montantApayer: int("montant_apayer").default("NULL"),
  reste: decimal({ precision: 48, scale: 4 }).default("NULL"),
})
  .algorithm("undefined")
  .sqlSecurity("definer")
  .as(
    sql`select \`epim_spos\`.\`tec_customers\`.\`id\` AS \`id\`,\`epim_spos\`.\`tec_customers\`.\`name\` AS \`name\`,\`epim_spos\`.\`tec_customers\`.\`cf1\` AS \`cf1\`,\`epim_spos\`.\`tec_customers\`.\`cf2\` AS \`cf2\`,count(0) AS \`nombre\`,sum(\`epim_spos\`.\`tec_sales\`.\`total\`) AS \`totals\`,\`epim_spos\`.\`tec_customers\`.\`montant_apayer\` AS \`montant_apayer\`,\`epim_spos\`.\`tec_customers\`.\`montant_apayer\` - sum(\`epim_spos\`.\`tec_sales\`.\`total\`) AS \`reste\` from (\`epim_spos\`.\`tec_customers\` join \`epim_spos\`.\`tec_sales\` on(\`epim_spos\`.\`tec_sales\`.\`customer_id\` = \`epim_spos\`.\`tec_customers\`.\`id\`)) where \`epim_spos\`.\`tec_customers\`.\`cf1\` in ('FP - TSGE','FP - TSDI','FP - TGI','FP - TI') group by \`epim_spos\`.\`tec_customers\`.\`id\` order by \`epim_spos\`.\`tec_customers\`.\`cf1\``
  );

export const viewech = mysqlView("viewech", {
  id: int().default(0).notNull(),
  name: varchar({ length: 55 }).notNull(),
  cf1: varchar({ length: 255 }).notNull(),
  cf2: varchar({ length: 255 }).notNull(),
  nombre: bigint({ mode: "number" }).notNull(),
  totals: decimal({ precision: 47, scale: 4 }).default("NULL"),
  nbrEch: bigint({ mode: "number" }).notNull(),
})
  .algorithm("undefined")
  .sqlSecurity("definer")
  .as(
    sql`select \`epim_spos\`.\`tec_customers\`.\`id\` AS \`id\`,\`epim_spos\`.\`tec_customers\`.\`name\` AS \`name\`,\`epim_spos\`.\`tec_customers\`.\`cf1\` AS \`cf1\`,\`epim_spos\`.\`tec_customers\`.\`cf2\` AS \`cf2\`,count(0) AS \`nombre\`,sum(\`epim_spos\`.\`tec_sales\`.\`total\`) AS \`totals\`,count(\`epim_spos\`.\`tec_sale_items\`.\`id\`) AS \`nbrEch\` from ((\`epim_spos\`.\`tec_customers\` join \`epim_spos\`.\`tec_sales\` on(\`epim_spos\`.\`tec_sales\`.\`customer_id\` = \`epim_spos\`.\`tec_customers\`.\`id\`)) join \`epim_spos\`.\`tec_sale_items\` on(\`epim_spos\`.\`tec_sales\`.\`id\` = \`epim_spos\`.\`tec_sale_items\`.\`sale_id\`)) group by \`epim_spos\`.\`tec_customers\`.\`id\``
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
