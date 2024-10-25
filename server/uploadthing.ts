/** @format */

import { UTApi, UTFile } from "uploadthing/server";

const utapi = new UTApi();

const file = new UTFile(["foo"], "foo.txt", { customId: "foo" });
try {
  const response = await utapi.uploadFiles([file]);
  // Handle the response as needed
  console.log(response); // Log the response for debugging
} catch (error) {
  console.error("Upload failed:", error); // Log any errors that occur
}
