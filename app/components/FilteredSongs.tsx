"use client"; // This makes the component a client component

import { useSearch } from "@/context/SearchContext";
import AllSong from "@/components/app-allsong";
import { Song } from "../types/Song";

interface FilteredSongsProps {
    songs: Song[];
}

export default function FilteredSongs({ songs }: FilteredSongsProps) {
    const searchContext = useSearch(); // Get the search context

    if (!searchContext) return null; // Handle the case where searchContext is null

    const { searchQuery } = searchContext; // Now it's safe to access searchQuery

    const filteredSongs = songs.filter((song) =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return <AllSong songs={filteredSongs} />; // Ensure filteredSongs matches the Song type
}
