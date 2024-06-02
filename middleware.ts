import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  // se crea req para que se pueda acceder a la request
  // se crea res para que se pueda acceder a la response
  //  .next sirve para pasar al siguiente middleware y no se queda en un loop infinito,
  // se coloca a este nivel para que se ejecute al final

  const res = NextResponse.next();

  // se crea una instancia de supabase con el middleware
  const supabase = createMiddlewareClient({ req, res });

  // actualizar la sesion si ha expirado,
  await supabase.auth.getSession();

  return res;
}

// Asegúrese de que el middleware sólo es llamado para las rutas relevantes.
export const config = {
  matcher: [
    /*
     * Coinciden con todas las rutas de petición excepto las que empiezan por:
     * - _next/static (archivos estáticos)
     * _next/image (archivos de optimización de imágenes)
     * - favicon.ico (archivo favicon)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
