"use client"

import { CreditCard, LayoutDashboard, Settings, UserCog, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '../contexts/SidebarContext';

export default function SidebarNav() {

    const { toggleSidebar } = useSidebar()

    const pathname = usePathname()

    type NavLinks = {
        href: string,
        label: string,
        icon: React.ReactNode;
    }

    const navLinks: NavLinks[] = [
        { href: "/home", label: "Visão Geral", icon: <LayoutDashboard size={18} /> },
        { href: "/pescadores", label: "Pescadores", icon: <Users size={18} /> },
        { href: "/parcelas", label: "Parcelas", icon: <CreditCard size={18} /> },
        { href: "/usuarios", label: "Usuários", icon: <UserCog size={18} /> },
        { href: "/configuracoes", label: "Configurações", icon: <Settings size={18} /> },
    ];

    return (
        <nav className="mt-6">
            <ul className="flex flex-col gap-1">
                {navLinks.map((link) => {
                    const ativo = pathname === link.href;

                    return (
                        <li key={link.href} onClick={toggleSidebar}>
                            <Link
                                href={link.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-200
                            ${ativo
                                        ? "bg-sky-100 text-sky-700 font-medium"
                                        : "text-gray-600 hover:hover:bg-sky-50/60 hover:text-gray-900"
                                    }`}
                            >
                                {link.icon}
                                <span>{link.label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}