import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import createPost from "../actions/actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createPost } from "../actions/actions";

export default async function Page() {
  // Se crea un cliente de supabase con las cookies
  const supabase = createServerComponentClient({ cookies });

  // Se obtiene la sesion del cliente de supabase
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Si no hay sesion se redirige a la pagina de login
  if (!session) {
    redirect("/login");
  }

  return (
    <main className="text-center pt-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-5">Create post</h1>

      <form
        action={createPost}
        className="flex flex-col max-w-[400px] mx-auto gap-2 my-10"
      >
        <input
          type="text"
          name="title"
          placeholder="Title for new post"
          className="border rounded px-3 h-10"
          required
        />
        <textarea
          name="body"
          placeholder="Body for new post"
          className="border rounded px-3 py-2"
          rows={6}
          id=""
          required
        />

        <button
          className="h-10  bg-blue-500 px-5 rounded text-white"
          type="submit"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
