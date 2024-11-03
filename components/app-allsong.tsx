"use client";



import { Song } from "@/app/types/Song";
import SongItem from "./app-songitem";
import { useState, useRef, useEffect } from "react";
import ReactAudioPlayer from 'react-audio-player';
import AudioPlayer from "./app-audioplayer";

interface AllSongProps {
    songs: Song[];
}

export default function AllSong({ songs }: AllSongProps) {
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const audioRef = useRef<ReactAudioPlayer>(null);

    useEffect(() => {
        if (audioRef.current?.audioEl.current) {
            console.log('Audio element ready');
            audioRef.current.audioEl.current.onerror = (e) => {
                console.error('Audio element error:', e);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audioRef.current]);


    if (!Array.isArray(songs) || songs.length === 0) {
        return <div className="text-center text-gray-500 py-8">No songs found</div>;
    }

    const handlePlay = async (song: Song) => {
        try {
            console.log('Attempting to play:', song.songUrl);
            if (currentSong?.id === song.id) {
                console.log('Toggling current song');
                // Toggle play/pause for current song
                if (isPlaying) {
                    audioRef.current?.audioEl.current?.pause();
                    setIsPlaying(false);
                } else {
                    audioRef.current?.audioEl.current?.play();
                    setIsPlaying(true);
                }
                return;
            }

            setIsLoading(true);
            // Try to fetch the audio file first
            const response = await fetch(song.songUrl);
            console.log('Fetch response:', response.status);
            if (!response.ok) {
                throw new Error('Failed to load audio file');
            }
            const blob = await response.blob();
            const audioUrl = URL.createObjectURL(blob);

            // Update the current song with the local blob URL
            console.log('Blob URL created:', audioUrl);  // Add this debug log
            setCurrentSong({
                ...song,
                songUrl: audioUrl
            });
            setIsPlaying(true);
        } catch (error) {
            console.error('Error loading audio:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePrevious = () => {
        const currentIndex = songs.findIndex(song => song.id === currentSong?.id)
        if (currentIndex > 0) {
            setCurrentSong(songs[currentIndex - 1])
        }
    }

    const handleNext = () => {
        const currentIndex = songs.findIndex(song => song.id === currentSong?.id)
        if (currentIndex < songs.length - 1) {
            setCurrentSong(songs[currentIndex + 1])
        }
    }


    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-8 pb-24 overflow-y-auto" style={{ height: 'calc(100vh - 72px)' }}>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {songs.map((song) => (
                        <SongItem
                            key={song.id}
                            song={song}
                            onPlay={handlePlay}
                            isPlaying={isPlaying && currentSong?.id === song.id}
                            isLoading={isLoading && !currentSong && song.id === songs.find(s => s.songUrl === song.songUrl)?.id}
                            isPause={!isPlaying && currentSong?.id === song.id}
                        />
                    ))}
                </div>
            </div>
            <AudioPlayer
                currentSong={currentSong}
                onPrevious={handlePrevious}
                onNext={handleNext}
            />
        </div>

    );
}