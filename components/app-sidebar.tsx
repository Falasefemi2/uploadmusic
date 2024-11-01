
'use client'

import * as React from "react"
import { Home, Search, Plus, Music } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
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
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useIsMobile } from "@/hooks/use-mobile"
import MusicUploadForm from "./app-songform"
import { useUser } from '@clerk/nextjs'




export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  const isMobile = useIsMobile()
  const { isSignedIn } = useUser()

  const router = useRouter()

  const handlePlaylistClick = (e: React.MouseEvent) => {
    if (!isSignedIn) {
      e.preventDefault()
      router.push('/sign-in')
      return
    }
    setOpen(true)
  }


  const renderPlaylistCreation = () => {
    if (isMobile) {
      return (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <SidebarMenuButton onClick={handlePlaylistClick}>
              <Plus className="h-4 w-4 mr-2" />
              Create Playlist
            </SidebarMenuButton>
          </DrawerTrigger>
          <DrawerContent>
            <MusicUploadForm />
          </DrawerContent>
        </Drawer>
      )
    } else {
      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <SidebarMenuButton onClick={handlePlaylistClick}>
              <Plus className="h-4 w-4 mr-2" />
              Create Playlist
            </SidebarMenuButton>
          </DialogTrigger>
          <DialogContent>
            <MusicUploadForm />
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
