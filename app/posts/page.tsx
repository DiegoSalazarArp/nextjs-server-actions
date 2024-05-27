import PostList from "@/components/post-list";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Page() {
  return (
    <main className="text-center pt-32 px-5">
      <h1 className="text-4xl md:text-5xl font-bold mb-5">my posts.</h1>

      <Suspense fallback={<Loading />}>
        <PostList />
      </Suspense>
    </main>
  );
}
