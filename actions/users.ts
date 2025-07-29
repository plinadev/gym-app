"use server";

import supabase from "@/config/supabase-config";
import { currentUser } from "@clerk/nextjs/server";

export const getCurrentUserFromSupabase = async () => {
  try {
    const clerkUser = await currentUser();

    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("clerk_user_id", clerkUser?.id);

    if (error) throw error;
    if (data && data.length) {
      return {
        success: true,
        data: data[0],
      };
    }
    const newUserObj = {
      clerk_user_id: clerkUser?.id,
      email: clerkUser?.emailAddresses[0].emailAddress,
      name: clerkUser?.firstName + " " + clerkUser?.lastName,
      is_active: true,
      is_admin: false,
    };
    const { data: newUser, error: newUserError } = await supabase
      .from("user_profiles")
      .insert([newUserObj])
      .select("*");

    if (newUserError) {
      throw newUserError;
    }
    return {
      success: true,
      data: newUser[0],
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
