"use client";

import * as React from "react";
import { Command, WalletCards } from "lucide-react";
import Link from "next/link";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Epim",
    email: "Souhaib@epim.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Paiements",
      url: "/dashboard/payments",
      icon: WalletCards,
      isActive: true,
      // items: [
      //   {
      //     title: "Etat des paiements FP",
      //     url: "#",
      //   },
      //   {
      //     title: "Etat des paiements FEDE",
      //     url: "#",
      //   },
      //   {
      //     title: "Etat des paiements localtion",
      //     url: "#",
      //   },
      //   {
      //     title: "Etat des paiements  FC",
      //     url: "#",
      //   },
      // ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="font-semibold">EPIM</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
