import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SongListLoader() {
    const loadingItems = Array(8).fill(null)

    return (
        <div className="container mx-auto px-4 py-8">
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {loadingItems.map((_, index) => (
                    <Card key={index} className="relative overflow-hidden w-48">
                        <CardContent className="p-4 flex flex-col space-y-4">
                            <Skeleton className="w-full aspect-square rounded-md" />
                            <div className="flex flex-col space-y-2">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-3 w-1/2" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}