import { db } from "@/app/db";
import { songs, users } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Music2, User } from "lucide-react";

async function getSongsByClerkId(clerkId: string) {
    const user = await db.select().from(users).where(eq(users.clerkId, clerkId));

    if (!user.length) return [];

    const userSongs = await db.select().from(songs).where(eq(songs.userId, user[0].id));
    return userSongs;
}

interface UserSongsProps {
    userId: string;
}

export async function UserSongs({ userId }: UserSongsProps) {
    const userSongs = await getSongsByClerkId(userId);

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Music2 className="h-6 w-6" />
                    Your Songs
                </CardTitle>
            </CardHeader>
            <CardContent>
                {!userSongs.length ? (
                    <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
                        <User className="h-12 w-12 mb-4" />
                        <p>No songs found.</p>
                    </div>
                ) : (
                    <ScrollArea className="h-[400px] pr-4">
                        <div className="space-y-4">
                            {userSongs.map((song) => (
                                <div key={song.id} className="flex items-center space-x-4 p-2 rounded-lg transition-colors hover:bg-muted">
                                    <div className="flex-shrink-0">
                                        {song.imageUrl ? (
                                            <Image
                                                src={song.imageUrl}
                                                alt={song.title}
                                                className="w-16 h-16 object-cover rounded-md"
                                                width={64}
                                                height={64}
                                            />
                                        ) : (
                                            <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                                                <Music2 className="h-8 w-8 text-muted-foreground" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-medium text-foreground">{song.title}</p>
                                        <p className="text-sm text-muted-foreground">{song.artist}</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Added {new Date(song.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                )}
            </CardContent>
        </Card>
    );
}