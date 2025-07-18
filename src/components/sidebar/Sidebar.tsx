"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SidebarActions } from "./Actions_Sidebar";
import { SidebarFooter } from "./Footer_Sidebar";
import { SidebarHeader } from "./Header_Sidebar";
import { SidebarLinks } from "./Links_Sidebar";

export function SidebarNavegacao() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Atualiza o horário a cada segundo
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fecha menu mobile ao navegar
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      {/* Botão Mobile */}
      <button
        onClick={toggleMobile}
        className="group fixed top-6 right-6 z-50 rounded-2xl border border-emerald-300/30 bg-gradient-to-r from-emerald-900/95 to-emerald-800/95 p-3 text-white shadow-2xl backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:from-emerald-800/95 hover:to-emerald-700/95 hover:shadow-emerald-500/20 active:scale-95 md:hidden"
      >
        <div className="relative">
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </button>

      {/* Overlay */}
      {isMobileOpen && (
        <div
          className="animate-in fade-in fixed inset-0 z-40 bg-black/60 backdrop-blur-md duration-300 md:hidden"
          onClick={toggleMobile}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 z-50 h-full transition-all duration-700 ease-out ${isCollapsed ? "w-20" : "w-72"} ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} `}
      >
        {/* Background camadas */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/80 via-transparent to-cyan-950/40" />
        <div className="absolute inset-0 backdrop-blur-xl" />
        <div className="absolute inset-0 border-r border-emerald-300/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]" />

        {/* Conteúdo */}
        <div className="relative flex h-full flex-col">
          {/* Header */}
          <SidebarHeader
            isCollapsed={isCollapsed}
            toggleCollapse={toggleCollapse}
            currentTime={currentTime}
          />

          {/* Links de navegação */}
          <SidebarLinks isCollapsed={isCollapsed} />

          {/* Botões de ações (Alterar senha / Logout) */}
          <SidebarActions
            isCollapsed={isCollapsed}
            expandSidebar={() => setIsCollapsed(false)}
          />

          {/* Rodapé com redes sociais */}
          <SidebarFooter isCollapsed={isCollapsed} />
        </div>

        {/* Decorações finais */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 h-32 w-full bg-gradient-to-b from-emerald-400/5 to-transparent" />
          <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-cyan-400/5 to-transparent" />
        </div>
      </nav>

      {/* Spacer para conteúdo ao lado da sidebar */}
      <div
        className={`hidden transition-all duration-700 md:block ${isCollapsed ? "w-20" : "w-72"}`}
      />
    </>
  );
}
