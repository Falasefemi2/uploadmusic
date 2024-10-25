/** @format */

"use server";

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { auth } from "@clerk/nextjs/server";
import { UTApi } from "uploadthing/server";
import { db } from "./db";
import { songs } from "./db/schema";
import { revalidatePath } from "next/cache";

// const utapi = new UTApi();

// const schema = z.object({
//   artistName: z
//     .string()
//     .min(2, { message: "Artist name must be at least 2 characters." }),
//   musicTitle: z
//     .string()
//     .min(2, { message: "Music title must be at least 2 characters." }),
//   songImage: z
//     .instanceof(File)
//     .refine((file) => file.size <= 5000000, `Max image size is 5MB.`)
//     .refine(
//       (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
//       "Only .jpg, .png, and .webp formats are supported."
//     ),
//   songFile: z
//     .instanceof(File)
//     .refine((file) => file.size <= 10000000, `Max file size is 10MB.`)
//     .refine(
//       (file) => ["audio/mpeg", "audio/wav"].includes(file.type),
//       "Only .mp3 and .wav formats are supported."
//     ),
// });

// export const createSong = actionClient
//   .schema(schema)
//   .action(
//     async ({
//       parsedInput: { artistName, musicTitle, songImage, songFile },
//     }) => {
//       try {
//         const { userId } = await auth();
//         if (!userId) {
//           throw new Error("Unauthorized");
//         }

//         const imageFile = new UTFile([songImage], songImage.name, {
//           customId: artistName,
//         });
//         const audioFile = new UTFile([songFile], songFile.name, {
//           customId: musicTitle,
//         });

//         // Upload files
//         const imageResponse = await utapi.uploadFiles([imageFile]);
//         const audioResponse = await utapi.uploadFiles([audioFile]);

//         // create songs
//         const newSongs = await db
//           .insert(songs)
//           .values({
//             userId,
//             title: musicTitle,
//             artist: artistName,
//             songUrl: audioResponse[0]?.data?.url ?? "",
//             imageUrl: imageResponse[0]?.data?.url ?? "",
//           })
//           .returning();

//         revalidatePath("/");

//         return {
//           success: true,
//           song: newSongs[0],
//         };
//       } catch (error) {
//         console.error("Error creating song:", error);
//         return {
//           success: false,
//           error:
//             error instanceof Error ? error.message : "Something went wrong",
//         };
//       }
//     }
//   );

const utapi = new UTApi();

const schema = z.object({
  artistName: z
    .string()
    .min(2, { message: "Artist name must be at least 2 characters." }),
  musicTitle: z
    .string()
    .min(2, { message: "Music title must be at least 2 characters." }),
  songImage: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, `Max image size is 5MB.`)
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only .jpg, .png, and .webp formats are supported."
    ),
  songFile: z
    .instanceof(File)
    .refine((file) => file.size <= 10000000, `Max file size is 10MB.`)
    .refine(
      (file) => ["audio/mpeg", "audio/wav"].includes(file.type),
      "Only .mp3 and .wav formats are supported."
    ),
});

export const createSong = actionClient
  .schema(schema)
  .action(
    async ({
      parsedInput: { artistName, musicTitle, songImage, songFile },
    }) => {
      try {
        const { userId } = await auth();
        if (!userId) {
          throw new Error("Unauthorized");
        }

        // Convert Files to Buffers
        const imageBuffer = Buffer.from(await songImage.arrayBuffer());
        const audioBuffer = Buffer.from(await songFile.arrayBuffer());

        // Upload files
        const imageResponse = await utapi.uploadFiles([
          new File([imageBuffer], songImage.name, { type: songImage.type }),
        ]);

        const audioResponse = await utapi.uploadFiles([
          new File([audioBuffer], songFile.name, { type: songFile.type }),
        ]);

        if (!imageResponse[0]?.data?.url || !audioResponse[0]?.data?.url) {
          throw new Error("Failed to upload files");
        }

        // create songs
        const newSongs = await db
          .insert(songs)
          .values({
            userId,
            title: musicTitle,
            artist: artistName,
            songUrl: audioResponse[0]?.data?.url ?? "", // Accessing the url from data
            imageUrl: imageResponse[0]?.data?.url ?? "", // Accessing the url from data
          })
          .returning();

        revalidatePath("/");

        return {
          success: true,
          song: newSongs[0],
        };
      } catch (error) {
        console.error("Error creating song:", error);
        return {
          success: false,
          error:
            error instanceof Error ? error.message : "Something went wrong",
        };
      }
    }
  );
