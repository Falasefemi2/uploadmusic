import AllSong from "@/components/app-allsong"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { getSongs } from "./action";
import { Song } from "./types/Song";


export default async function Page() {

  const result = await getSongs({});
  const songs = (result?.data as Song[]) ?? [];
 
  return (
    <SidebarProvider>
      <SidebarInset>
        <AllSong songs={songs} />
      </SidebarInset>
    </SidebarProvider>
  )
}
