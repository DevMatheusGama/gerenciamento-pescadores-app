"use client"

import { LogOut } from "lucide-react"
import { api } from "../lib/api"
import { useRouter } from "next/navigation"

export default function ButtonLogout() {

    const router = useRouter()

    async function handleLogout() {
        try {
            await api.post("/auth/logout")

            router.replace("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <button
            className="flex gap-2 px-3 py-2.5 rounded-md text-sm text-black/50 hover:bg-sky-50/60 cursor-pointer"
            onClick={handleLogout}
        >
            <LogOut size={20} />
            <span>Sair</span>
        </button>
    )
}