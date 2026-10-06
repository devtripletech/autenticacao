# Autenticação via Magic Link com Supabase

Aplicação Next.js (App Router) com autenticação sem senha usando **Magic Link** do Supabase.

## Estrutura

- `src/lib/supabase/client.ts` — cliente Supabase para o browser.
- `src/lib/supabase/server.ts` — cliente Supabase para Server Components/Actions/Route Handlers.
- `src/lib/supabase/middleware.ts` + `src/proxy.ts` — renova a sessão em cada request e redireciona usuários não autenticados.
- `src/app/login` — formulário de login (envia o magic link via Server Action).
- `src/app/auth/callback/route.ts` — troca o `code` do link recebido por e-mail por uma sessão.
- `src/app/protected` — exemplo de página protegida, com logout.

## Configuração

1. Crie um projeto em [supabase.com](https://supabase.com).
2. Em **Project Settings → API**, copie a `URL` e a `anon public key`.
3. Cole esses valores em `.env.local` (use `.env.local.example` como referência):

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key-aqui
   ```

4. Em **Authentication → URL Configuration**, adicione a URL de callback à lista de *Redirect URLs*:
   - Local: `http://localhost:3000/auth/callback`
   - Produção: `https://seu-dominio.com/auth/callback`

5. O método "Email" já vem habilitado por padrão em **Authentication → Providers** (ele é o que envia o magic link via `signInWithOtp`).

## Rodando localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`, informe um e-mail na tela de login, e clique no link recebido na caixa de entrada. Você será redirecionado para `/protected` já autenticado.

## Como funciona

1. O usuário envia o e-mail no formulário de `/login`.
2. A Server Action `sendMagicLink` chama `supabase.auth.signInWithOtp({ email })`, apontando `emailRedirectTo` para `/auth/callback`.
3. O Supabase envia um e-mail com um link contendo um `code`.
4. Ao clicar, o usuário cai em `/auth/callback`, que chama `exchangeCodeForSession(code)` e grava os cookies de sessão.
5. O `proxy.ts` (middleware) roda em toda requisição, renova o token via `getUser()` e redireciona para `/login` quem não estiver autenticado.
