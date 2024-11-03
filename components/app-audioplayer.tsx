'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Song } from '@/app/types/Song'
import Image from 'next/image'


interface AudioPlayerProps {
    currentSong: Song | null
    onPrevious?: () => void
    onNext?: () => void
}

export default function AudioPlayer({ currentSong, onPrevious, onNext }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [volume, setVolume] = useState(1)
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        if (currentSong) {
            setIsPlaying(true)
            audioRef.current?.play()
        }
    }, [currentSong])

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const setAudioData = () => {
            setDuration(audio.duration)
            setCurrentTime(audio.currentTime)
        }

        const setAudioTime = () => setCurrentTime(audio.currentTime)

        audio.addEventListener('loadeddata', setAudioData)
        audio.addEventListener('timeupdate', setAudioTime)

        return () => {
            audio.removeEventListener('loadeddata', setAudioData)
            audio.removeEventListener('timeupdate', setAudioTime)
        }
    }, [])

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current?.pause()
        } else {
            audioRef.current?.play()
        }
        setIsPlaying(!isPlaying)
    }

    const handleVolumeChange = (newVolume: number[]) => {
        const volumeValue = newVolume[0]
        setVolume(volumeValue)
        if (audioRef.current) {
            audioRef.current.volume = volumeValue
        }
    }

    const handleTimeChange = (newTime: number[]) => {
        const timeValue = newTime[0]
        setCurrentTime(timeValue)
        if (audioRef.current) {
            audioRef.current.currentTime = timeValue
        }
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    if (!currentSong) {
        return null
    }

    return (
        <div className="fixed bottom-0 left-0 md:left-[240px] right-0 h-[72px] border-t bg-background z-50">
            <div className="flex h-full items-center px-4">
                <div className="flex items-center gap-3 w-[30%] min-w-[180px]">
                    {currentSong.imageUrl && (
                        <Image
                            src={currentSong.imageUrl}
                            alt={`${currentSong.title} cover`}
                            className="h-12 w-12 rounded-md object-cover"
                            width={48} height={48}
                        />
                    )}
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-medium truncate">{currentSong.title}</span>
                        <span className="text-xs text-muted-foreground truncate">{currentSong.artist}</span>
                    </div>
                </div>

                <div className="flex flex-col items-center flex-1 gap-1 px-4">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onPrevious}>
                            <SkipBack className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={togglePlayPause}>
                            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onNext}>
                            <SkipForward className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex items-center gap-2 w-full max-w-[600px]">
                        <span className="text-xs w-12 text-muted-foreground">
                            {formatTime(currentTime)}
                        </span>
                        <Slider
                            value={[currentTime]}
                            max={duration}
                            step={1}
                            onValueChange={handleTimeChange}
                            className="w-full"
                        />
                        <span className="text-xs w-12 text-muted-foreground">
                            {formatTime(duration)}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 w-[20%] min-w-[120px] justify-end">
                    <Volume2 className="h-4 w-4" />
                    <Slider
                        value={[volume]}
                        max={1}
                        step={0.01}
                        onValueChange={handleVolumeChange}
                        className="w-24"
                    />
                </div>

                <audio
                    ref={audioRef}
                    src={currentSong.songUrl}
                    onEnded={() => setIsPlaying(false)}
                />
            </div>
        </div>
    )
}