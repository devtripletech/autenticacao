import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <h1 className="mb-1 text-xl font-semibold">Entrar</h1>
        <p className="mb-6 text-sm text-black/60 dark:text-white/60">
          Receba um link de acesso no seu e-mail. Sem senha.
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
