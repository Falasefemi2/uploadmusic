import AllSong from "@/components/app-allsong"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { getSongs } from "./action";
import { Song } from "./types/Song";
import AppText from "@/components/app-text";


export default async function Page() {

  const result = await getSongs({});
  const songs: Song[] = result?.data?.data ?? [];

  return (
    <SidebarProvider>
      <SidebarInset>
        <AppText text="All Songs" />
        <AllSong songs={songs} />
      </SidebarInset>
    </SidebarProvider>
  )
}
