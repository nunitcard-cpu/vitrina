"use client";

import imageCompression from "browser-image-compression";
import { createClient } from "@/lib/supabase/client";

const MAX_DIMENSION_PX = 1600;
const MAX_SIZE_MB = 0.5;

export async function uploadProductImage(file: File, tenantId: string): Promise<string> {
  const compressed = await imageCompression(file, {
    maxWidthOrHeight: MAX_DIMENSION_PX,
    maxSizeMB: MAX_SIZE_MB,
    useWebWorker: true,
    fileType: "image/webp",
  });

  const supabase = createClient();
  const path = `${tenantId}/${crypto.randomUUID()}.webp`;

  const { error } = await supabase.storage
    .from("product-images")
    .upload(path, compressed, { contentType: "image/webp", upsert: false });

  if (error) throw error;

  const { data } = supabase.storage.from("product-images").getPublicUrl(path);
  return data.publicUrl;
}
