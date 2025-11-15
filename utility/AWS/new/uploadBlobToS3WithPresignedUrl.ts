export default async function uploadBlobToS3WithPresignedUrl(presignedUrl: string, blob: Blob, fileType: string | null) {
    console.log('presignedUrl', presignedUrl);
    console.log('blob', blob);
    console.log('blob?.type', blob?.type);
    console.log('fileType', fileType);

    try {
        console.log('Uploading via presigned URL...');

        // 🚨 CRITICAL: Use the EXACT same Content-Type that was used to generate the presigned URL
        const contentType = fileType || blob?.type || 'application/octet-stream';

        const response = await fetch(presignedUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': contentType,
                // 'Content-Type': 'image/jpeg',
            },
            body: blob,
        });

        if (!response.ok) {
            throw new Error(`S3 upload failed: ${response.status} ${response.statusText}`);
        }

        console.log('✅ Upload success');
        return true;
    } catch (error) {
        console.error('Error uploading to S3 via presigned URL:', error);
        throw error;
    }
}

// ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️  getPresignedURL: ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️

//         getPresignedUploadURL: async (_: any, args: any) => {
//     const { key, contentType } = args;

//     console.log('🔄 TRYING ALTERNATIVE SIGNING METHOD');

//     const command = new PutObjectCommand({
//         Bucket: 'journall',
//         Key: key,
//         ContentType: contentType || 'image/jpeg',
//         // Explicitly force metadata
//         Metadata: {
//             'original-content-type': contentType || 'image/jpeg',
//         },
//     });

//     // Try with explicit signing options
//     const signedUrl = await getSignedUrl(S3, command, {
//         expiresIn: 60,
//         signableHeaders: new Set(['content-type']),
//         // Force these options
//         unhoistableHeaders: new Set(['content-type']),
//     });

//     console.log('🔄 ALTERNATIVE METHOD URL:', signedUrl.substring(0, 150));

//     const url = new URL(signedUrl);
//     console.log('🔄 X-Amz-SignedHeaders:', url.searchParams.get('X-Amz-SignedHeaders'));

//     const cloudfrontUrl = `https://${CLOUDFRONT_BASE_URL.replace(/^https?:\/\//, '')}/${encodeURI(key)}`;

//     if (cloudfrontUrl.includes('https://https://')) {
//         console.warn('⚠️ Double protocol detected in cloudfrontUrl:', cloudfrontUrl);
//     }
//     return JSON.stringify({ key, signedUrl, cloudfrontUrl, contentType, expiresIn: 60 });
// },
//     getPresignedUploadURL: async (_: any, args: any) => {
//     const { key, contentType } = args;

//     console.log('contentType', contentType);

//     // ✅ basic safety
//     if (!key.startsWith('media/')) {
//         throw new Error('Invalid key prefix');
//     }

//     // ✅ build the PutObjectCommand
//     const command = new PutObjectCommand({
//         Bucket: 'journall',
//         Key: key,
//         ContentType: contentType || 'image/jpeg', // 🚨 Force a default
//         Metadata: {
//             'content-type': contentType || 'image/jpeg' // 🚨 Explicit metadata
//         }
//     });
//     // ✅ explicitly tell the signer to include "content-type" in the signature
//     const signedUrl = await getSignedUrl(S3, command, {
//         expiresIn: 60,
//         // This line is the magic fix ↓↓↓
//         signableHeaders: new Set(['content-type']),
//     });

//     const cloudfrontUrl = `https://${CLOUDFRONT_BASE_URL.replace(/^https?:\/\//, '')}/${encodeURI(key)}`;
//     // const cloudfrontUrl = `https://${CLOUDFRONT_BASE_URL}/${encodeURI(key)}`;

//     const returnObj = {
//         key,
//         signedUrl,
//         cloudfrontUrl,
//         contentType,
//         expiresIn: 60,
//     };

//     console.log('✅ generated presigned URL with signed headers for', contentType);
//     console.log('signedUrl', signedUrl);

//     return JSON.stringify(returnObj);
// },
// getPresignedUploadURL: async (_: any, args: any) => {
//     const { key, contentType } = args;
//     // const { key, fileType, appAction } = args;

//     console.log('contentType', contentType);

//     // ✅ security check
//     if (!key.startsWith('media/')) throw new Error('Invalid key prefix');

//     const signedUrl = await getSignedUrl(
//         S3,
//         new PutObjectCommand({
//             Bucket: 'journall',
//             // Bucket: process.env.BUCKET_NAME!,
//             Key: key,
//             ContentType: contentType,
//         }),
//         { expiresIn: 60 },
//     );

//     const cloudfrontUrl = `https://${CLOUDFRONT_BASE_URL}/${encodeURI(key)}`;
//     const returnObj = { key, signedUrl, cloudfrontUrl, contentType, expiresIn: 60 };
//     const stringifiedReturnObject = JSON.stringify(returnObj);
//     return stringifiedReturnObject;
//     // return { key, signedUrl, cloudfrontUrl, contentType, expiresIn: 60 };
// },

// ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️  getPresignedURL: ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️ ⚡️

// try {
//     const testResponse = await fetch(testCloudfrontUrl);
//     console.log('🔍 CloudFront test response status:', testResponse.status);
//     console.log('🔍 CloudFront test response type:', testResponse.headers.get('content-type'));

//     if (testResponse.ok) {
//         const testBlob = await testResponse.blob();
//         console.log('✅ CloudFront test - blob type:', testBlob.type, 'size:', testBlob.size);
//     } else {
//         const errorText = await testResponse.text();
//         console.log('❌ CloudFront test error:', errorText.substring(0, 200));
//     }
// } catch (error) {
//     console.log('❌ CloudFront test fetch failed:', error);
// }

// export default async function uploadBlobToS3WithPresignedUrl(presignedUrl: string, blob: Blob, fileType: string | null) {
//     console.log('presignedUrl', presignedUrl);
//     console.log('blob', blob);
//     console.log('blob?.type', blob?.type);
//     console.log('fileType', fileType);

//     try {
//         console.log('Uploading via presigned URL...');
//         const response = await fetch(presignedUrl, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': fileType || blob?.type || 'application/octet-stream',
//                 // 'Content-Type': blob?. || 'application/octet-stream',
//             },
//             // 'Content-Type': 'image/jpg',
//             body: blob,
//         });

//         if (!response.ok) {
//             throw new Error(`S3 upload failed: ${response.status} ${response.statusText}`);
//         }

//         console.log('✅ Upload success');
//         return true;
//     } catch (error) {
//         console.error('Error uploading to S3 via presigned URL:', error);
//         throw error;
//     }
// }
