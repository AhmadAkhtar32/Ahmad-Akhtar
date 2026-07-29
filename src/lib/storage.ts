// Uploads an image to Cloudinary and returns its public URL.
const CLOUDINARY_CLOUD_NAME = "rgwaztmm";
const CLOUDINARY_UPLOAD_PRESET = "portfolio_unsigned";

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    console.error("Cloudinary upload failed:", errText);
    throw new Error("Image upload failed");
  }

  const data = await res.json();
  return data.secure_url as string;
}

// kept for backwards compatibility with existing imports
export const uploadProjectImage = uploadImage;