"use client"

import { Calendar, Home, Inbox, Search, Settings, Wrench, BookText } from "lucide-react"
import { useRouter } from 'next/navigation'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

// Menu items.
const Links = [
  {
    title:"AskJiffy...",
    url:"/chat",
    icon: Wrench
  },
  {
    title:"Forum",
    url:"/forum",
    icon: BookText
  }
];
export function AppSidebar() {
  const router = useRouter();  

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigate</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Links.map((link) => (
                <SidebarMenuItem key={link.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={(link.url)}
                    >
                      <link.icon/>
                      <span>{link.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
