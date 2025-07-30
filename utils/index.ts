"use server";
import supabase from "@/config/supabase-config";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const uploadFileAndGetUrl = async (file: File) => {
  try {
    const fileName = new Date().getTime() + file.name;
    const { data, error } = await supabase.storage
      .from("default")
      .upload(fileName, file);

    if (error) throw new Error(error.message);

    const urlResponse = await supabase.storage
      .from("default")
      .getPublicUrl(fileName);

    return {
      success: true,
      data: urlResponse.data.publicUrl,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
