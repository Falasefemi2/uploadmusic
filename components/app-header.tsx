import React from "react"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link"
import { auth, currentUser } from "@clerk/nextjs/server"
import { db } from "@/app/db"
import { users } from "@/app/db/schema"
import { eq } from "drizzle-orm"
import { UserButton } from "@clerk/nextjs"


export default async function AppHeader() {
    const user = await currentUser();
    const { userId } = await auth();

    if (user && userId) {
        try {
            const existingUser = await db.query.users.findFirst({
                where: (users, { eq }) => eq(users.clerkId, userId) // Use clerkId for finding users
            });

            if (!existingUser) {
                await db.insert(users).values({
                    clerkId: userId, // Store the Clerk user ID here
                    email: user.emailAddresses[0].emailAddress ?? "",
                    image: user.imageUrl ?? "",
                    name: user.fullName ?? "",
                    createdAt: new Date(),
                });
            } else if (
                existingUser.email !== user.emailAddresses[0].emailAddress ||
                existingUser.image !== user.imageUrl ||
                existingUser.name !== user.username
            ) {
                await db.update(users)
                    .set({
                        email: user.emailAddresses[0].emailAddress ?? "",
                        image: user.imageUrl ?? "",
                        name: user.fullName ?? "",
                    })
                    .where(eq(users.clerkId, userId)); // Use clerkId in update condition
            }
        } catch (error) {
            console.error("Error managing user:", error);
        }
    }


    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b px-4">
            <div className="flex flex-1 items-center gap-4">
                <SidebarTrigger />
                <Separator orientation="vertical" className="h-6" />
                <div className="relative flex-1 max-w-2xl">
                    <Input
                        type="text"
                        placeholder="Search music"
                        className="w-full pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                </div>
            </div>
            <div className="flex items-center gap-2">
                {user ? (
                    <UserButton />
                ) : (
                    <>
                        <Button variant="outline" asChild>
                            <Link href="/sign-in">Log in</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/sign-up">Sign up</Link>
                        </Button>
                    </>
                )}
            </div>
        </header>
    );
}
