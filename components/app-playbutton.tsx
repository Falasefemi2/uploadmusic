"use client";

import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PlayButtonProps {
    onClick: () => void
}

export function PlayButton({ onClick }: PlayButtonProps) {
    return (
        <Button
            onClick={onClick}
            size="icon"
            className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        >
            <Play className="w-6 h-6" />
        </Button>
    )
}