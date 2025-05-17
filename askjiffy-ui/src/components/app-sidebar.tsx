"use client"

import { Wrench, BookText } from "lucide-react"
import { usePathname } from 'next/navigation'

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
import ChatHistory from "./ui/chat/chatHistory"
import { useEffect, useState } from "react"

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
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  let showChatHistory = false;
  
  //empty dependency array runs once on component mount
  useEffect( () => {
    setIsMounted(true);
  },[])

  if(isMounted){
    if(pathname === "/" || pathname.startsWith('/chat')){
      showChatHistory = true;
    }
  }
  
 
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
        { showChatHistory ? 
          (<SidebarGroup>
              <SidebarGroupLabel>Chat Session History</SidebarGroupLabel>
              <SidebarGroupContent>
                  <SidebarMenu>
                    <ChatHistory />
                  </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>)
            : 
            null
        }
      </SidebarContent>
    </Sidebar>
  )
}
