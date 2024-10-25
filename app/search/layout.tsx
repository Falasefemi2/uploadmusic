import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Search your music",
    description: "Search for music",
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}