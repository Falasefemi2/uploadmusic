import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Your music",
    description: "Music You Added",
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}