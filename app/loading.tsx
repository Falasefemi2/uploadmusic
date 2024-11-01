import { Skeleton } from "@/components/ui/skeleton"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function Loading() {
    return (
        <SidebarProvider>
            <SidebarInset>
                <div className="container mx-auto px-4 py-2">
                    <Skeleton className="h-8 w-40 mb-6" /> {/* Placeholder for AppText "All Songs" */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {/* Placeholders for AllSong component */}
                        {[...Array(12)].map((_, index) => (
                            <div key={index} className="flex flex-col space-y-2">
                                <Skeleton className="h-48 w-full rounded-md" /> {/* Song image placeholder */}
                                <Skeleton className="h-4 w-3/4" /> {/* Song title placeholder */}
                                <Skeleton className="h-3 w-1/2" /> {/* Artist name placeholder */}
                            </div>
                        ))}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}