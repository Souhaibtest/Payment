"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  //   BreadcrumbPage,
  //   BreadcrumbSeparator,
} from "./breadcrumb";
import { usePathname } from "next/navigation";
export default function BreadCurmbreSepartor() {
  const pathname = usePathname();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href={`${pathname}`}>
            {pathname.split("/")[2]}
          </BreadcrumbLink>
        </BreadcrumbItem>
        {/* <BreadcrumbSeparator className="hidden md:block" /> */}
        {/* <BreadcrumbItem>
          <BreadcrumbPage>Data Fetching</BreadcrumbPage>
        </BreadcrumbItem> */}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
