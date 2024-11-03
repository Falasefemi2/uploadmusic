"use client";

import { Loader2, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PlayButtonProps {
    onClick: () => void;
    isPlaying?: boolean;
    isLoading?: boolean;
    isPause?: boolean;
}

export function PlayButton({ onClick, isPlaying = false, isLoading = false, isPause = false }: PlayButtonProps) {
    return (
        <Button
            onClick={onClick}
            size="icon"
            disabled={isLoading}
            className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        >
            {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
            ) : isPause ? (
                <Play className="w-6 h-6" />
            ) : isPlaying ? (
                <Pause className="w-6 h-6" />
            ) : (
                <Play className="w-6 h-6" />
            )}

        </Button>
    )
}