"use client";

import { Key, LogOut } from "lucide-react";
import { useState } from "react";
import ModalAlterarSenha from "./Modal_Alterar_Senha";

interface SidebarActionsProps {
  isCollapsed: boolean;
  expandSidebar: () => void;
}

interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function SidebarActions({
  isCollapsed,
  expandSidebar,
}: SidebarActionsProps) {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handlePasswordChange = async (passwordData: PasswordChangeData) => {
    try {
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao alterar senha");
      }
    } catch (error) {
      throw error;
    }
  };

  const actions = [
    {
      icon: Key,
      label: "Alterar Senha",
      color: "text-blue-400",
      onClick: () => {
        if (isCollapsed) {
          expandSidebar();
          setTimeout(() => {
            setIsPasswordModalOpen(true);
          }, 300); // tempo da animação
        } else {
          setIsPasswordModalOpen(true);
        }
      },
    },
    {
      icon: LogOut,
      label: "Fazer Logout",
      color: "text-red-400",
    },
  ];

  return (
    <div className="mt-auto space-y-3 px-4 pb-4">
      {actions.map(({ icon: Icon, label, color, onClick }) => (
        <button
          key={label}
          onClick={onClick}
          className={`group relative flex w-full transform items-center overflow-hidden rounded-2xl text-sm font-semibold backdrop-blur-sm transition-all duration-500 ease-out hover:scale-[1.02] active:scale-95 ${isCollapsed ? "justify-center px-4 py-4" : "px-6 py-4"} border border-white/5 bg-gradient-to-r from-white/5 via-white/2 to-transparent text-white/70 hover:border-white/20 hover:from-white/10 hover:via-white/5 hover:to-white/2 hover:text-white hover:shadow-xl`}
        >
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />

          <div className="relative z-10 flex items-center">
            <Icon
              className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${color}`}
            />
          </div>

          {!isCollapsed && (
            <div className="relative z-10 ml-4 flex-1 text-left">
              <span className="font-medium tracking-wide">{label}</span>
            </div>
          )}

          {isCollapsed && (
            <div className="invisible absolute left-20 z-50 rounded-xl border border-emerald-300/20 bg-gradient-to-r from-slate-800/95 to-emerald-800/95 px-4 py-3 text-sm font-medium whitespace-nowrap text-white opacity-0 shadow-2xl backdrop-blur-xl transition-all delay-500 duration-300 group-hover:visible group-hover:opacity-100">
              <div className="flex items-center space-x-2">
                <span>{label}</span>
              </div>
              <div className="absolute top-1/2 -left-2 h-4 w-4 -translate-y-1/2 rotate-45 transform border-b border-l border-emerald-300/20 bg-gradient-to-r from-slate-800 to-emerald-800" />
            </div>
          )}

          <div className="absolute inset-0 rounded-2xl border border-emerald-300/5 transition-all duration-500 group-hover:border-emerald-300/20" />
        </button>
      ))}

      <ModalAlterarSenha
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSubmit={handlePasswordChange}
      />
    </div>
  );
}
