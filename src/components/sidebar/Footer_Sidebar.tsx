"use client";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

interface SidebarFooterProps {
  isCollapsed: boolean;
}

export function SidebarFooter({ isCollapsed }: SidebarFooterProps) {
  const socialLinks = [
    {
      href: "https://www.instagram.com/dcb_distribuidora/",
      icon: FaInstagram,
      className:
        "from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600",
      shadow: "hover:shadow-pink-500/30",
    },
    {
      href: "https://www.facebook.com/distribuidoracirurgicabrasileira/",
      icon: FaFacebook,
      className:
        "from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
      shadow: "hover:shadow-blue-500/30",
    },
    {
      href: "https://www.linkedin.com/company/dcb-distribuidora-cirurgica-brasileira",
      icon: FaLinkedin,
      className:
        "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      shadow: "hover:shadow-blue-500/30",
    },
  ];

  return (
    <div className="border-t border-emerald-300/10 p-4">
      {!isCollapsed ? (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3">
            {socialLinks.map(({ href, icon: Icon, className, shadow }, i) => (
              <Link
                key={i}
                target="_blank"
                href={href}
                className={`h-10 w-10 bg-gradient-to-r ${className} flex items-center justify-center rounded-xl text-white shadow-lg transition-all duration-500 ${shadow} group hover:scale-110 active:scale-95`}
              >
                <Icon
                  size={18}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </Link>
            ))}
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-emerald-200/80">
              DCB Distribuidora
            </p>
            <p className="text-xs text-emerald-200/60">
              Cirúrgica Brasileira • Desde 1978
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-3">
          <div className="flex flex-col gap-2">
            {socialLinks.map(({ href, icon: Icon, className, shadow }, i) => (
              <Link
                key={i}
                target="_blank"
                href={href}
                className={`h-8 w-8 bg-gradient-to-r ${className} flex items-center justify-center rounded-lg text-white shadow-lg transition-all duration-500 ${shadow} hover:scale-110 active:scale-95`}
              >
                <Icon size={14} />
              </Link>
            ))}
          </div>
          <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
        </div>
      )}
    </div>
  );
}
