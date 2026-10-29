"use client"

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fish, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import z, { email } from "zod";
import { api } from "../lib/api";
import { useRouter } from "next/navigation";

export default function login() {

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erroLogin, setErroLogin] = useState("");
  const [carregando, setCarregando] = useState(false);

  const router = useRouter()

  const loginSchema = z.object({
    email: z.string().email("Email invalido"),
    password: z.string().min(3, "Senha invalida")
  })

  type LoginSchema = z.infer<typeof loginSchema>

  const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur"
  })

  async function handleLogin(data: LoginSchema) {
    setErroLogin("");
    setCarregando(true);

    try {
      await api.post("/auth/login", data)

      console.log(data)
      reset()
      
      router.replace("/pescador")
    } catch (error) {
      console.error(error)
      setErroLogin("Não foi possível entrar. Verifique suas credenciais.");
    } finally {
      setCarregando(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-sky-50 px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">

        <section className="relative hidden flex-col justify-between overflow-hidden bg-sky-600 p-10 text-white md:flex">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-sky-500 opacity-50" />
          <div className="absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-sky-700 opacity-60" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="rounded-xl bg-white/20 p-3">
              <Fish size={30} />
            </div>
            <span className="text-xl font-bold">APASF</span>
          </div>

          <div className="relative z-10">
            <h1 className="mb-5 text-3xl font-bold leading-tight">
              Gestão simples,
              <br />
              comunidade forte.
            </h1>

            <p className="max-w-sm leading-7 text-sky-100">
              Acesse o sistema de gerenciamento de pescadores,
              acompanhe parcelas e mantenha tudo organizado.
            </p>
          </div>

          <p className="relative z-10 text-sm text-sky-100">
            Associação de Pescadores e Agricultores do São Francisco
          </p>
        </section>

        <section className="flex items-center justify-center p-7 sm:p-12">
          <div className="w-full max-w-md">

            <div className="mb-8 md:hidden flex items-center gap-3">
              <div className="inline-flex rounded-xl bg-sky-100 p-3 text-sky-600">
                <Fish size={30} />
              </div>
              <div>
                <p className="text-2xl font-semibold text-slate-800">APASF</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-slate-800">
                Bem-vindo!
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Entre com suas credenciais para continuar.
              </p>
            </div>

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  E-mail
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 transition focus-within:border-sky-500 focus-within:ring-4 focus-within:ring-sky-100">
                  <Mail size={19} className="shrink-0 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    {...register("email")}
                    required
                    className="w-full bg-transparent py-3.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="senha"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Senha
                  </label>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 transition focus-within:border-sky-500 focus-within:ring-4 focus-within:ring-sky-100">
                  <Lock size={19} className="shrink-0 text-slate-400" />

                  <input
                    id="senha"
                    type={mostrarSenha ? "text" : "password"}
                    placeholder="Digite sua senha"
                    autoComplete="current-password"
                    {...register("password")}
                    required
                    className="w-full bg-transparent py-3.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  />

                  <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                    className="shrink-0 text-slate-400 hover:text-sky-600"
                  >
                    {mostrarSenha ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {erroLogin && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
                >
                  {erroLogin}
                </p>
              )}

              <button
                type="submit"
                disabled={carregando}
                className="w-full rounded-xl bg-sky-600 py-3.5 font-semibold text-white shadow-lg shadow-sky-100 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {carregando ? "Entrando..." : "Entrar no sistema"}
              </button>
        
            </form>
            <p className="mt-8 text-center text-xs leading-5 text-slate-400">
              Sistema de gerenciamento de pescadores
              <br />
              © 2026 APASF
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
