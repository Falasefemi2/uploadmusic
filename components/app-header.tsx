import React from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link"
import { auth, currentUser } from "@clerk/nextjs/server"
import { db } from "@/app/db"
import { users } from "@/app/db/schema"
import { eq } from "drizzle-orm"
import { UserButton } from "@clerk/nextjs"
import AppSearch from "./app-search"


export default async function AppHeader() {
    const user = await currentUser();
    const { userId } = await auth();

    if (user && userId) {
        try {
            const existingUser = await db.query.users.findFirst({
                where: (users, { eq }) => eq(users.clerkId, userId)
            });

            if (!existingUser) {
                await db.insert(users).values({
                    clerkId: userId,
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
                    .where(eq(users.clerkId, userId));
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
                <AppSearch />
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
