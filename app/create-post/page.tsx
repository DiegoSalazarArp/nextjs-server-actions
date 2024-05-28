import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import createPost from "../actions/actions";

export default function Page() {
  const { isAuthenticated } = getKindeServerSession();
  return (
    <main className="text-center pt-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-5">Create post</h1>

      <form className="h-10 space-x-2" action={createPost}>
        <input
          name="title"
          placeholder="title"
          className="border rounded px-3 h-full"
          type="text"
          required
        />

        <button
          className="h-full  bg-blue-500 px-5 rounded text-white"
          type="submit"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
