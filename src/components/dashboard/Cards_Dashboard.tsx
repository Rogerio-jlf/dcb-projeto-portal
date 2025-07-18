// StatCardsGrid.tsx
import { CheckCircle, Clock, ShoppingCart } from "lucide-react";
import React from "react";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

const formatCompactCurrency = (value: number) => {
  if (value >= 1000000) {
    return `R$ ${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `R$ ${(value / 1000).toFixed(0)}K`;
  }
  return formatCurrency(value);
};

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  colorIcon: string;
  bgColorIcon: string;
  textColor: string;
  total?: number;
  glowColor: string;
}

function StatCard({
  title,
  value,
  icon: Icon,
  colorIcon,
  bgColorIcon,
  textColor,
  total = value,
  glowColor,
}: StatCardProps) {
  return (
    <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 p-4 sm:p-5 lg:p-6 group relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-900 opacity-50"></div>
      <div
        className={`absolute top-0 right-0 w-32 h-32 ${glowColor} rounded-full blur-3xl opacity-20`}
      ></div>
      <div
        className={`absolute bottom-0 left-0 w-24 h-24 ${glowColor} rounded-full blur-3xl opacity-10`}
      ></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`p-3 rounded-xl ${bgColorIcon} transition-all duration-300 group-hover:rotate-12 group-hover:scale-110`}
            style={{
              filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))",
            }}
          >
            <Icon className={`w-6 h-6 ${colorIcon}`} />
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
              <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-wide">
                {title}
              </p>
            </div>
            <p
              className={`text-2xl sm:text-3xl font-extrabold ${textColor} transition-all duration-300`}
            >
              {formatCompactCurrency(value)}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-xs font-semibold text-slate-400">
            <span>Progresso</span>
            <span className="text-slate-300">{Math.round((value / total) * 100)}%</span>
          </div>

          <div className="relative">
            <div className="w-full bg-slate-700/50 rounded-full h-2 backdrop-blur-sm border border-slate-600/30">
              <div
                className={`h-2 rounded-full ${bgColorIcon} transition-all duration-700 ease-out relative overflow-hidden`}
                style={{ width: `${Math.min((value / total) * 100, 100)}%` }}
              >
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Stats footer */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <div
                className={`w-2 h-2 rounded-full ${bgColorIcon.replace("bg-gradient-to-br", "bg")}`}
              ></div>
              <span>Valor atual</span>
            </div>
            <div className="text-xs text-slate-300 font-medium">
              {total !== value && `de ${formatCompactCurrency(total)}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardsGridProps {
  cardData: {
    totalCompras: number;
    comprasPagas: number;
    comprasAberto: number;
  };
}

export function CardsDashboard({ cardData }: StatCardsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4 md:gap-6">
      <StatCard
        title="Valor Total de Compras"
        value={cardData.totalCompras}
        icon={ShoppingCart}
        colorIcon="text-white"
        bgColorIcon="bg-gradient-to-br from-cyan-500 to-blue-600"
        textColor="text-cyan-400"
        glowColor="bg-gradient-to-br from-cyan-600/30 to-blue-600/30"
      />
      <StatCard
        title="Total de Compras Pagas"
        value={cardData.comprasPagas}
        icon={CheckCircle}
        colorIcon="text-white"
        bgColorIcon="bg-gradient-to-br from-emerald-500 to-green-600"
        textColor="text-emerald-400"
        total={cardData.totalCompras}
        glowColor="bg-gradient-to-br from-emerald-600/30 to-green-600/30"
      />
      <StatCard
        title="Total de Compras em Aberto"
        value={cardData.comprasAberto}
        icon={Clock}
        colorIcon="text-white"
        bgColorIcon="bg-gradient-to-br from-red-500 to-pink-600"
        textColor="text-red-400"
        total={cardData.totalCompras}
        glowColor="bg-gradient-to-br from-red-600/30 to-pink-600/30"
      />
    </div>
  );
}
