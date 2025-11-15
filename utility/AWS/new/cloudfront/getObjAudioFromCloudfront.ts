import { Platform } from "react-native";
import * as FileSystem from "expo-file-system/legacy";

export default async function (key: string) {
  const CLOUDFRONT_BASE_URL = "https://d1jfzczzc75ukf.cloudfront.net"; // 🔧 your domain
  const fullURL = `${CLOUDFRONT_BASE_URL}/${key}`;
  console.log("Fetching audio from:", fullURL);

  try {
    // 🌐 WEB
    if (Platform.OS === "web") {
      const response = await fetch(fullURL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const blob = await response.blob();

      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader?.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      const blobURL = URL.createObjectURL(blob);
      return {
        key,
        base64Data, // usable for upload
        blob, // raw Blob
        blobURL, // for <audio source={...}>
        contentType: response?.headers?.get("content-type") || "audio/mpeg",
        platform: "web",
      };
    }

    // 📱 NATIVE (Expo Android / iOS)
    const localPath = `${FileSystem.cacheDirectory}${key?.split("/").pop()}`;
    const { uri } = await FileSystem.downloadAsync(fullURL, localPath);

    // convert to base64 if you need to re-upload
    const base64Raw = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const info = await FileSystem.getInfoAsync(uri);

    const reuploadBlob = {
      uri,
      name: key.split("/").pop(),
      type: "audio/mpeg",
      // optional for debugging
      size: info.exists ? info.size : undefined, // ✅ only access size if exists
      platform: Platform.OS,
    };

    return {
      key,
      uri, // local playable file path
      base64Data: `data:audio/mpeg;base64,${base64Raw}`,
      contentType: "audio/mpeg",
      platform: Platform.OS,
      blob: reuploadBlob,
    };
  } catch (err) {
    console.error("Error fetching from CloudFront:", err);
    return null;
  }
}

// export default async function (key: string) {
//   const CLOUDFRONT_BASE_URL = "https://d1jfzczzc75ukf.cloudfront.net"; // 🔧 your domain
//   const fullURL = `${CLOUDFRONT_BASE_URL}/${key}`;
//   console.log("Fetching audio from:", fullURL);

//   try {
//     // 🌐 WEB
//     if (Platform.OS === "web") {
//       const response = await fetch(fullURL);
//       if (!response.ok) throw new Error(`HTTP ${response.status}`);

//       const blob = await response.blob();

//       const base64Data = await new Promise<string>((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onloadend = () => resolve(reader.result as string);
//         reader.onerror = reject;
//         reader.readAsDataURL(blob);
//       });

//       const blobURL = URL.createObjectURL(blob);
//       return {
//         key,
//         base64Data, // usable for upload
//         blob, // raw Blob
//         blobURL, // for <audio source={...}>
//         contentType: response.headers.get("content-type") || "audio/mpeg",
//         platform: "web",
//       };
//     }

//     // 📱 NATIVE (Expo Android / iOS)
//     // const localPath = `${FileSystem.cacheDirectory}${fileKey.split('/').pop()}`;

//     const localPath = `${(FileSystem as any).cacheDirectory}${key
//       .split("/")
//       .pop()}`;
//     const destinationFile = new FileSystem.File(localPath);
//     // const localPath = `${FileSystem.cacheDirectory}${key?.split('/').pop()}`;
//     const { uri } = await FileSystem.File.downloadFileAsync(
//       fullURL,
//       destinationFile
//     );
//     // const { uri } = await FileSystem.downloadAsync(fullURL, localPath);

//     // convert to base64 if you need to re-upload
//     const base64Raw = await FileSystem.readAsStringAsync(uri, {
//       encoding: "base64", // ← Changed to string literal
//     });

//     const info = await FileSystem.getInfoAsync(uri);

//     const reuploadBlob = {
//       uri,
//       name: key.split("/").pop(),
//       type: "audio/mpeg",
//       // optional for debugging
//       size: info.exists ? info.size : undefined, // ✅ only access size if exists
//       platform: Platform.OS,
//     };

//     return {
//       key,
//       uri, // local playable file path
//       base64Data: `data:audio/mpeg;base64,${base64Raw}`,
//       contentType: "audio/mpeg",
//       platform: Platform.OS,
//       blob: reuploadBlob,
//     };
//   } catch (err) {
//     console.error("Error fetching from CloudFront:", err);
//     return null;
//   }
// }
