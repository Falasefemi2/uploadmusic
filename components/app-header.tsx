import React from "react"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function AppHeader() {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b px-4">
            <div className="flex flex-1 items-center gap-4">
                <SidebarTrigger />
                <Separator orientation="vertical" className="h-6" />
                <div className="relative flex-1 max-w-2xl">
                    <Input
                        type="text"
                        placeholder="Search music"
                        className="w-full pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline">Log in</Button>
                <Button>Sign up</Button>
            </div>
        </header>
    )
}