export const deleteS3WithPresignedUrl = async (url: string): Promise<boolean> => {
    try {
        console.log('Deleting via presigned URL...');
        const res = await fetch(url, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete blob');
        console.log('✅ Delete success');
        return true; // ✅ boolean
    } catch (error) {
        console.error('❌ Delete failed:', error);
        return false; // ✅ boolean
    }
};

export default deleteS3WithPresignedUrl;
