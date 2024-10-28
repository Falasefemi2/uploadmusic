
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { getSongs } from "../action"
import AllSong from "@/components/app-allsong";




export default async function Page() {
    const result = await getSongs()
    const songs = result?.data ?? null;

    return (
        <SidebarProvider>
            <SidebarInset>
                <AllSong songs={songs} />
            </SidebarInset>
        </SidebarProvider>
    )
}
