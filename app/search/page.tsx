import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import AllSong from "@/components/app-allsong";
import { getSongs } from "../action";
import AppSearch from "@/components/app-search";
import { Song } from "../types/Song";
import AppText from "@/components/app-text";

export default async function Page({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const resolvedSearchParams = await searchParams;
    const searchQuery = typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : undefined;

    const result = await getSongs({
        musicName: searchQuery
    });
    const songs: Song[] = result?.data?.data ?? [];


    return (
        <SidebarProvider>
            <SidebarInset>
                <div className="flex justify-center items-center flex-col container mx-auto px-4 py-2">
                    <AppText text='Search' />
                    <AppSearch />
                </div>
                <AllSong songs={songs} />
            </SidebarInset>
        </SidebarProvider>
    );
}