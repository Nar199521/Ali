/**
 * Upload a file to the local server
 * @param file - The file to upload
 * @returns The public URL of the uploaded file
 */
export const uploadFile = async (file: File): Promise<string> => {
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
