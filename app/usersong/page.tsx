import { UserSongs } from "@/components/app-usersong";
import { auth } from "@clerk/nextjs/server";
// import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import UserLoading from "./loading";

export default async function UserSongPage() {
    const { userId } = await auth();
    return (
        <main className="px-4 sm:px-6 lg:px-8 py-8">
            <Suspense fallback={<UserLoading />}>
                <UserSongs userId={userId ?? ""} />
            </Suspense>

        </main>

    )
}

