import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "./actions";

export const instant = false;

export default async function ProtectedPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-sm text-center">
        <h1 className="mb-1 text-xl font-semibold">Área protegida</h1>
        <p className="mb-6 text-sm text-black/60 dark:text-white/60">
          Logado como <span className="font-medium">{user.email}</span>
        </p>
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-md border border-black/10 px-3 py-2 text-sm font-medium dark:border-white/15"
          >
            Sair
          </button>
        </form>
      </div>
    </main>
  );
}
