import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(
  file: string,
  folder = "nepembe"
): Promise<string> {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    resource_type: "image",
    transformation: [
      { quality: "auto", fetch_format: "auto" },
      { width: 1600, crop: "limit" },
    ],
  });
  return result.secure_url;
}

export async function deleteImage(url: string) {
  const publicId = extractPublicId(url);
  if (publicId) {
    await cloudinary.uploader.destroy(publicId);
  }
}

function extractPublicId(url: string): string | null {
  const match = url.match(/\/v\d+\/(.+)\.\w+$/);
  return match ? match[1] : null;
}

export default cloudinary;
