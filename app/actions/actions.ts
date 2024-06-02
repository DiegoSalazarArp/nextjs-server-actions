"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

//
export async function logout() {
  try {
    const supabase = createServerActionClient({ cookies });

    await supabase.auth.signOut();
  } catch (error) {
    throw error;
  }
}

export async function login(formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const supabase = createServerActionClient({ cookies });

    const { error } = await supabase.auth.signInWithPassword({
      email: email as string,
      password: password as string,
    });

    if (error) {
      redirect(`/login?message=${error.message}`);
    }

    revalidatePath("/");
    redirect("/create-post");
  } catch (error) {
    throw error;
  }
}

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;

  console.log(title, body);

  const supaabase = createServerActionClient({ cookies });

  const {
    data: { user },
  } = await supaabase.auth.getUser();

  if (user === null) return;

  const result = await supaabase
    .from("post")
    .insert([{ title, body, user_id: user.id }]);

  if (result.error) {
    console.log(result.error);
    throw result.error;
  }

  console.log(result.error);
}
