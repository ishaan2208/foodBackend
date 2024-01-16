import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const uploadOnCloudinary = async (file) => {
  cloudinary.config({
    cloud_name: "dr65ypq1p",
    api_key: "815212255327998",
    api_secret: "IUvX-4QX2q0G8UEKUa9PFvbMLM8",
  });

  try {
    if (!file) return null;
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    fs.unlinkSync(file);
    return result;
  } catch (error) {
    fs.unlinkSync(file);
    console.error(error);
  }
};
