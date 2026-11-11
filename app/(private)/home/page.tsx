"use client"

import Sidebar from "@/app/Component/Sidebar";
import { useSidebar } from "@/app/contexts/SidebarContext";
import { Menu, CircleAlert } from "lucide-react";

export default function homePage() {
    const { isOpen, toggleSidebar } = useSidebar()

    return (
        <main className="w-full h-screen bg-gray-50">
            <header className="flex gap-5 p-4 bg-white border-b border-black/10 xl:ml-60">
                <button className="text-black/40 xl:hidden" onClick={toggleSidebar}>
                    <Menu />
                </button>
                <h1 className="text-black/80 font-semibold">Visão Geral</h1>
            </header>

            <div>
                <section>
                    <div>
                        <CircleAlert /> 
                        <span>Dados de demonstração. Os números exibidos são fictícios e servem apenas para ilustrar o funcionamento do sistema.</span>
                    </div>
                </section>
            </div>

            { isOpen && (
                <div 
                    className="fixed inset-0 bg-black/30 z-40 xl:hidden"
                    onClick={toggleSidebar}
                />
            )}

            <Sidebar />
        </main>
    )
}