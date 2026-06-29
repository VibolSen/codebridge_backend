import { v2 as cloudinary } from 'cloudinary';

// Cloudinary config is automatically picked up from process.env.CLOUDINARY_URL 
// if it exists, or you can configure it explicitly.
// We configure it lazily to ensure process.env is fully loaded from dotenv.

let isConfigured = false;

function configureCloudinary() {
  if (!isConfigured) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    isConfigured = true;
  }
}

/**
 * Uploads a base64 image string to Cloudinary
 * @param fileBase64 The base64 string of the file
 * @param folder The folder in Cloudinary to store the image
 * @returns The secure URL of the uploaded image
 */
export async function uploadToCloudinary(fileBase64: string, folder: string = 'team') {
  try {
    configureCloudinary();
    
    // Cloudinary requires base64 strings to have the data URI prefix for automatic detection,
    // or we can just pass the base64 string if it's already properly formatted.
    // Assuming the input is raw base64, we'll format it as a png data URI.
    const fileStr = fileBase64.startsWith('data:') 
      ? fileBase64 
      : `data:image/png;base64,${fileBase64}`;

    const response = await cloudinary.uploader.upload(fileStr, {
      folder: folder,
      resource_type: 'auto'
    });
    
    // Return an object similar to what ImageKit returned so the controllers don't break much
    return { url: response.secure_url, fileId: response.public_id };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image to storage');
  }
}
