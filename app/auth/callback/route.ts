import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function GET(request: NextRequest) {
  // Se obtiene la url de la request
  const requestUrl = new URL(request.url);

  // se obtiene el codigo de la url de la request
  const code = requestUrl.searchParams.get("code");

  if (code) {
    // Se crea un cliente de supabase con el codigo de la url de la request
    const supabase = createRouteHandlerClient({ cookies });

    // Se genera el intercambio de codigo por sesion
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Se redirige a la url de origen
  return NextResponse.redirect(requestUrl.origin);
}
