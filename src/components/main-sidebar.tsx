import { AddContentModal as AddContent } from "@/components/add-content-modal";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAddContentModal } from "@/stores";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/tanstack-react-start";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArchiveIcon, InboxIcon } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";

export function MainSidebar() {
  const navigate = useNavigate();
  const modalStateStore = useAddContentModal();
  useHotkeys("n", () => modalStateStore.set("open"), { preventDefault: true });
  useHotkeys("c", () => navigate({ to: "/chat/new" }), { preventDefault: true });

  const chats = [
    { id: 1, title: "Pros and Cons of Sony WF-1000XM5 Wireless Headphones" },
    { id: 2, title: "Popular Advice for 20 Year Olds" },
    { id: 3, title: "The Future of AI in Everyday Life" },
    { id: 4, title: "Top 10 Travel Destinations for 2024" },
    { id: 5, title: "Healthy Eating on a Budget" },
    { id: 6, title: "The Impact of Social Media on Mental Health" },
    { id: 7, title: "How to Start a Successful Side Hustle" },
    { id: 8, title: "Understanding Cryptocurrency and Blockchain" },
    { id: 9, title: "The Benefits of Mindfulness and Meditation" },
    { id: 10, title: "Sustainable Living Tips for Beginners" },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="pt-2 px-4 flex flex-row items-center justify-between">
          <Link to="/">
            <span className="text-lg font-bold">readr</span>
          </Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </SidebarHeader>
      <SidebarContent className="mt-4 mx-4">
        <AddContent />

        <SidebarMenu className="mt-3 gap-1">
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="pl-4 flex flex-row items-center gap-3">
              <Link to="/">
                <InboxIcon className="mr-2 size-[18px]" />
                <span className="text-sm font-medium">inbox</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="pl-4 flex flex-row items-center gap-3">
              <Link to="/archive">
                <ArchiveIcon className="mr-2 size-[18px]" />
                <span className="text-sm font-medium">archive</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="mt-0.5" />

        <div className="pl-2 flex flex-row items-center justify-between">
          <span className="text-base font-semibold">
            chats
          </span>
          <Button variant="ghost" size="sm" className="opacity-50 hover:opacity-100">
            <Link to="/chat/new">
              + new chat {" "} <Kbd>c</Kbd>
            </Link>
          </Button>
        </div>
        <SidebarMenu className="gap-1">
          <SignedIn>
            {chats.map(chat => (
              <SidebarMenuItem className="hover:cursor-pointer" key={chat.id}>
                <SidebarMenuButton asChild className="flex flex-row items-center gap-3">
                  <Link to={`/chat/${chat.id}`}>
                    <Tooltip>
                      <TooltipTrigger className="truncate">
                        <span className="text-sm text-muted-foreground font-medium">{chat.title}</span>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <span className="text-sm">{chat.title}</span>
                      </TooltipContent>
                    </Tooltip>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SignedIn>
          <SignedOut>
            <div className="p-4 text-sm text-muted-foreground">
              Sign in to see your chats.
            </div>
          </SignedOut>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <span className="pl-1 text-xs text-muted-foreground font-medium">v0.0.1-alpha</span>
      </SidebarFooter>
    </Sidebar>
  );
}
