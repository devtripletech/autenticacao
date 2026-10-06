"use client";

import { useActionState } from "react";
import { sendMagicLink, type SendMagicLinkResult } from "./actions";

const initialState: SendMagicLinkResult | null = null;

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    sendMagicLink,
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="voce@exemplo.com"
          className="rounded-md border border-black/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-black/30 dark:border-white/15 dark:focus:border-white/30"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background transition-opacity disabled:opacity-60"
      >
        {isPending ? "Enviando..." : "Enviar link de acesso"}
      </button>

      {state && (
        <p
          role="status"
          className={`text-sm ${state.success ? "text-green-600" : "text-red-600"}`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
