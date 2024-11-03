"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { PlayButton } from "./app-playbutton"
import Image from "next/image"
import { Song } from "@/app/types/Song"


interface SongItemProps {
    song: Song;
    onPlay: (song: Song) => void;
    isPlaying: boolean;
    isLoading: boolean;
    isPause?: boolean;
}



export default function SongItem({ song, onPlay, isPlaying, isLoading, isPause = false }: SongItemProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Card
            className="relative overflow-hidden transition-all duration-300 ease-in-out transform hover:shadow-lg w-48"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CardContent className="p-4 flex flex-col space-y-4">
                <div className="relative w-full aspect-square">
                    {song.imageUrl ? (
                        <Image
                            src={song.imageUrl}
                            alt={song.title}
                            className="object-cover rounded-md"
                            fill
                        />
                    ) : (
                        <div className="w-full h-full bg-muted rounded-md flex items-center justify-center">
                            <span className="text-muted-foreground">No Image</span>
                        </div>
                    )}
                    {isHovered && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
                            <PlayButton
                                onClick={() => !isLoading && onPlay(song)} // Avoid clicking while loading
                                isPlaying={isPlaying}
                                isLoading={isLoading}
                                isPause={isPause}
                            />
                        </div>
                    )}
                </div>
                <div className="flex flex-col">
                    <h3 className="text-base font-semibold truncate">{song.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                </div>
            </CardContent>
        </Card>
    );
}
