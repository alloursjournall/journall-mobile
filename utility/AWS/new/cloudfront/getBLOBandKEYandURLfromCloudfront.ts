import { Platform } from 'react-native';

// not for audio!
// this is also only usable for

import * as FileSystem from 'expo-file-system';

export const getBLOBandKEYandURLfromCloudFront = async (file: string | { key: string; url?: string }) => {
    const CLOUDFRONT_BASE_URL = 'https://d1jfzczzc75ukf.cloudfront.net';
    const fileKey = typeof file === 'string' ? file : file?.key;
    const fullURL = typeof file === 'string' ? `${CLOUDFRONT_BASE_URL}/${fileKey}` : file.url || `${CLOUDFRONT_BASE_URL}/${fileKey}`;

    try {
        if (Platform.OS === 'web') {
            // 🌐 WEB
            const response = await fetch(fullURL);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const blob = await response.blob();

            const base64Data = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });

            const blobURL = URL.createObjectURL(blob);

            // 👇 add an explicit reupload blob reference
            const reuploadBlob = blob; // direct blob works for upload to S3

            return {
                key: fileKey,
                base64Data,
                blob,
                blobURL,
                reuploadBlob,
                reuploadBlobURL: blobURL, // for symmetry
                contentType: response.headers.get('content-type') || 'application/octet-stream',
                platform: 'web',
            };
        }

        // 📱 NATIVE (Expo / React Native)
        const localPath = `${(FileSystem as any).cacheDirectory}${fileKey.split('/').pop()}`;
        const destinationFile = new FileSystem.File(localPath);
        const { uri } = await FileSystem.File.downloadFileAsync(fullURL, destinationFile);
        // const { uri } = await FileSystem.downloadAsync(fullURL, localPath);

        // Detect file type based on extension
        const ext = fileKey.split('.').pop()?.toLowerCase();
        const typeMap: Record<string, string> = {
            mp3: 'audio/mpeg',
            m4a: 'audio/mp4',
            wav: 'audio/wav',
            aac: 'audio/aac',
            mp4: 'video/mp4',
            mov: 'video/quicktime',
            jpg: 'image/jpeg',
            jpeg: 'image/jpeg',
            png: 'image/png',
        };
        const contentType = typeMap[ext ?? ''] || 'application/octet-stream';

        // Local URI can be used as the "reupload blob"
        // Base64 data (for inline playback / re-upload)

        const base64Raw = await FileSystem.readAsStringAsync(uri, {
            encoding: 'base64', // ← Changed to string literal
        });
        const base64Data = `data:${contentType};base64,${base64Raw}`;

        // Prepare “reuploadBlob” placeholder for later uploads
        const info = await FileSystem.getInfoAsync(uri);
        const reuploadBlob = {
            uri,
            name: fileKey.split('/').pop(),
            type: contentType,
            size: info.exists ? info.size : undefined,
            platform: Platform.OS,
        };

        return {
            key: fileKey,
            uri,
            reuploadURI: uri, // <--- this is your reupload handle
            base64Data: base64Data,
            // base64Data: `data:audio/mpeg;base64,${base64Raw}`,
            reuploadBlobURL: uri,
            blob: reuploadBlob,
            contentType: contentType,
            platform: Platform.OS,
        };
    } catch (err) {
        console.error('Error downloading from CloudFront:', err);
        return null;
    }
};

// export const getBLOBandKEYandURLfromCloudFront = async (file: string | { key: string; url?: string }) => {
//     console.log('file', file);
//     const CLOUDFRONT_BASE_URL = 'd1jfzczzc75ukf.cloudfront.net'; // or process.env.CLOUDFRONT_BASE_URL
//     const fileKey = typeof file === 'string' ? file : file?.key;
//     const fullURL = typeof file === 'string' ? `${CLOUDFRONT_BASE_URL}/${fileKey}` : file.url || `${CLOUDFRONT_BASE_URL}/$fileKey)}`;

//     // ? `${CLOUDFRONT_BASE_URL}/${encodeURIComponent(fileKey)}`
//     // : decodeURIComponent(file.url || `${CLOUDFRONT_BASE_URL}/${encodeURIComponent(fileKey)}`);

//     try {
//         // 1️⃣ Fetch directly from CloudFront
//         const response = await fetch(fullURL);
//         if (!response.ok) throw new Error(`HTTP ${response.status}`);

//         // 2️⃣ Content type
//         const contentType = response.headers.get('content-type') || 'application/octet-stream';

//         // 3️⃣ Blob
//         const blob = await response.blob();

//         // 4️⃣ Base64
//         const base64Data = await new Promise<string>((resolve, reject) => {
//             const reader = new FileReader();
//             reader.onloadend = () => resolve(reader.result as string);
//             reader.onerror = reject;
//             reader.readAsDataURL(blob);
//         });

//         // 5️⃣ Browser-only Blob URL
//         const blobURL = Platform.OS === 'web' ? URL.createObjectURL(blob) : null;

//         return { base64Data, blobURL, blob, key: fileKey, contentType };
//     } catch (err) {
//         console.error('Error downloading from CloudFront:', err);
//         return null;
//     }
// };

export default getBLOBandKEYandURLfromCloudFront;
