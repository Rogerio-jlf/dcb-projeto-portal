"use client";
import { Activity, ChevronRight, Heart, Shield } from "lucide-react";
import Image from "next/image";

interface SidebarHeaderProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  currentTime: Date;
}

export function SidebarHeader({
  isCollapsed,
  toggleCollapse,
}: SidebarHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-emerald-300/10 p-6">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src="/logo-dcb.png"
                alt="Logo DCB"
                width={120}
                height={40}
                className="object-contain brightness-110"
                priority
              />
              <div className="absolute -inset-1 -z-10 rounded-lg bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 blur-sm" />
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4 animate-pulse text-red-400" />
              <Shield className="h-4 w-4 animate-pulse text-emerald-400" />
              <Activity className="h-4 w-4 animate-pulse text-cyan-400" />
            </div>
          </div>
        )}

        <button
          onClick={toggleCollapse}
          className="group hidden h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/30 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-200 shadow-lg transition-all duration-500 hover:scale-105 hover:from-emerald-500/30 hover:to-cyan-500/30 hover:text-white hover:shadow-emerald-500/20 active:scale-95 md:flex"
        >
          <ChevronRight
            size={16}
            className={`transition-all duration-500 group-hover:scale-110 ${
              isCollapsed ? "rotate-0" : "rotate-180"
            }`}
          />
        </button>
      </div>

      {!isCollapsed && (
        <div className="border-b border-emerald-300/10 px-6 py-4">
          <div className="rounded-xl border border-emerald-300/20 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 p-4">
            <div className="flex flex-col space-y-1">
              <span className="block text-xs font-medium text-cyan-300">
                Bem-vindo,
              </span>

              <span className="block text-sm text-cyan-300">
                {/* {userLoading ? "Carregando usuário..." : (userData?.nome ?? "Usuário")} */}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
