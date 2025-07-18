"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useState } from "react";

interface ComprasPorProduto {
  produto: string;
  valor: number;
}

export function ChartComprasProduto({ data }: { data?: ComprasPorProduto[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  // Array de cores para as barras do gráfico (cores mais vibrantes para tema escuro)
  const colors = [
    "#06b6d4", // Cyan
    "#3b82f6", // Blue
    "#8b5cf6", // Purple
    "#ec4899", // Pink
    "#f59e0b", // Amber
    "#10b981", // Emerald
    "#f97316", // Orange
    "#ef4444", // Red
  ];

  const totalValue = (data ?? []).reduce((sum, item) => sum + item.valor, 0);
  const mediaValue = totalValue / (data?.length || 1);
  const maiorValue = Math.max(...(data ?? []).map((item) => item.valor));

  return (
    // CONTAINER PRINCIPAL
    <div className="bg-slate-900 p-4 sm:p-5 lg:p-6 rounded-2xl shadow-2xl border border-slate-700 h-full flex flex-col relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-900 opacity-50"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-600/20 to-pink-600/20 rounded-full blur-3xl"></div>

      {/* HEADER */}
      <div className="relative z-10 mb-3 sm:mb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white tracking-wide">
                Compras por Produto
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 ml-4">
              Distribuição de gastos por produto
            </p>
          </div>

          {/* Indicadores compactos */}
          <div className="flex gap-2">
            <div className="bg-slate-800/70 border border-slate-600/50 px-3 py-1.5 rounded-lg backdrop-blur-sm">
              <div className="text-xs text-slate-300 font-medium">{data?.length || 0} produtos</div>
            </div>
          </div>
        </div>

        {/* Estatísticas em linha */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-3 py-2 rounded-xl shadow-lg border border-cyan-500/30">
            <div className="text-xs opacity-90 mb-1">Total</div>
            <div className="text-sm font-bold">{formatCompactCurrency(totalValue)}</div>
          </div>
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-2 rounded-xl shadow-lg border border-purple-500/30">
            <div className="text-xs opacity-90 mb-1">Média</div>
            <div className="text-sm font-bold">{formatCompactCurrency(mediaValue)}</div>
          </div>
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-3 py-2 rounded-xl shadow-lg border border-emerald-500/30">
            <div className="text-xs opacity-90 mb-1">Maior</div>
            <div className="text-sm font-bold">{formatCompactCurrency(maiorValue)}</div>
          </div>
        </div>
      </div>

      {/* GRÁFICO */}
      <div className="relative z-10 flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 15, bottom: 60, left: 10 }} barSize={30}>
            {/* === DEFINIÇÃO DOS GRADIENTES USADOS NAS BARRAS === */}
            <defs>
              {colors.map((color, index) => (
                <linearGradient key={index} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                </linearGradient>
              ))}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* === LINHAS DE GRADE DO GRÁFICO === */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#475569"
              strokeOpacity={0.3}
            />

            {/* === EIXO X (PRODUTOS) === */}
            <XAxis
              dataKey="produto"
              axisLine={false}
              tickLine={false}
              angle={-45}
              textAnchor="end"
              height={90}
              interval={0}
              tick={{
                fontSize: 12,
                fill: "#94a3b8",
                fontWeight: 500,
              }}
            />

            {/* === EIXO Y (VALORES EM R$) === */}
            <YAxis
              axisLine={false}
              tickLine={false}
              width={70}
              tickFormatter={formatCompactCurrency}
              tick={{
                fontSize: 12,
                fill: "#94a3b8",
                fontWeight: 500,
              }}
            />

            {/* === TOOLTIP (BALÃO QUE APARECE AO PASSAR O MOUSE) === */}
            <Tooltip
              cursor={{ fill: "rgba(6, 182, 212, 0.1)" }}
              contentStyle={{
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
                background: "rgba(30, 41, 59, 0.95)",
                backdropFilter: "blur(20px)",
                color: "white",
                fontSize: "14px",
                padding: "16px",
              }}
              formatter={(value) => [
                <div key="tooltip-content" className="space-y-2">
                  <div className="font-bold text-white text-base">
                    {formatCurrency(Number(value))}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                    <span className="text-slate-300 text-sm">
                      {((Number(value) / totalValue) * 100).toFixed(1)}% do total
                    </span>
                  </div>
                </div>,
                "",
              ]}
              labelStyle={{
                fontWeight: "700",
                color: "#ffffff",
                fontSize: "16px",
                marginBottom: "8px",
              }}
            />

            {/* === BARRAS DO GRÁFICO === */}
            <Bar
              dataKey="valor"
              radius={[8, 8, 0, 0]}
              animationDuration={1800}
              animationEasing="ease-out"
            >
              {/* === CELULAS INDIVIDUAIS (CADA BARRA) === */}
              {(data ?? []).map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#gradient-${index % colors.length})`}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  style={{
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    filter:
                      hoveredIndex === index
                        ? `brightness(1.2) drop-shadow(0 0 12px ${colors[index % colors.length]}80)`
                        : "brightness(1)",
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* LEGENDA */}
      <div className="relative z-10 mt-4">
        <div className="bg-slate-800/70 border border-slate-600/50 rounded-lg p-3 backdrop-blur-sm">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:justify-center lg:flex-wrap gap-2">
            {(data ?? []).map((item, index) => {
              const percentage = ((item.valor / totalValue) * 100).toFixed(1);
              return (
                <div
                  key={`legend-${index}`}
                  className={`flex items-center min-w-0 p-2 rounded-lg transition-all duration-200 cursor-pointer ${
                    hoveredIndex === index
                      ? "bg-slate-700/80 shadow-lg transform scale-105 border border-slate-500/50"
                      : "hover:bg-slate-700/50"
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    className="w-3 h-3 rounded-full mr-2 flex-shrink-0 border border-slate-600"
                    style={{
                      backgroundColor: colors[index % colors.length],
                      boxShadow:
                        hoveredIndex === index
                          ? `0 0 8px ${colors[index % colors.length]}80`
                          : "none",
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold text-white tracking-wide truncate">
                      {item.produto}
                    </div>
                    <div className="text-xs text-slate-400 font-medium">
                      {formatCompactCurrency(item.valor)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer compacto */}
      <div className="relative z-10 mt-3 pt-3 border-t border-slate-700">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse"></div>
              <span>Distribuição por produto</span>
            </div>
          </div>
          <div className="text-right">
            <span className="font-medium text-slate-300">
              {hoveredIndex !== null ? data?.[hoveredIndex]?.produto : "Passe o mouse nas barras"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
