'use client'

import * as React from "react"
import { Home, Search, Plus, Music } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useIsMobile } from "@/hooks/use-mobile"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  const isMobile = useIsMobile()

  const renderPlaylistCreation = () => {
    if (isMobile) {
      return (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <SidebarMenuButton>
              <Plus className="h-4 w-4 mr-2" />
              Create Playlist
            </SidebarMenuButton>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Create Playlist</DrawerTitle>
              <DrawerDescription>
                Give your playlist a name and start adding songs.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <input
                type="text"
                placeholder="Playlist name"
                className="w-full p-2 border rounded"
              />
              <Button className="mt-4 w-full">Create</Button>
            </div>
          </DrawerContent>
        </Drawer>
      )
    } else {
      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <SidebarMenuButton>
              <Plus className="h-4 w-4 mr-2" />
              Create Playlist
            </SidebarMenuButton>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Playlist</DialogTitle>
              <DialogDescription>
                Give your playlist a name and start adding songs.
              </DialogDescription>
            </DialogHeader>
            <div className="p-4">
              <input
                type="text"
                placeholder="Playlist name"
                className="w-full p-2 border rounded"
              />
              <Button className="mt-4 w-full">Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      )
    }
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <Music className="h-6 w-6" />
                <span className="font-semibold">Music App</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/"}>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/search"}>
              <Link href="/search">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            {renderPlaylistCreation()}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}