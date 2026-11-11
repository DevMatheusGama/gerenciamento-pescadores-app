"use client"

import { Fish, X } from "lucide-react";
import SidebarNav from "./navbar";
import { useSidebar } from "../contexts/SidebarContext";
import ButtonLogout from "./ButtonLogout";
import { useState, useEffect } from "react";
import { api } from "../lib/api";

type UsuarioType = {
    id: string,
    name: string,
    email: string
    role: string
}

export default function Sidebar() {
    const [usuario, setUsuario] = useState<UsuarioType>()

    const { isOpen, toggleSidebar } = useSidebar()

    async function getUsuario() {
        try {
            const res = await api.get<UsuarioType>("/usuarios/me")

            setUsuario(res.data)

            console.log(usuario)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUsuario();
    }, []);

    return (
        <div className={`fixed left-0 top-0 w-60 h-screen z-50 bg-white border-r border-black/10 transition-transform duration-300 xl:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <aside className="flex items-center gap-3 px-3 py-5 border-b border-black/10">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-sky-500 text-white">
                    <Fish size={20} />
                </div>
                <div className="flex flex-col">
                    <h2 className="font-semibold text-xs">APASF</h2>
                    <p className="text-[10px] font-light text-black/60">Assoc. Pescadores São <br /> Francisco</p>
                </div>
                <button
                    onClick={toggleSidebar}
                    className="ml-auto text-black/40 xl:hidden"
                >
                    <X size={20} />
                </button>
            </aside>
            <div className="px-3 py-5 mt-2">
                <div>
                    <h2 className="text-xs text-black/40 font-semibold">MENU PRINCIPAL</h2>
                </div>
                <SidebarNav />
            </div>
            <div className="flex flex-col px-3 py-5 mt-105 border-t border-black/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-sky-50 p-3 rounded-full text-sky-700">
                        {usuario?.name.charAt(0).toLocaleUpperCase()}
                    </div>
                    <div className="flex flex-col gap-1 ">
                        <span className="text-xs font-semibold text-black/80">{usuario?.name}</span>
                        <span className="text-xs text-gray-600">{usuario?.role}</span>
                    </div>
                </div>
                <div>
                    <ButtonLogout />
                </div>
            </div>
        </div>
    )
}