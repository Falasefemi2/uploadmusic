"use client";

import { Song } from "@/app/types/Song";
import SongItem from "./app-songitem";
// import AppText from "./app-text";

interface AllSongProps {
    songs: Song[];
}

export default function AllSong({ songs }: AllSongProps) {
    if (!Array.isArray(songs) || songs.length === 0) {
        return <div className="text-center text-gray-500 py-8">No songs found</div>;
    }


    const handlePlay = (song: Song) => {
        console.log(`Playing: ${song.title} by ${song.artist}`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {songs.map((song) => (
                    <SongItem key={song.id} song={song} onPlay={handlePlay} />
                ))}
            </div>
        </div>
    );
}