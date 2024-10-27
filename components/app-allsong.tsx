"use client";

import SongItem from "./app-songitem";

interface Song {
    id: string
    title: string
    artist: string
    songUrl: string
    imageUrl: string | null
}

interface AllSongProps {
    songs: Song[] | null
}

export default function AllSong({ songs }: AllSongProps) {
    if (!songs || songs.length === 0) {
        return <div className="text-center text-gray-500 py-8">No songs found</div>
    }

    const handlePlay = (song: Song) => {
        // Implement play functionality here
        console.log(`Playing: ${song.title} by ${song.artist}`)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">All Songs</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {songs.map((song) => (
                    <SongItem key={song.id} song={song} onPlay={handlePlay} />
                ))}
            </div>
        </div>
    )
}