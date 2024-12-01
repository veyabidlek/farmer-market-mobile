// uploadProductImage.js
import { BACKEND_URL } from "../config";
import * as FileSystem from "expo-file-system";

export const uploadImage = async (imageFile) => {
  try {
    console.log("Image file:", imageFile);

    const fileUri = imageFile.uri;

    console.log("Uploading image to server using FileSystem.uploadAsync...");

    const uploadUrl = `${BACKEND_URL}/firebase/upload`;

    const result = await FileSystem.uploadAsync(uploadUrl, fileUri, {
      headers: {
        Accept: "application/json",
      },
      fieldName: "file",
      httpMethod: "POST",
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      parameters: {
        // Include additional parameters if your backend expects them
      },
    });

    console.log("Upload result:", result);

    if (result.status !== 200 && result.status !== 201) {
      throw new Error(`Server error: ${result.status} ${result.body}`);
    }

    const data = JSON.parse(result.body);
    console.log("Upload response:", data);
    return data.file_url;
  } catch (err) {
    console.error("Error uploading image:", err);
    throw err;
  }
};
