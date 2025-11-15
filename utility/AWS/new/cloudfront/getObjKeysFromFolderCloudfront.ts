// cloudfrontObjUrl.ts
const CLOUDFRONT_BASE_URL = 'https://d1jfzczzc75ukf.cloudfront.net';

/**
 * Get full CloudFront URL for an object key.
 * @param key The S3 object key (e.g. "icons/profile_icons/user123.png")
 */

export function getCloudFrontUrl(key: string): string {
    // Remove leading slashes just in case
    const cleanKey = key.startsWith('/') ? key.slice(1) : key;
    return `${CLOUDFRONT_BASE_URL}/${encodeURIComponent(cleanKey)}`;
}
