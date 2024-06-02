import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { Key } from "react";
import { cookies } from "next/headers";

type postData = {
  id: Key | null | undefined;
  title: string;
};

export default async function PostList() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const supabase = createServerComponentClient({ cookies });

  const { data: post } = await supabase.from("post").select("*");

  return (
    <ul>
      {post!.map((post: postData) => (
        <li key={post.id} className="mb-5">
          <Link href={`/posts/${post.id}`} className="text-2xl font-bold">
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
