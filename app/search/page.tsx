import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import AllSong from "@/components/app-allsong";
import { getSongs } from "../action";
// import { Song } from "../types/Song";




export default async function Page() {
    const searchSongs = await getSongs({})


    return (
        <SidebarProvider>
            <SidebarInset>
                <AllSong songs={searchSongs?.data ?? []} />
            </SidebarInset>
        </SidebarProvider>
    );
}
