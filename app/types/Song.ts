/** @format */

export interface Song {
  id: string; // Unique identifier for the song
  createdAt: Date; // Timestamp when the song was created
  title: string; // Title of the song
  artist: string; // Artist of the song
  songUrl: string; // URL to the song file
  imageUrl: string | null; // URL to the song's cover image, can be null
  userId: string; // ID of the user who uploaded the song
}
