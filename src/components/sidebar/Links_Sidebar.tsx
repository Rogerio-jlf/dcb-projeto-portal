"use client";
import { FileText, LayoutDashboard, Loader2, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface LinkItem {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  shadowColor: string;
}

interface SidebarLinksProps {
  isCollapsed: boolean;
}

export function SidebarLinks({ isCollapsed }: SidebarLinksProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [loadingLink, setLoadingLink] = useState<string | null>(null);

  const links: LinkItem[] = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      color: "from-purple-800 to-blue-800",
      shadowColor: "shadow-emerald-500/30",
    },
    {
      href: "/contas-pagar",
      label: "Contas a Pagar",
      icon: FileText,
      color: "from-purple-800 to-blue-800",
      shadowColor: "shadow-cyan-500/30",
    },
    {
      href: "/pedidos",
      label: "Pedidos",
      icon: ShoppingCart,
      color: "from-purple-800 to-blue-800",
      shadowColor: "shadow-violet-500/30",
    },
  ];

  return (
    <div className="mt-2 flex flex-1 flex-col gap-4 p-4">
      {links.map(({ href, label, icon: Icon, color, shadowColor }) => {
        const isActive = pathname === href;
        const isLoading = loadingLink === href;

        return (
          <Link
            key={href}
            href={href}
            onClick={(e) => {
              e.preventDefault();
              setLoadingLink(href);
              router.push(href);
            }}
            className={`group relative flex transform items-center overflow-hidden rounded-2xl text-sm font-semibold backdrop-blur-sm transition-all duration-700 ease-out hover:scale-[1.02] active:scale-95 ${isCollapsed ? "justify-center px-4 py-4" : "px-6 py-4"} ${
              isActive
                ? `bg-gradient-to-r text-white ${color} shadow-2xl ${shadowColor} border border-white/30`
                : `border border-white/5 bg-gradient-to-r from-white/5 via-white/2 to-transparent text-white/70 hover:border-white/20 hover:from-white/10 hover:via-white/5 hover:to-white/2 hover:text-white hover:shadow-xl`
            } `}
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />

            <div className="relative z-10 flex items-center">
              <Icon
                className={`flex-shrink-0 transition-all duration-500 ${isCollapsed ? "h-6 w-6" : "h-5 w-5"} ${
                  isActive
                    ? "scale-110 text-white drop-shadow-lg"
                    : "text-white/70 group-hover:scale-105 group-hover:text-white group-hover:drop-shadow-md"
                } `}
              />
            </div>

            {!isCollapsed && (
              <div className="relative z-10 ml-4 flex flex-1 items-center justify-between">
                <span className="font-medium tracking-wide whitespace-nowrap">
                  {label}
                </span>
                {isLoading && (
                  <Loader2 className="h-5 w-5 animate-spin text-white" />
                )}
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

            <div
              className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                isActive
                  ? "border border-white/30 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)]"
                  : "border border-emerald-300/5 group-hover:border-emerald-300/20"
              }`}
            />
          </Link>
        );
      })}
    </div>
  );
}
