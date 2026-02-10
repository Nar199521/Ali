// DEPRECATED: Cloudinary support removed - using local file uploads instead
// This file is kept for backward compatibility only
// Use @/lib/upload instead

export const uploadToCloudinary = async (file: File, _preset: string): Promise<string> => {
  // Redirect to local upload endpoint
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Upload failed');
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};
