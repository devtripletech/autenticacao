"use server";

import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export type SendMagicLinkResult = {
  success: boolean;
  message: string;
};

export async function sendMagicLink(
  _prevState: SendMagicLinkResult | null,
  formData: FormData,
): Promise<SendMagicLinkResult> {
  const email = formData.get("email");

  if (typeof email !== "string" || !email.includes("@")) {
    return { success: false, message: "Informe um e-mail válido." };
  }

  const supabase = await createClient();
  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin");

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    message: "Link de acesso enviado! Verifique seu e-mail.",
  };
}
