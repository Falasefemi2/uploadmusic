"use client";

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { PlayButton } from "./app-playbutton"
import Image from "next/image";

interface Song {
    id: string
    title: string
    artist: string
    songUrl: string
    imageUrl: string | null
}

interface SongItemProps {
    song: Song
    onPlay: (song: Song) => void
}

export function SongItem({ song, onPlay }: SongItemProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Card
            className="relative overflow-hidden transition-all duration-300 ease-in-out transform hover:shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CardContent className="p-4 flex items-center space-x-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                    {song.imageUrl ? (
                        <Image src={song.imageUrl} alt={song.title} className="w-full h-full object-cover rounded" fill />
                    ) : (
                        <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-gray-400">No Image</span>
                        </div>
                    )}
                    {isHovered && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <PlayButton onClick={() => onPlay(song)} />
                        </div>
                    )}
                </div>
                <div className="flex-grow">
                    <h3 className="text-lg font-semibold truncate">{song.title}</h3>
                    <p className="text-sm text-gray-500 truncate">{song.artist}</p>
                </div>
            </CardContent>
        </Card>
    )
}