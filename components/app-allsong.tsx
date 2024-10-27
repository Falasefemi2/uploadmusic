// interface Song {
//     id: string;
//     title: string;
//     artist: string;
//     songUrl: string;
//     imageUrl: string | null;
// }

// interface AllSongProps {
//     songs: Song[] | null;
// }

// export default function AllSong({ songs }: AllSongProps) {
//     if (!songs || songs.length === 0) {
//         return <div>No songs found</div>;
//     }

//     return (
//         <div>
//             {songs.map((song) => (
//                 <div key={song.id}>
//                     <h3>{song.title}</h3>
//                     <p>Artist: {song.artist}</p>
//                 </div>
//             ))}
//         </div>
//     );
// }
"use client";

import { SongItem } from "./app-songitem"

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {songs.map((song) => (
                <SongItem key={song.id} song={song} onPlay={handlePlay} />
            ))}
        </div>
    )
}