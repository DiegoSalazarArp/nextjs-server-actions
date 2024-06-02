import Upvote from "@/components/upvote-btn";
import { Database } from "@/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });

  const { data: post, error } = await supabase
    .from("post")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    notFound();
  }

  return (
    <main className="px-7 pt-24 text-center">
      <h1 className="text-5xl font-semibold mb-7">{post.title}</h1>

      <p className="max-w-[700px] mx-auto">{post.body}</p>
    </main>
  );
}
